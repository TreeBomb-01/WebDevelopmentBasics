// 1. 테마 토글 기능

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 테마 전환 버튼 클릭 이벤트
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i> Light';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i> Dark';
    }
});


// 2. 모바일 네비게이션 메뉴

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') hamburger.click();
});


// 3. 스크롤 애니메이션 (Intersection Observer)

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));


// 4. AI 분석 데모 기능

const analyzeBtn = document.getElementById('analyzeBtn');
const resultBox = document.getElementById('resultBox');
const advancedFeedback = document.getElementById('advancedFeedback');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileUpload');

// 파일 업로드 영역 클릭
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fileInput.click();
});

// 파일 선택 완료
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        dropZone.style.borderColor = "var(--primary-color)";
        dropZone.style.color = "var(--primary-color)";
        dropZone.innerHTML = 
            '<i class="fas fa-check-circle upload-icon"></i><br>' + 
            fileInput.files[0].name + 
            '<br>업로드 완료!';
    }
});

// 분석 버튼 클릭
analyzeBtn.addEventListener('click', () => {
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> 영상 프레임 분석 중...';
    analyzeBtn.disabled = true;

    setTimeout(() => {
        const level = document.getElementById('level').value;
        advancedFeedback.style.display = (level === 'lv1') ? 'none' : 'block';
        resultBox.style.display = 'block';
        analyzeBtn.innerHTML = '<i class="fas fa-redo" aria-hidden="true"></i> 다른 영상 분석하기';
        analyzeBtn.disabled = false;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        resultBox.setAttribute('tabindex', '-1');
        resultBox.focus();
    }, 2000);
});


// 5. 비디오 프리뷰 기능

// 비디오 소스 배열 (영상 변경 시 아래 경로 수정)
const videoSources = [
    "videos/analyzer.mp4",       // AI 분석 & 피드백
    "videos/routine-create.mp4", // 나만의 루틴 등록
    "videos/routin-run.mp4"      // 루틴 수행 및 기록
];

let currentVideoIndex = 0;

const previewVideo = document.getElementById('previewVideo');
const controlItems = document.querySelectorAll('.control-item');
const progressFills = [
    document.getElementById('progress-0'),
    document.getElementById('progress-1'),
    document.getElementById('progress-2')
];

// 영상 전환 함수
function changeVideo(index) {
    updateVideoState(index);
}

// 비디오 상태 업데이트
function updateVideoState(index) {
    currentVideoIndex = index;
    
    controlItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
            progressFills[i].style.width = '0%';
        }
    });

    previewVideo.style.opacity = 0;
    setTimeout(() => {
        previewVideo.src = videoSources[index];
        previewVideo.play();
        previewVideo.style.opacity = 1;
    }, 300);
}

// 비디오 이벤트 리스너
if (previewVideo) {
    let animationFrameId;

    // 진행 바 업데이트 (requestAnimationFrame으로 부드럽게)
    function updateProgress() {
        if (previewVideo.duration) {
            const percentage = (previewVideo.currentTime / previewVideo.duration) * 100;
            progressFills[currentVideoIndex].style.width = percentage + '%';
        }
        if (!previewVideo.paused && !previewVideo.ended) {
            animationFrameId = requestAnimationFrame(updateProgress);
        }
    }

    previewVideo.addEventListener('play', () => {
        cancelAnimationFrame(animationFrameId);
        updateProgress();
    });

    previewVideo.addEventListener('pause', () => cancelAnimationFrame(animationFrameId));
    previewVideo.addEventListener('ended', () => cancelAnimationFrame(animationFrameId));

    // 영상 종료 시 다음 영상으로 자동 전환
    previewVideo.addEventListener('ended', () => {
        const nextIndex = (currentVideoIndex + 1) % videoSources.length;
        changeVideo(nextIndex);
    });

    changeVideo(0);
}
