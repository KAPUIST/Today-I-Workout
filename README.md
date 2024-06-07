# 🏃🏻‍♀️ Today-I-Workout 🏃‍♂️ 
내일배움 캠프 8조(Five Is) 오운완 프로젝트 ^_^


- [배포 웹사이트 링크](https://dfgdwssegf.shop/posts)

- [API 명세서 링크](https://teamsparta.notion.site/API-Five-is-Today-I-Workout-867ce70ab63c4c498dd8313df03dcdb4)

- [ERD 링크](https://drawsql.app/teams/josaw/diagrams/today-i-workout)

## 📜 프로젝트 기획 및 설계

### Minutes of meeting

- [S.A 페이지](https://www.notion.so/teamsparta/Five-Is-30cd86fa2e144752a58d2b8664cb0979)
- [팀 프로젝트 ppt 링크](https://docs.google.com/presentation/d/1k5fgcVAvy8mIzc48lH3otTqVF3H4yEOAhh_Y5qQvv1c/edit#slide=id.g27311cba8c2_0_35)

### Wireframe

![와이어프레임2](https://github.com/KAPUIST/Today-I-Workout/assets/166491440/05d0e589-bad6-4db0-b8a2-666c26cee59e)

- 웹 기반 UI/UX 협업 툴, Figma 사용
- [피그마 링크](https://www.figma.com/design/m1UTAHbOgk0gp0UNzvEcRz/seungyeop-yoo's-team-library?node-id=0-1&t=AO8poltChcf9MG2B-0)

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

![Untitled_(1)](https://github.com/KAPUIST/Today-I-Workout/assets/166491440/915ab647-3475-44ac-ab3b-d659cb8fcbef)

1. remote `dev` branch에서 local `dev` branch로 pull
2. Github Issue 생성 이후 `[issue별 자동 생성 브랜치명]` branch 생성
3. local `[issue별 자동 생성 브랜치명]` branch 기능 구현 완료 후
    
    remote `[issue별 자동 생성 브랜치명]` branch로 push
    
4. local `[issue별 자동 생성 브랜치명]` branch에서
    
    remote `dev` branch로 pull
    
5. local `[issue별 자동 생성 브랜치명]` branch에서 conflict 해결 후
remote `[issue별 자동 생성 브랜치명]` branch로 push


### 폴더 구조

```markdown
node_modules/
prisma/
└── schema.prisma
📦src
 ┣ 📂constants
 ┃ ┣ 📜env.constant.js
 ┃ ┣ 📜exerciseType.constant.js
 ┃ ┣ 📜mealType.constant.js
 ┃ ┣ 📜order.constant.js
 ┃ ┣ 📜postType.constant.js
 ┃ ┗ 📜status.constant.js
 ┣ 📂middlewares
 ┃ ┣ 📜auth.middleware.js
 ┃ ┗ 📜error.middleware.js
 ┣ 📂routers
 ┃ ┣ 📜auth.router.js
 ┃ ┣ 📜comment.router.js
 ┃ ┣ 📜post.router.js
 ┃ ┗ 📜user.router.js
 ┣ 📂services
 ┃ ┣ 📜auth.service.js
 ┃ ┣ 📜comment.service.js
 ┃ ┣ 📜passwordChange.service.js
 ┃ ┣ 📜post.service.js
 ┃ ┗ 📜user.service.js
 ┣ 📂utils
 ┃ ┣ 📂prisma
 ┃ ┃ ┣ 📜prisma.seed.js
 ┃ ┃ ┗ 📜prisma.util.js
 ┃ ┣ 📂validator
 ┃ ┃ ┣ 📜conmentWrite.validator.js
 ┃ ┃ ┣ 📜passwordChange.validator.js
 ┃ ┃ ┣ 📜postWrite.validator.js
 ┃ ┃ ┣ 📜signIn.validator.js
 ┃ ┃ ┣ 📜signUp.validator.js
 ┃ ┃ ┗ 📜updateUser.validator.js
 ┃ ┣ 📜customErrorHandler.js
 ┃ ┗ 📜jwt.util.js
 ┗ 📜app.js
.env
.gitignore
.prettierrc
package-lock.json
package.json
README.md
yarn.lock
```

## ✨ 사용 기술
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  ![Nodemailer](https://img.shields.io/badge/Nodemailer-2D3748?style=for-the-badge&logo=nodemailer&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-2D3748?style=for-the-badge&logo=AWS&logoColor=black)
  ![Figma](https://img.shields.io/badge/Figma-2D3748?style=for-the-badge&logo=AWS&logoColor=black)

## 🔗 참고자료

- [Nodemailer](https://nodemailer.com/)
- [DASHIN](https://www.dietshin.com/calorie/calorie_main.asp)

## 👨‍👨‍👦‍👦 프로젝트 제작 인원

![aaaazzzz](https://github.com/KAPUIST/Today-I-Workout/assets/166491440/9e15be39-a385-454d-a52c-4a082b528fcc)
