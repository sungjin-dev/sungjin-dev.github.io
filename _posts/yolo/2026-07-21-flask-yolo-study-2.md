---
title: "[Part 1] YOLO 실시간 객체 탐지 파이프라인(Flask)"
excerpt: "ESP32-CAM → Flask → YOLO"
categories:
  - yolo
tags:
  - YOLO
  - Flask
  - ESP32-CAM
  - 요구사항관리
toc: true
toc_sticky: true
---


저가형 카메라 모듈 하나로 **데이터 수집 → 커스텀 모델 학습 → 실시간 Bounding Box 스트리밍**까지. 전체 흐름을 5단계로 압축해서 정리했다.

| 항목 | 스택 |
|---|---|
| HW | AI-Thinker ESP32-CAM |
| Server | Flask + OpenCV |
| Model | YOLOv8n (Ultralytics) |
| Stream | MJPEG (multipart/x-mixed-replace) |

---

## 왜 이 구조인가

ESP32-CAM은 추론을 돌리기엔 너무 작다. 그래서 역할을 명확히 나눈다 — **보드는 눈(카메라), 서버는 뇌(YOLO)**. 보드는 JPEG 프레임을 Wi-Fi로 쏘기만 하고, 무거운 연산(디코딩·추론·렌더링)은 전부 Flask 서버가 맡는다.

```mermaid
flowchart LR
    A["📷 ESP32-CAM<br/>JPEG capture"] -->|"HTTP POST<br/>image/jpeg"| B["🧠 Flask 서버<br/>/upload"]
    B --> C["cv2.imdecode<br/>프레임 복원"]
    C -->|"수집 모드"| D[("dataset/<br/>raw_images/")]
    C -->|"추론 모드"| E["YOLOv8 추론<br/>best.pt · conf 0.5"]
    E --> F["cv2.rectangle<br/>박스 + 라벨 렌더링"]
    F -->|"MJPEG 스트림"| G["🖥️ 브라우저<br/>/video_feed"]

    style A fill:#1D3527,stroke:#D98E4A,color:#EAF3EC
    style B fill:#1D3527,stroke:#D98E4A,color:#EAF3EC
    style D fill:#16291F,stroke:#EFC66F,color:#EFC66F
    style E fill:#1D3527,stroke:#4FB07E,color:#EAF3EC
    style G fill:#1D3527,stroke:#4FB07E,color:#EAF3EC
```

핵심은 **같은 `/upload` 엔드포인트가 프로젝트 단계에 따라 두 가지 모드로 동작**한다는 것.

```mermaid
flowchart TB
    subgraph PA["PHASE A · 데이터 수집 모드"]
        direction LR
        A1["/upload"] --> A2["imdecode()"] --> A3["frame_{ts}.jpg 저장<br/>dataset/raw_images/"] --> A4["라벨링 → 학습으로"]
    end
    subgraph PB["PHASE B · 실시간 추론 모드 (학습 완료 후)"]
        direction LR
        B1["/upload"] --> B2["model(img)<br/>best.pt · conf 0.5"] --> B3["cv2.rectangle/putText<br/>박스 + 라벨 렌더링"] --> B4["/video_feed"]
    end
    PA -.->|"best.pt 확보 후 전환"| PB

    style PA fill:#16291F,stroke:#D98E4A,color:#EFC66F
    style PB fill:#16291F,stroke:#4FB07E,color:#4FB07E
```

> 동일한 서버 코드 골격에서 **저장 로직**만 **추론 로직**으로 교체된다. 아래 STEP들은 이 골격을 순서대로 채워가는 과정이다.

---

## STEP 1 — ESP32-CAM: 프레임을 쏘는 클라이언트

AI-Thinker 보드 기준으로 카메라를 초기화하고, `loop()`에서 프레임 버퍼를 잡아 서버로 **HTTP POST** 한다. 헤더에 `Content-Type: image/jpeg`를 명시하고 JPEG 바이너리를 그대로 바디에 싣는 게 전부다.

- **해상도는 PSRAM 유무로 결정** — PSRAM 있으면 VGA(640×480) + 더블 버퍼, 없으면 CIF(400×296)로 다운
- **jpeg_quality 12** — 화질과 전송량의 절충점 (낮을수록 고화질)
- **delay(100)** — 캡처·전송 시간이 0이라고 가정했을 때 이론상 약 10 FPS. 실제로는 Wi-Fi 전송 지연이 더해지므로 체감 FPS는 이보다 낮게 나온다
- 전송 후 `esp_camera_fb_return(fb)`로 프레임 버퍼를 꼭 반환해야 메모리가 안 샌다
- `esp_camera_fb_get()`은 캡처 실패 시 `NULL`을 반환할 수 있다. 이 체크를 빼먹으면 그 프레임에서만 조용히 넘어가는 게 아니라, 이후 `fb->buf` 접근에서 크래시로 이어진다

```cpp
// loop() 핵심부
camera_fb_t *fb = esp_camera_fb_get();
if (!fb) {
    Serial.println("캡처 실패, 이번 프레임 스킵");
    return;                         // fb가 NULL이면 이후 로직 전부 스킵
}

HTTPClient http;
http.begin("http://192.168.x.x:5000/upload");
http.addHeader("Content-Type", "image/jpeg");
int httpCode = http.POST(fb->buf, fb->len);   // JPEG 바이너리 그대로 전송
Serial.printf("upload status: %d\n", httpCode); // 초기 디버깅용
http.end();

esp_camera_fb_return(fb);          // 버퍼 반환 필수
delay(100);                         // 이론상 ≈ 10 FPS
```

---

## STEP 2 — Flask 수집 서버: 받고, 보여주고, 저장한다

서버는 세 가지 일을 한다. 수신한 바이트를 `np.frombuffer → cv2.imdecode`로 BGR 이미지로 복원하고, 
전역 변수 `current_frame`에 최신 프레임을 유지하며, `COLLECT_DATA_MODE`가 켜져 있으면 타임스탬프 파일명으로 저장까지 한다.

```python
# app.py — /upload 핵심부
nparr = np.frombuffer(request.data, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)   # JPEG → BGR

current_frame = img
if COLLECT_DATA_MODE:                          # 수집 모드 스위치
    cv2.imwrite(f"dataset/raw_images/frame_{ts}.jpg", img)
```

### MJPEG 스트리밍의 원리

브라우저 확인용 `/video_feed`는 **MJPEG(multipart/x-mixed-replace)** 방식이다. 응답을 끝내지 않고 JPEG 조각을 `--frame` 경계로 무한히 이어 붙이면, 브라우저의 `<img>` 태그가 이를 동영상처럼 계속 갈아 끼운다.

```mermaid
sequenceDiagram
    participant E as ESP32-CAM
    participant F as Flask 서버
    participant B as 브라우저

    B->>F: GET /video_feed (연결 1회, 계속 유지)
    loop 약 10 FPS
        E->>F: POST /upload (JPEG 바이너리)
        F->>F: imdecode → current_frame 갱신
        F-->>B: --frame + JPEG #N (multipart 조각)
        Note over B: <img> 태그가 최신 JPEG로 교체 표시
    end
```

이 흐름을 실제 코드로 옮기면 다음과 같다. `current_frame`을 계속 인코딩해서 제너레이터로 흘려보내고, 라우트는 그 제너레이터를 `multipart/x-mixed-replace` 타입으로 감싸기만 하면 된다.

```python
# app.py — /video_feed 핵심부
def generate():
    global current_frame
    while True:
        if current_frame is not None:
            _, buffer = cv2.imencode('.jpg', current_frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        time.sleep(0.04)   # ≈ 25 FPS로 재인코딩, 실제 상한은 ESP32 업로드 속도

@app.route('/video_feed')
def video_feed():
    return Response(generate(),
                     mimetype='multipart/x-mixed-replace; boundary=frame')
```

> **⚠️ 동시성 주의** — `/upload`가 `current_frame`을 쓰는 동시에 `/video_feed`의 `generate()`가 같은 변수를 읽는다. 요청이 겹치면 인코딩 도중에 값이 바뀌는 레이스 컨디션이 생길 수 있으니, 트래픽이 몰리는 환경이라면 `threading.Lock()`으로 읽기/쓰기 구간을 감싸는 걸 권장한다.
> ```python
> frame_lock = threading.Lock()
> # 쓰기: with frame_lock: current_frame = img
> # 읽기: with frame_lock: frame_copy = current_frame.copy()
> ```

> **POINT** — ESP32에서 접속할 수 있도록 반드시 `app.run(host='0.0.0.0', port=5000)`으로 열고, 보드 코드의 서버 IP를 PC의 실제 내부 IP와 맞춘다. 여기에 `threaded=True`도 같이 켜야 한다 — 안 켜면 브라우저가 `/video_feed` 연결을 물고 있는 동안 ESP32의 `/upload` 요청이 대기 상태로 막혀버린다.

> **💡 TIP** — ESP32-CAM 하드웨어가 아직 준비되지 않았다면, 노트북 웹캠(`cv2.VideoCapture(0)`)으로 `current_frame`을 채워서 Flask + YOLO 파이프라인 자체부터 먼저 검증하는 것도 방법이다. 하드웨어 이슈와 소프트웨어 이슈를 분리해서 디버깅할 수 있다.

---

## STEP 3 — 라벨링: 모델에게 정답지를 만들어 준다

수집 모드를 켜고 카메라를 다양한 각도·조명·거리에서 움직여 이미지를 모은 뒤, **LabelImg**(로컬) 또는 **Roboflow**(웹)로 Bounding Box를 그린다. 포맷을 **YOLO**로 지정하면 이미지마다 같은 이름의 `.txt` 라벨 파일이 생성된다.

- 클래스당 최소 100~200장 정도는 모아야 학습이 안정적으로 수렴하기 시작한다. 그 이하로는 과적합되기 쉽다
- 각도·조명·배경을 최대한 다양하게 섞어야 실제 배포 환경에서 일반화가 잘 된다

라벨링이 끝나면 학습용(train)과 검증용(val)을 **대략 8:2**로 나눠 다음 구조로 배치한다.

```text
dataset/
├── data.yaml          # 클래스·경로 설정
├── train/
│   ├── images/        # 학습용 .jpg (80%)
│   └── labels/        # 학습용 .txt
└── val/
    ├── images/        # 검증용 .jpg (20%)
    └── labels/        # 검증용 .txt
```

```yaml
# data.yaml
path: ../dataset
train: train/images
val: val/images

nc: 2                          # 클래스 개수
names: ['person', 'danger_zone']
```

---

## STEP 4 — YOLOv8 학습: best.pt를 뽑는다

Ultralytics 패키지(`pip install ultralytics torch torchvision`)로 사전학습된 **yolov8n(nano)** 모델을 불러와 커스텀 데이터로 파인튜닝한다. nano는 가장 가벼워 임베디드 실시간 스트림에 최적. GPU가 있는 PC나 Google Colab 사용을 권장한다.

| 파라미터 | 값 | 의미 |
|---|---|---|
| `data` | dataset/data.yaml | 데이터셋 정의 파일 |
| `epochs` | 50 | 데이터가 적으면 50~100 권장 |
| `imgsz` | 640 | VGA급 입력과 매칭되는 크기 |
| `batch` | 16 | VRAM 상황에 맞춰 조절 |
| `device` | 0 / 'cpu' | GPU 번호 또는 CPU |
| `project`, `name` | custom_drone, v8_model | 결과 저장 경로 고정 |

```python
# train_yolo.py 핵심부
from ultralytics import YOLO

model = YOLO('yolov8n.pt')                # 사전학습 nano 모델
model.train(data='dataset/data.yaml', epochs=50,
            imgsz=640, batch=16, device=0,
            project='custom_drone', name='v8_model')   # 저장 경로 고정
```

`project`/`name`을 지정하지 않으면 결과가 `runs/detect/train`, `train2`, `train3` ... 식으로 실행할 때마다 새 폴더에 쌓인다. 경로를 미리 고정해두면 다음 단계에서 `best.pt` 위치를 찾아 헤맬 일이 없다.

학습이 끝나면 최상의 가중치가 `custom_drone/v8_model/weights/best.pt`에 저장된다. **이 파일 하나가 다음 단계의 주인공이다.** 다음 단계로 넘어가기 전에 같은 폴더의 `results.png`, `confusion_matrix.png`를 열어 mAP와 클래스별 오탐/미탐부터 확인하는 게 순서다 — 여기서 지표가 나쁘면 STEP 5로 가봤자 결과도 나쁘다.

```mermaid
flowchart LR
    A[("raw_images/<br/>수집 이미지")] --> B["LabelImg / Roboflow<br/>라벨링"]
    B --> C["train : val<br/>= 8 : 2 분할"]
    C --> D["yolov8n.pt<br/>파인튜닝 50 epochs"]
    D --> E(["best.pt"])

    style E fill:#16291F,stroke:#EFC66F,color:#EFC66F
```

---

## STEP 5 — 실시간 추론 서버: 프레임마다 박스를 그린다

수집 서버의 골격은 그대로 두고, `/upload` 내부의 저장 로직을 **추론 + 렌더링**으로 교체한다. 프레임이 도착할 때마다 `best.pt`로 추론하고, 결과 박스와 라벨을 OpenCV로 이미지 위에 직접 그린 뒤 스트리밍 프레임으로 넘긴다.

```python
# app_yolo_inference.py — 추론·렌더링 핵심부
model = YOLO("custom_drone/v8_model/weights/best.pt")

results = model(img, stream=True, conf=0.5)   # 신뢰도 50%↑만

for r in results:
    for box in r.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        name = model.names[int(box.cls[0])]
        conf = float(box.conf[0])

        cv2.rectangle(img, (x1, y1), (x2, y2), (161, 71, 13), 3)
        cv2.putText(img, f"{name} {conf:.2f}", (x1, max(y1-10, 15)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (161, 71, 13), 2)

processed_frame = img   # /video_feed가 이걸 송출
```

- **stream=True** — 원래는 여러 프레임(리스트나 비디오)을 한꺼번에 넘길 때 결과를 제너레이터로 받아 메모리를 아끼는 옵션이다. 여기서는 요청마다 이미지 한 장씩만 넘기므로 메모리 절감 효과는 크지 않지만, 나중에 배치 처리로 확장할 걸 감안해 관례적으로 붙여둬도 무방하다
- **conf=0.5** — 오탐이 많으면 올리고, 놓치는 게 많으면 내린다
- OpenCV 색상은 **BGR 순서** — `(161, 71, 13)`은 RGB 기준으로 `(13, 71, 161)`, 짙은 코발트블루 계열(`#0D47A1` 부근)에 해당한다
- 송출 주기는 `time.sleep(0.04)` ≈ 25fps지만, 실제 체감 FPS는 ESP32 전송 속도(≈10fps)가 상한이라 그 이상 못 올라간다
- `processed_frame`도 `current_frame`과 마찬가지로 `/upload`(쓰기)와 `/video_feed`(읽기)가 동시에 접근하므로, STEP 2에서 다룬 락을 여기에도 그대로 적용하는 게 안전하다
- CPU 추론에서 프레임이 밀리기 시작하면(들어오는 속도 > 처리 속도), 매 프레임을 다 처리하려 하지 말고 N프레임마다 한 번만 추론하는 프레임 스키핑을 고려한다. 화면은 덜 부드러워지지만 지연은 줄어든다

---

## 전체 흐름 요약 & 체크리스트

| 단계 | 산출물 | 핵심 한 줄 |
|---|---|---|
| 1. ESP32-CAM | JPEG 프레임 스트림 | 찍어서 POST로 쏘기만 한다 |
| 2. Flask 수집 | raw_images/*.jpg | 디코딩 + 저장 + MJPEG 모니터링 |
| 3. 라벨링 | images + labels(.txt) | YOLO 포맷, train:val = 8:2 |
| 4. 학습 | best.pt | yolov8n 파인튜닝 50 epochs |
| 5. 추론 서버 | 실시간 박스 스트림 | 프레임마다 추론 → 렌더링 → 송출 |

> **Troubleshooting 먼저 볼 것**
>
> 1. 보드 코드의 서버 IP가 PC 내부 IP와 일치하는지
> 2. Flask가 `0.0.0.0`으로 열려 있고, `threaded=True`가 켜져 있고, 방화벽 5000 포트가 허용됐는지
> 3. PSRAM 미탑재 보드에서 VGA를 강제하지 않았는지
> 4. 추론 서버가 로드하는 `best.pt` 경로가 실제 학습 결과 경로(`project`/`name`)와 맞는지
> 5. 브라우저로 `/video_feed`를 열어둔 상태에서도 ESP32 업로드가 끊기지 않는지

---

*ESP32-CAM × YOLOv8 · 전체 소스 코드는 원문 가이드 참고 · 카메라는 눈, 서버는 뇌.*
