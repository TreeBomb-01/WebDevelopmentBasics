/*
        js/main.js
        - 다크 모드 토글을 처리합니다.
        - 동작:
            1) 토글 클릭 시 `body.dark-mode` 클래스를 추가/제거합니다.
            2) 토글 아이콘은 `images/moon-icon.svg`(라이트 -> 다크) /
                 `images/sun-icon.svg`(다크 -> 라이트)로 교체됩니다.
            3) 사용자 선호는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.
        - 접근성: 토글에 `aria-pressed`를 설정합니다.
        - 안전성: 토글 요소가 없는 경우 스크립트는 아무 동작도 하지 않습니다.
*/
const darkToggle = document.getElementById('darkToggle');
let isDark = false;

function setDarkMode(dark) {
    document.body.classList.toggle('dark-mode', dark);
    if (darkToggle) {
        darkToggle.innerHTML = dark
            ? '<img src="images/sun-icon.svg" alt="Light Mode" style="height:24px;width:24px;">'
            : '<img src="images/moon-icon.svg" alt="Dark Mode" style="height:24px;width:24px;">';
        darkToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
    try {
        localStorage.setItem('dark-mode', dark ? '1' : '0');
    } catch (e) {
        // localStorage may be unavailable; fail silently
    }
}

if (darkToggle) {
    // restore saved preference if available
    try {
        const saved = localStorage.getItem('dark-mode');
        isDark = saved === '1';
    } catch (e) {
        isDark = false;
    }

    darkToggle.addEventListener('click', () => {
        isDark = !isDark;
        setDarkMode(isDark);
    });

    // 초기 상태 아이콘 설정
    setDarkMode(isDark);
}