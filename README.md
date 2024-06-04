# 🏃🏻‍♀️ Today-I-Workout 🏃‍♂️ 
내일배움 캠프 8조(Five Is) 오운완 프로젝트 ^_^


- [배포 웹사이트 링크](아직없는데 채워 넣을 예정)

## 📜 프로젝트 기획 및 설계

### Minutes of meeting

- [S.A](https://www.notion.so/teamsparta/Five-Is-30cd86fa2e144752a58d2b8664cb0979)
- [팀 프로젝트 회의록 링크](https://spiffy-geometry-22c.notion.site/ef57f9c2d7944966b6c93b122443477e)
- [팀 프로젝트 대본 링크](https://drive.google.com/file/d/11_R504OA4VRHk2Fqb26lR_6jou-vqui6/view?usp=drive_link)
- [팀 프로젝트 ppt 링크](https://drive.google.com/file/d/10cWQpLjBXfKnODRAZiD6YYZt8tijxFgC/view?usp=drive_link)

### TMDB API

- TMDB open API 사용 이유
  - 간단하게 사용했던 기존 API에서 다른 API를 사용하며 전체적인 기능을 고루 사용하기 위함

### Wireframe

![alt text](assets/image-9.png)

- 웹 기반 UI/UX 협업 툴, Figma 사용
- [Figma 협업 링크](https://www.figma.com/file/s9buq5bmNj29GUb6YuMWEZ/Untitled?type=design&node-id=17-39&mode=design&t=ztDeOEphbsYTa3nz-0)

### Code Convention

- `.prettierrc` 및 `reset.css` 사용 협업
- 변수 / 함수명 지정
  - Camel Case 사용 : `makeCard`
  - 변수명에 축약어 사용 금지 : `Del(x) Delete(o)`
  - DOM API 변수명과 클래스명 통일 : `const modal = document.querySelector(".modal")`
  - 변수명은 명사, 함수명은 동사 사용
  - 함수 작성 시 상단 주석 필수
  - 변수 / 함수명 20자 이내
- Scope 규칙
  - tap depth 길이 최대 4
  - 중괄호 앞 공백 추가
  - 조건문 끝 처리는 else if 사용 지양
  - Promise 사용 지양 및 async, await 사용 권장
- 주석 규칙
  - 한줄 `//`, 두줄 `/* */` 사용

### Github Collaboration Rules

<!-- ![팀 프로젝트 협업 규칙](image.png){: width="100" height="100"} -->
<img src="assets/image.png" width="480" height="280">

### Github branch 생성 및 Pull Request 규칙

1️⃣ `remote dev branch`에서 `local dev branch`로 `pull`  
2️⃣ Github issue 생성 이후 `[issue별 자동 생성 브랜치명] branch` 생성

![alt text](assets/image-1.png)

3️⃣ `local [issue별 자동 생성 브랜치명] branch`에서 기능 구현 완료 후 `remote [issue별 자동 생성 브랜치명] branch`로 add, commit, push  
4️⃣ `local [issue별 자동 생성 브랜치명] branch`에서 `remote dev branch`로 pull  
5️⃣ `local [issue별 자동 생성 브랜치명] branch`에서 conflict 해결 후 원격 [issue별 기능 구현] branch로 add, commit, push  
6️⃣ `local [issue별 자동 생성 브랜치명] branch`에서 원격 dev branch로 pull request

- Issue 內 자동 생성 branch 명칭 수정 금지

## 💻 프로젝트 설명

### 🚀 Landing Page

`랜딩페이지 상단`  
<img src="assets/image-2.png" width="700" height="400">

`랜딩페이지 중단`  
<img src="assets/image-7.png" width="500" height="400">

`랜딩페이지 하단`  
<img src="assets/image-8.png" width="500" height="400">

- `MOVOLLEH` 버튼 : 홈페이지 새로고침
- `Credit` 버튼 : 팀 프로젝트 및 팀원 소개 페이지 이동
- `검색` 버튼 : 검색 내용을 포함하는 영화 제목 검색
  - 검색 후 동적 페이지네이션 기능으로 다른 페이지 이동 가능
- `인기영화 볼래?` : 인기 순으로 영화 정렬 및 더보기 기능
- `최신영화 볼래?` : 최신 순으로 영화 정렬 및 더보기 기능
- `최고평점 영화 볼래?` : 최고평점 순으로 영화 정렬 및 더보기 기능
  - 우측 스크롤 시 더보기 가능

### 😎 Credit Page

`팀 프로젝트 및 팀원 소개 페이지`  
![alt text](assets/image-6.png)

- `View out GitHub Repository` : 웹페이지 배포 레포지토리 접근
- `Check out the Live Project` : 웹페이지 배포 링크 접근
- `Blog` 및 `Github` : 각 팀원의 블로그 및 깃허브 계정 접근

### 🧾 Description Page

`상세 페이지 상단`  
![alt text](assets/image-3.png)

`상세 페이지 하단`  
![alt text](assets/image-4.png)

- `ANVOLLEH` 버튼 : 랜딩 페이지 복귀
- 리뷰 `작성` 버튼 : 기입된 리뷰 내용과 별점을 localStorage에 저장후 출력
  - Validation Check
    1. 리뷰 내용 공백 불가
    2. 별점 미선택 불가
    3. 기존 리뷰와 동일한 작성자명 불가
    4. 공백 or 숫자로만 구성된 이름 불가
    5. 비밀번호 8자 이상, 숫자 및 특수문자 포함 필수
- 리뷰 `수정` 버튼 : 기입된 리뷰 내용, 별점 수정 이후 비밀번호를 검증하여 localStorage에 재저장후 출력
  - Validation Check
    1. 리뷰 내용 공백 불가
    2. 별점 미선택 불가
- `6개 더볼래?` 좌우측 화살표 버튼 : 상세 페이지 영화 기반 추천 영화 리스트 인기도 순 출력 및 더보기 가능

## 📂 프로젝트 구성

- src
  - crewDetail
    - [crewCard.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/crewDetail/crewCard.js)
    - [movieDetail.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/crewDetail/movieDetail.js)
  - modal
    - [modal.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/modal/modal.js)
  - pagination
    - [pagination.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/pagination/pagination.js)
  - review
    - [review.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/review/review.js)
  - search
    - [search.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/search/search.js)
  - tmdb-api
    - [api.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/tmdb-api/api.js)
    - [option.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/tmdb-api/option.js)
  - [main.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/main.js)
  - [render.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/render.js)
  - [similarMovies.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/similarMovies.js)
  - [state.js](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/src/state.js)
- style
  - [credit.css](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/style/credit.css)
  - [index.css](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/style/index.css)
  - [movieDetail.css](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/style/movieDetail.css)
  - [reset.css](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/style/reset.css)
  - [review.css](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/style/review.css)
  - [similarMoviesStyle.css](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/style/similarMoviesStyle.css)
- [credit.html](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/credit.html)
- [index.html](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/index.html)
- [movieDetail.html](https://github.com/eliotjang/Movolleh-Movie-Website/blob/dev/movieDetail.html)

## ✨ 사용 기술

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img  src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img  src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 🔗 참고자료

- [TMDB Now Playing API](https://developer.themoviedb.org/reference/movie-now-playing-list)
- [TMDB Popular API](https://developer.themoviedb.org/reference/movie-popular-list)
- [TMDB Top Rated API](https://developer.themoviedb.org/reference/movie-top-rated-list)
- [TMDB Details API](https://developer.themoviedb.org/reference/movie-details)
- [TMDB Credits API](https://developer.themoviedb.org/reference/movie-credits)
- [TMDB Similar API](https://developer.themoviedb.org/reference/movie-similar)

## 👨‍👨‍👦‍👦 프로젝트 제작 인원

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/eliotjang"><img src="https://ca.slack-edge.com/T06B9PCLY1E-U06UASA7JE8-9f39c84302c0-512" width="100px;" alt="장성원"/><br /><sub><b> 팀장 : 장성원 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/9r3dflam3"><img src="https://ca.slack-edge.com/T06B9PCLY1E-U06UH5H6ASC-184194feba5f-51" width="100px;" alt="구남욱"/><br /><sub><b> 팀원 : 구남욱 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/CDR4733"><img src="https://ca.slack-edge.com/T06B9PCLY1E-U06LCPXFZPG-711e64fb68c5-512" width="100px;" alt="석한솔"/><br /><sub><b> 팀원 : 석한솔 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/KAPUIST"><img src="https://ca.slack-edge.com/T06B9PCLY1E-U06U0D3HBUZ-0a269006683b-512" width="100px;" alt="손태권"/><br /><sub><b> 팀원 : 손태권 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/xszvvfm"><img src="https://ca.slack-edge.com/T06B9PCLY1E-U06M777LMDW-ge8be5c10c59-192" width="100px;" alt="방채은"/><br /><sub><b> 팀원 : 방채은 </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
