document.addEventListener("DOMContentLoaded", () => {
    const fetchPosts = (postType = "") => {
        const url = postType ? `/posts?postType=${postType}` : "/posts";
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const posts = data.data;
                const postList = document.getElementById("post-list");
                postList.innerHTML = "";
                posts.forEach((post) => {
                    const postItem = document.createElement("li");
                    postItem.className = "post-item";
                    postItem.dataset.postId = post.id;
                    postItem.innerHTML = `
                        <div>
                            <img src="${post.imageUrl}" alt="Post Image">
                            <h3>${post.title}</h3>
                            <div class="like-container">
                                <button class="like-button"><span class="heart">♡</span></button>
                                <span class="like-count" style="display: ${post.likes > 0 ? "inline" : "none"}">${post.likes}</span>
                            </div>
                        </div>
                    `;
                    postItem.addEventListener("click", () => {
                        window.location.href = `detail.html?postId=${post.id}`;
                    });

                    const likeButton = postItem.querySelector(".like-button");
                    likeButton.addEventListener("click", (event) => {
                        event.stopPropagation();
                        const heart = likeButton.querySelector(".heart");
                        const likeCountElement = likeButton.nextElementSibling;
                        let likeCount = parseInt(likeCountElement.textContent);

                        if (heart.textContent === "♡") {
                            heart.textContent = "🖤";
                            likeCount++;
                        } else {
                            heart.textContent = "♡";
                            likeCount--;
                        }

                        likeCountElement.textContent = likeCount;
                        if (likeCount > 0) {
                            likeCountElement.style.display = "inline";
                        } else {
                            likeCountElement.style.display = "none";
                        }

                        fetch(`/posts/${post.id}/likes`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ likes: likeCount })
                        }).catch((error) => {
                            console.error("Error updating like count:", error);
                        });
                    });

                    postList.appendChild(postItem);
                });
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    };

    fetchPosts();

    document.getElementById("home-link").addEventListener("click", (event) => {
        event.preventDefault();
        fetchPosts();
    });

    document.getElementById("tiw-link").addEventListener("click", (event) => {
        event.preventDefault();
        fetchPosts("TIW");
    });

    document.getElementById("meal-link").addEventListener("click", (event) => {
        event.preventDefault();
        fetchPosts("DIET");
    });

    const isLoggedIn = () => {
        return localStorage.getItem("loggedIn") === "true";
    };

    const updateLoginStatus = () => {
        const loginLink = document.getElementById("login-link");
        const logoutLink = document.getElementById("logout-link");
        if (isLoggedIn()) {
            loginLink.style.display = "none";
            logoutLink.style.display = "block";
        } else {
            loginLink.style.display = "block";
            logoutLink.style.display = "none";
        }
    };

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        localStorage.setItem("loggedIn", "true");
        updateLoginStatus();
        document.getElementById("login-modal").style.display = "none";
    });

    document.getElementById("logout-link").addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("loggedIn");
        updateLoginStatus();
    });

    document.getElementById("login-link").onclick = (event) => {
        event.preventDefault();
        document.getElementById("login-modal").style.display = "block";
    };

    document.getElementById("show-signup").onclick = (event) => {
        event.preventDefault();
        document.getElementById("login-modal").style.display = "none";
        document.getElementById("signup-modal").style.display = "block";
    };

    document.querySelectorAll(".close").forEach((button) => {
        button.onclick = function () {
            const modalId = button.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "none";
        };
    });

    window.onclick = function (event) {
        const loginModal = document.getElementById("login-modal");
        const signupModal = document.getElementById("signup-modal");
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        } else if (event.target === signupModal) {
            signupModal.style.display = "none";
        }
    };

    updateLoginStatus();

    // 회원가입 폼 제출 처리
    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const userData = {
            email: formData.get("email"),
            password: formData.get("password"),
            username: formData.get("username"),
            currentWeight: formData.get("currentWeight"),
            goalWeight: formData.get("goalWeight"),
            exerciseType: formData.get("exerciseType"),
            bio: formData.get("bio")
        };

        fetch("/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                document.getElementById("signup-modal").style.display = "none";
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
            });
    });
});
