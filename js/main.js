/**
 * =====================================================================
 * LevelUpFit - 메인 JavaScript 파일
 * =====================================================================
 * 파일명: js/main.js
 * 작성일: 2024
 * 설명: AI 기반 런지 자세 평가 서비스의 인터랙티브 기능 구현
 * 
 * [주요 기능]
 * 1. 테마 토글 (다크/라이트 모드 전환)
 * 2. 모바일 네비게이션 메뉴 (햄버거 메뉴)
 * 3. 스크롤 애니메이션 (Intersection Observer API 활용)
 * 4. AI 분석 데모 (파일 업로드 및 결과 표시)
 * 
 * [웹 표준 및 접근성]
 * - 키보드 네비게이션 지원
 * - ARIA 속성을 통한 스크린 리더 호환
 * - 이벤트 위임 및 효율적인 DOM 조작
 * =====================================================================
 */


/**
 * =====================================================================
 * 1. 테마 토글 기능
 * - 다크 모드와 라이트 모드 간 전환
 * - data-theme 속성을 활용한 CSS 변수 전환
 * =====================================================================
 */

// DOM 요소 참조
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

/**
 * 테마 토글 클릭 이벤트 핸들러
 * - 현재 테마를 확인하고 반대 테마로 전환
 * - 버튼 텍스트 및 아이콘 업데이트
 */
themeToggle.addEventListener('click', () => {
    // 현재 테마 확인 및 전환
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i> Light';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i> Dark';
    }
});


/**
 * =====================================================================
 * 2. 모바일 네비게이션 메뉴
 * - 햄버거 버튼 클릭 시 슬라이드 메뉴 토글
 * - 키보드 접근성 지원 (Enter 키)
 * =====================================================================
 */

// DOM 요소 참조
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

/**
 * 햄버거 메뉴 클릭 이벤트 핸들러
 * - 메뉴 표시/숨김 토글
 * - aria-expanded 속성 업데이트로 접근성 향상
 */
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // 접근성: 메뉴 상태를 스크린 리더에 알림
    const isActive = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

/**
 * 키보드 접근성: Enter 키로 햄버거 메뉴 열기
 */
hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        hamburger.click();
    }
});


/**
 * =====================================================================
 * 3. 스크롤 애니메이션
 * - Intersection Observer API를 활용한 뷰포트 진입 감지
 * - 요소가 화면에 보일 때 fade-in-up 애니메이션 적용
 * =====================================================================
 */

/**
 * Intersection Observer 설정
 * - threshold: 0.1 = 요소의 10%가 보이면 콜백 실행
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 요소가 뷰포트에 진입하면 visible 클래스 추가
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// fade-in-up 클래스를 가진 모든 요소에 Observer 연결
document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));


/**
 * =====================================================================
 * 4. AI 분석 데모 기능
 * - 파일 업로드 처리
 * - 분석 시뮬레이션 및 결과 표시
 * =====================================================================
 */

// DOM 요소 참조
const analyzeBtn = document.getElementById('analyzeBtn');
const resultBox = document.getElementById('resultBox');
const advancedFeedback = document.getElementById('advancedFeedback');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileUpload');

/**
 * 파일 업로드 영역 클릭 이벤트
 * - 드롭존 클릭 시 숨겨진 file input 트리거
 */
dropZone.addEventListener('click', () => fileInput.click());

/**
 * 키보드 접근성: Enter 키로 파일 선택 열기
 */
dropZone.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fileInput.click();
    }
});

/**
 * 파일 선택 완료 이벤트 핸들러
 * - 선택된 파일명 표시
 * - 업로드 완료 상태로 UI 업데이트
 */
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        // 업로드 완료 스타일 적용
        dropZone.style.borderColor = "var(--primary-color)";
        dropZone.style.color = "var(--primary-color)";
        
        // 파일명 표시
        dropZone.innerHTML = 
            '<i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i><br>' + 
            fileInput.files[0].name + 
            '<br>업로드 완료!';
    }
});

/**
 * 분석 버튼 클릭 이벤트 핸들러
 * - 로딩 상태 표시
 * - 분석 시뮬레이션 (2초 딜레이)
 * - 난이도에 따른 결과 표시
 */
analyzeBtn.addEventListener('click', () => {
    // 로딩 상태 표시 및 버튼 비활성화
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> 영상 프레임 분석 중...';
    analyzeBtn.disabled = true;

    // 분석 시뮬레이션 (2초 후 결과 표시)
    setTimeout(() => {
        const level = document.getElementById('level').value;
        
        // 난이도에 따른 고급 피드백 표시 여부 결정
        // Level 1: 기본 피드백만 표시
        // Level 2, 3: 고급 피드백 추가 표시
        if (level === 'lv1') {
            advancedFeedback.style.display = 'none';
        } else {
            advancedFeedback.style.display = 'block';
        }

        // 결과 박스 표시
        resultBox.style.display = 'block';
        
        // 버튼 상태 복원
        analyzeBtn.innerHTML = '<i class="fas fa-redo" aria-hidden="true"></i> 다른 영상 분석하기';
        analyzeBtn.disabled = false;
        
        // 결과 박스로 부드러운 스크롤
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // 접근성: 결과창에 포커스를 주어 스크린 리더가 읽게 함
        resultBox.setAttribute('tabindex', '-1');
        resultBox.focus();
    }, 2000);
});


/**
 * =====================================================================
 * 5. 비디오 프리뷰 기능
 * - 좌측 컨트롤 클릭 시 영상 전환
 * - 실시간 진행 바 업데이트
 * - 영상 종료 시 자동으로 다음 영상 재생
 * =====================================================================
 */

/**
 * 비디오 소스 배열
 * =========================================================
 * [영상 변경 방법]
 * 아래 배열의 URL을 원하는 영상으로 변경하세요.
 * 
 * 1. 로컬 파일 사용:
 *    - videos 폴더에 MP4 파일 저장
 *    - 예: "videos/analysis.mp4"
 * 
 * 2. 외부 URL 사용:
 *    - 직접 링크 가능한 영상 URL 사용
 *    - 예: "https://example.com/video.mp4"
 * 
 * 3. 무료 영상 리소스:
 *    - Pexels: https://www.pexels.com/videos/
 *    - Pixabay: https://pixabay.com/videos/
 * =========================================================
 */
const videoSources = [
    "videos/analyzer.mp4",       // 0: AI 분석 & 피드백
    "videos/routine-create.mp4", // 1: 나만의 루틴 등록
    "videos/routin-run.mp4"      // 2: 루틴 수행 및 기록
];

// 현재 재생 중인 영상 인덱스
let currentVideoIndex = 0;

// DOM 요소 참조
const previewVideo = document.getElementById('previewVideo');
const controlItems = document.querySelectorAll('.control-item');
const progressFills = [
    document.getElementById('progress-0'),
    document.getElementById('progress-1'),
    document.getElementById('progress-2')
];

/**
 * 영상 전환 함수
 * @param {number} index - 전환할 영상의 인덱스
 */
function changeVideo(index) {
    updateVideoState(index);
}

/**
 * 비디오 상태 업데이트
 * - UI 활성 상태 변경
 * - 진행 바 초기화
 * - 영상 소스 변경 및 재생
 */
function updateVideoState(index) {
    currentVideoIndex = index;
    
    // 1. UI 활성 상태 및 진행 바 초기화
    controlItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
            progressFills[i].style.width = '0%'; // 비활성 아이템 초기화
        }
    });

    // 2. 비디오 소스 변경 및 재생 (페이드 효과)
    previewVideo.style.opacity = 0;
    setTimeout(() => {
        previewVideo.src = videoSources[index];
        previewVideo.play();
        previewVideo.style.opacity = 1;
    }, 300);
}

// 비디오 요소가 존재하는 경우에만 이벤트 리스너 등록
if (previewVideo) {
    let animationFrameId;

    /**
     * 진행 바 업데이트 함수 (requestAnimationFrame 사용으로 부드러운 움직임 구현)
     */
    function updateProgress() {
        if (previewVideo.duration) {
            const percentage = (previewVideo.currentTime / previewVideo.duration) * 100;
            progressFills[currentVideoIndex].style.width = percentage + '%';
        }
        
        if (!previewVideo.paused && !previewVideo.ended) {
            animationFrameId = requestAnimationFrame(updateProgress);
        }
    }

    /**
     * 비디오 재생 이벤트
     * - 부드러운 진행 바 업데이트 시작
     */
    previewVideo.addEventListener('play', () => {
        cancelAnimationFrame(animationFrameId);
        updateProgress();
    });

    /**
     * 비디오 일시정지/종료 시 업데이트 중단
     */
    previewVideo.addEventListener('pause', () => cancelAnimationFrame(animationFrameId));
    previewVideo.addEventListener('ended', () => cancelAnimationFrame(animationFrameId));

    /**
     * 비디오 종료 이벤트
     * - 현재 영상이 끝나면 다음 영상으로 자동 전환
     */
    previewVideo.addEventListener('ended', () => {
        const nextIndex = (currentVideoIndex + 1) % videoSources.length;
        changeVideo(nextIndex);
    });

    // 초기 실행: 첫 번째 영상 재생
    changeVideo(0);
}
