document.addEventListener('DOMContentLoaded', (event) => {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.close');
    const loginForm = document.getElementById('login-form');
    const showSignupButton = document.getElementById('show-signup');

    // 로그인 상태 확인 함수
    const isLoggedIn = () => {
        return localStorage.getItem('loggedIn') === 'true';
    };

    // 로그인 상태 업데이트 함수
    const updateLoginStatus = () => {
        if (isLoggedIn()) {
            loginLink.style.display = 'none';
            logoutLink.style.display = 'block';
        } else {
            loginLink.style.display = 'block';
            logoutLink.style.display = 'none';
        }
    };

    // 로그인 폼 제출 이벤트 핸들러
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // 로그인 로직 수행 (여기서는 로컬 스토리지 사용)
        localStorage.setItem('loggedIn', 'true');
        updateLoginStatus();
        loginModal.style.display = 'none';
    });

    // 로그아웃 링크 클릭 이벤트 핸들러
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        updateLoginStatus();
    });

    // 로그인 링크 클릭 이벤트 핸들러
    loginLink.onclick = function (event) {
        event.preventDefault();
        loginModal.style.display = 'block';
    };

    // 회원가입 버튼 클릭 이벤트 핸들러
    showSignupButton.onclick = function (event) {
        event.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    };

    // 닫기 버튼 클릭 이벤트 핸들러
    closeButtons.forEach((button) => {
        button.onclick = function () {
            const modalId = button.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        };
    });

    // 모달 외부 클릭 이벤트 핸들러
    window.onclick = function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        } else if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    };

    // 좋아요 버튼 클릭 이벤트 핸들러
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const heart = this.querySelector('.heart');
            const likeCountElement = this.nextElementSibling;
            let likeCount = parseInt(likeCountElement.textContent);

            if (heart.textContent === '♡') {
                heart.textContent = '🖤';
                likeCount++;
            } else {
                heart.textContent = '♡';
                likeCount--;
            }

            likeCountElement.textContent = likeCount;
            if (likeCount > 0) {
                likeCountElement.style.display = 'inline';
            } else {
                likeCountElement.style.display = 'none';
            }
        });
    });
    // 페이지 로드 시 로그인 상태 업데이트
    updateLoginStatus();
});
