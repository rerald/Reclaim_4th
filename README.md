# 세무법인청년 4대보험 과다징수 환급 컨설팅 랜딩페이지

## 📋 프로젝트 개요

세무법인청년이 보험사무대행기관으로서 제공하는 "4대보험(고용·산재 등) 과다징수분 환급 컨설팅 서비스"를 고객에게 소개하고 DB를 확보하기 위한 랜딩페이지입니다.

## 🎯 주요 기능

### ✅ 핵심 기능
- **단계별 환급 가능성 진단 폼**: 5단계로 구성된 인터랙티브 체크리스트
- **개인정보 수집 및 동의**: GDPR 준수 개인정보 처리 시스템
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완전 대응
- **실시간 데이터 저장**: 로컬스토리지 기반 데이터 관리 (서버 연동 준비 완료)

### 📊 추적 및 분석
- **Google Analytics 연동**: 사용자 행동 추적
- **Meta Pixel 연동**: 광고 성과 측정
- **이벤트 트래킹**: 폼 제출, 상담 신청 등 주요 전환 추적

### 🎨 UI/UX 특징
- **모던한 디자인**: 그라디언트, 애니메이션, 인터랙티브 요소
- **직관적인 네비게이션**: 스텝 바이 스텝 가이드
- **접근성 고려**: 키보드 네비게이션, 색상 대비 등

## 📁 파일 구조

```
Reclaim_4th/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 기능
├── README.md           # 프로젝트 문서
└── 세무법인청년들 4대보험 과다징수 환급 컨설팅 랜딩페이지 기술서_250730.txt
```

## 🚀 실행 방법

### 1. 로컬 개발 환경
```bash
# 1. 프로젝트 클론 또는 다운로드
git clone [repository-url]
cd Reclaim_4th

# 2. 로컬 서버 실행 (방법 1: Python)
python -m http.server 8000

# 2. 로컬 서버 실행 (방법 2: Node.js)
npx http-server

# 3. 브라우저에서 접속
# http://localhost:8000
```

### 2. 직접 실행
- `index.html` 파일을 브라우저에서 직접 열기 (제한된 기능)

## 🔧 설정 및 커스터마이징

### Google Analytics 설정
```javascript
// index.html 파일에서 GA_MEASUREMENT_ID 교체
gtag('config', 'YOUR_GA_MEASUREMENT_ID');
```

### Meta Pixel 설정
```javascript
// index.html 파일에서 YOUR_PIXEL_ID 교체
fbq('init', 'YOUR_PIXEL_ID');
```

### 서버 API 연동
```javascript
// script.js 파일의 saveFormData 함수에서 주석 해제 및 수정
const response = await fetch('/api/submit-application', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

## 📊 데이터 관리

### 저장되는 데이터
1. **환급 신청 데이터**
   - 업종, 근로자 수, 보험료 납부 여부
   - 개인정보 (성명, 회사명, 연락처, 이메일)
   - 신청 시간, 브라우저 정보 등

2. **빠른 상담 신청**
   - 성명, 연락처, 문의내용
   - 신청 시간

### 데이터 조회 (개발/관리용)
```javascript
// 브라우저 콘솔에서 실행
getStoredData(); // 모든 저장된 데이터 조회

// 키보드 단축키
Ctrl + Shift + D  // 데이터 조회
Ctrl + Shift + E  // 데이터 CSV 내보내기
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: `#2c5aa0` (네이비 블루)
- **Secondary**: `#ff6b35` (오렌지)
- **Accent**: `#ffd700` (골드)
- **Background**: `#f8f9ff` (라이트 블루)
- **Success**: `#28a745` (그린)
- **Error**: `#dc3545` (레드)

### 타이포그래피
- **폰트**: Noto Sans KR (300, 400, 500, 700)
- **제목**: 2.5rem ~ 3rem
- **본문**: 1rem ~ 1.2rem

## 📱 반응형 브레이크포인트

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔒 보안 및 개인정보보호

- **개인정보 수집 최소화**: 필요한 정보만 수집
- **동의 기반 처리**: 명시적 동의 후 데이터 수집
- **데이터 암호화**: 전송 시 HTTPS 사용 권장
- **로컬 저장**: 임시 저장 시 브라우저 로컬스토리지 활용

## 🚀 배포 방법

### 1. 정적 호스팅 (권장)
- **Netlify**: 자동 배포, CDN, HTTPS 무료 제공
- **Vercel**: Next.js 최적화, 빠른 배포
- **GitHub Pages**: GitHub 저장소 연동

### 2. 전통적인 웹 호스팅
- cPanel, FTP를 통한 파일 업로드
- 웹 서버 (Apache, Nginx) 설정

### 3. 클라우드 서비스
- **AWS S3** + CloudFront
- **Google Cloud Storage**
- **Azure Static Web Apps**

## 📈 SEO 최적화

### 구현된 SEO 기능
- **메타 태그**: 제목, 설명, 키워드 최적화
- **시맨틱 HTML**: 적절한 HTML5 태그 사용
- **구조화된 데이터**: 스키마 마크업 준비
- **모바일 최적화**: 반응형 디자인
- **페이지 속도**: 최적화된 CSS/JS

### 추가 SEO 권장사항
```html
<!-- 추가할 메타 태그 -->
<meta property="og:title" content="4대보험 과다징수 환급 컨설팅">
<meta property="og:description" content="몰라서 놓친 4대보험료, 바로 찾아드립니다!">
<meta property="og:image" content="[이미지 URL]">
<meta name="twitter:card" content="summary_large_image">
```

## 🛠 개발 도구 및 라이브러리

### 사용된 기술
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Animations
- **Vanilla JavaScript**: ES6+ 기능 활용
- **Font Awesome**: 아이콘
- **Google Fonts**: 웹폰트

### 외부 의존성
- Font Awesome 6.0.0
- Google Fonts (Noto Sans KR)
- Google Analytics
- Meta Pixel

## 📞 지원 및 문의

### 기술 지원
- 이슈 발생 시 개발자 콘솔 확인
- 브라우저 호환성: Chrome, Firefox, Safari, Edge 최신 버전

### 커스터마이징 문의
프로젝트 커스터마이징이나 추가 기능 개발이 필요한 경우 문의하시기 바랍니다.

## 📄 라이센스

이 프로젝트는 세무법인청년의 전용 랜딩페이지로 제작되었습니다.

---

**개발일**: 2024년  
**버전**: 1.0.0  
**최종 업데이트**: 2024년 1월 