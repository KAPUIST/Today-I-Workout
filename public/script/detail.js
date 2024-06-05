document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (postId) {
        // 서버에서 게시글 데이터 가져오기
        fetch(`/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById('post-title').textContent = data.title;
                document.getElementById('post-content').textContent =
                    data.content;
                document.getElementById(
                    'author-name'
                ).textContent = `글쓴이: ${data.author}`;
                const likeCountElement = document.querySelector('.like-count');
                likeCountElement.textContent = data.likes;
                if (data.likes > 0) {
                    likeCountElement.style.display = 'inline';
                }

                // 댓글 로드
                const commentList = document.getElementById('comment-list');
                commentList.innerHTML = ''; // 기존 댓글 초기화
                data.comments.forEach((comment) => {
                    const li = document.createElement('li');
                    li.dataset.commentId = comment.id; // 댓글 ID 저장
                    li.innerHTML = `
                        <p>${comment.content}</p>
                        <button class="edit-comment">수정</button>
                        <button class="delete-comment">삭제</button>
                    `;
                    commentList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Error fetching post data:', error);
            });
    }

    // 좋아요 버튼 클릭 이벤트 핸들러
    const likeButton = document.querySelector('.like-button');
    likeButton.addEventListener('click', () => {
        const heart = likeButton.querySelector('.heart');
        const likeCountElement = likeButton.nextElementSibling;
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

        // 서버에 좋아요 수 업데이트
        fetch(`/api/posts/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likes: likeCount }),
        }).catch((error) => {
            console.error('Error updating like count:', error);
        });
    });

    // 댓글 등록 이벤트 핸들러
    document.getElementById('submit-comment').addEventListener('click', () => {
        const newComment = document.getElementById('new-comment').value;
        if (newComment) {
            fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newComment }),
            })
                .then((response) => response.json())
                .then((comment) => {
                    const commentList = document.getElementById('comment-list');
                    const li = document.createElement('li');
                    li.dataset.commentId = comment.id; // 댓글 ID 저장
                    li.innerHTML = `
                    <p>${comment.content}</p>
                    <button class="edit-comment">수정</button>
                    <button class="delete-comment">삭제</button>
                `;
                    commentList.appendChild(li);
                    document.getElementById('new-comment').value = '';
                })
                .catch((error) => {
                    console.error('Error adding comment:', error);
                });
        }
    });

    // 댓글 수정 및 삭제 이벤트 핸들러 (위임)
    document
        .getElementById('comment-list')
        .addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-comment')) {
                // 댓글 수정 로직
                const li = event.target.closest('li');
                const p = li.querySelector('p');
                const newContent = prompt('댓글을 수정하세요:', p.textContent);
                if (newContent) {
                    fetch(
                        `/api/posts/${postId}/comments/${li.dataset.commentId}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ content: newContent }),
                        }
                    )
                        .then((response) => response.json())
                        .then((updatedComment) => {
                            p.textContent = updatedComment.content;
                        })
                        .catch((error) => {
                            console.error('Error updating comment:', error);
                        });
                }
            } else if (event.target.classList.contains('delete-comment')) {
                // 댓글 삭제 로직
                const li = event.target.closest('li');
                fetch(`/api/posts/${postId}/comments/${li.dataset.commentId}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        li.remove();
                    })
                    .catch((error) => {
                        console.error('Error deleting comment:', error);
                    });
            }
        });
});
