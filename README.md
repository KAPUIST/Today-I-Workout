# 🏃🏻‍♀️ Today-I-Workout 🏃‍♂️ 
내일배움 캠프 8조(Five Is) 오운완 프로젝트 ^_^


- [배포 웹사이트 링크](아직없는데 채워 넣을 예정)

- [API 명세서 링크](https://teamsparta.notion.site/API-Five-is-Today-I-Workout-867ce70ab63c4c498dd8313df03dcdb4)

- [ERD 링크](https://drawsql.app/teams/josaw/diagrams/today-i-workout)

## 📜 프로젝트 기획 및 설계

### Minutes of meeting

- [S.A](https://www.notion.so/teamsparta/Five-Is-30cd86fa2e144752a58d2b8664cb0979)
- [팀 프로젝트 회의록 링크](https://teamsparta.notion.site/0dfaae18a1bb483482781b8c32aef644)
- [팀 프로젝트 대본 링크](아마도 생성 예정)
- [팀 프로젝트 ppt 링크](아마도 생성 예정)

### Wireframe

![alt text](사진나오면 등록예정)

- 웹 기반 UI/UX 협업 툴, Figma 사용
- [Figma 협업 링크](피그마 링크 나오면 등록)

### Code Convention

### **Naming Rules**

- Prisma Model 네이밍 규칙
    - model 파스칼 케이스
    - 데이터베이스 테이블 명 스네이크 케이스
    - mySQL 컬럼명 스네이크 케이스
    - ES6 모듈 시스템 변수명 파스칼 케이스
        
        ```jsx
        // 단, express, prisma는 전부 소문자 사용
        import express from 'express';
        import { prisma } from '../utils/prisma/index.js';
        import { PrismaClient } from '@prisma/client';
        ```
        
    - JavaScript 컬럼명 카멜 케이스
    
    ```jsx
    model Post {
      postId Int @id @default(autoincrement()) @map("post_id")
      title String @map("title")
      content String @map("content") @db.Text
      password String @map("password")
    
      createdAt DateTime @default(now()) @map("created_at")
      updatedAt DateTime @updatedAt @map("updated_at")
    
      @@map("post")
    }
    
    ```
    

### 변수명 / 함수명 지정

1. Camel Case 사용
2. 기능과 유사한 변수명 / 함수명 작성
    1. 변수명이 길어지더라도 정확한 역할로 선언
        
        `makeCard = () ⇒ {}`
        
    2. 약칭 사용 금지
        
        `Delete (0) Del (x)`
        
3. 변수명은 명사로 작성
4. 함수명은 동사로 작성
5. 함수 또는 특정 scope에 대한 자세한 주석 작성
6. 글자의 길이 : 20자 이내

### 스코프 규칙

```jsx
{
  "printWidth": 120,
  "tabWidth": 4,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "bracketSpacing": true,
  "trailingComma": "none"
}
```

1. 최대 tab depth 길이 : 4
2. 중괄호 앞에 spacebar 1개 추가
3. else if 사용 지양, else 사용 권장
4. 비동기 함수 사용
    1. async, await사용 권장

### 데이터 베이스 네이밍

1. snake Case 사용 
a. 예) user_id, created_at 

### 주석 규칙

1. 주석 한줄 : `//` 
2. 주석 2줄 이상 : `/* */`

### Github Collaboration Rules

# Github Rules

### **깃허브 규칙**

- 모든 기능은 이슈 작성후 해당 이슈에서 브랜치를 생성.

### Commit 규칙

- 하단 깃헙 커밋 규칙을 참고하여 작성
git commit -m “[Feature] -  엑세스 토큰 검증 미들웨어 개발”
- 커밋후 수정사항 발생 시 다시 커밋
git commit -m “[Fix] - 엑세스 토큰 검증 로직 일부 변경”

### 깃헙 커밋 규칙

| 작업 타입 | 작업내용 |
| --- | --- |
| ✨ Update   | 해당 파일에 새로운 기능이 생김 |
| 🎉 Feature | 없던 파일을 생성함, 초기 세팅, 기능 구현 |
| ♻️ Refactor | 코드 리팩토링 |
| 🩹 Fix | 코드 수정 |

### GitHub branch & Pull Request Rules

![Untitled (1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/83c75a39-3aba-4ba4-a792-7aefe4b07895/f4167501-2135-4844-88c3-e57a74c2605b/Untitled_(1).png)

1. remote `dev` branch에서 local `dev` branch로 pull
2. Github Issue 생성 이후 `[issue별 자동 생성 브랜치명]` branch 생성
3. local `[issue별 자동 생성 브랜치명]` branch 기능 구현 완료 후
    
    remote `[issue별 자동 생성 브랜치명]` branch로 push
    
4. local `[issue별 자동 생성 브랜치명]` branch에서
    
    remote `dev` branch로 pull
    
5. local `[issue별 자동 생성 브랜치명]` branch에서 conflict 해결 후
remote `[issue별 자동 생성 브랜치명]` branch로 push

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
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  ![Nodemailer](https://img.shields.io/badge/Nodemailer-2D3748?style=for-the-badge&logo=Nodemailer&logoColor=black)
  ![AWS](https://img.shields.io/badge/AWS-2D3748?style=for-the-badge&logo=AWS&logoColor=black)

## 🔗 참고자료

- [TMDB Now Playing API](https://developer.themoviedb.org/reference/movie-now-playing-list)
- [TMDB Popular API](https://developer.themoviedb.org/reference/movie-popular-list)
- [TMDB Top Rated API](https://developer.themoviedb.org/reference/movie-top-rated-list)
- [TMDB Details API](https://developer.themoviedb.org/reference/movie-details)
- [TMDB Credits API](https://developer.themoviedb.org/reference/movie-credits)
- [TMDB Similar API](https://developer.themoviedb.org/reference/movie-similar)

## 👨‍👨‍👦‍👦 프로젝트 제작 인원

<table>
![aaaazzzz](https://github.com/KAPUIST/Today-I-Workout/assets/166491440/6229469d-4c50-4cd9-80fa-aae19235b492)
</table>
