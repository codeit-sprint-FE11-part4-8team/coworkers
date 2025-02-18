# 🗓️ 일정 관리와 공유 기능을 제공하는 Taskify

![Coworkers](<img width="1020" alt="랜딩 페이지" src="https://github.com/user-attachments/assets/5c70544f-bdf7-451f-af18-47afe61f1b1d" />)

<br>

## 프로젝트 소개

- 사용자는 업무 배정 및 현황 공유를 할 수 있습니다.
- 실제 업무 프로세스에 최적화된 To-Do 리스트 형태로 업무 생성, 공유, 성과 지표를 가시적으로 확인할 수 있습니다.
- 팀을 생성하여 멤버들 간 업무 공유가 가능합니다.
- 자유게시판에 자유롭게 글을 작성하고, 댓글을 남길 수 있습니다.

<br>

## 팀원 구성

|               **강수민**               |                  **김도훈**                  |                  **오병훈**                  |              **이준희**              |                **홍지윤**                |
| :------------------------------------: | :------------------------------------------: | :------------------------------------------: | :----------------------------------: | :--------------------------------------: |
| [@hpk5802](https://github.com/hpk5802) | [@kimdohoon2](https://github.com/kimdohoon2) | [@bhoh032019](https://github.com/bhoh032019) | [@dlwnsl](https://github.com/dlwnsl) | [@h-zhirun](https://github.com/h-zhirun) |

<br>

### 개발 환경

- Front-end : React, Next.js, TypeScript, TailwindCSS, Redux
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Discord, Notion
- 서비스 배포 환경 : Vercel

<br>

### ESLint와 Prettier

- 코드 스타일 일관성 유지 : 정해진 규칙에 따라 자동으로 코드 스타일을 정리했습니다.
- Airbnb 코딩 컨벤션을 참고하여 기본 규칙을 설정했습니다.
- 협업 시 컨벤션을 신경 쓰는 부담을 줄이고, 빠르고 효율적인 개발을 목표로 설정하였습니다.

<br>

### 브랜치 전략

- Git-flow 전략을 기반으로 브랜치를 관리했습니다.
  - **main** : 배포 단계에서만 사용하는 브랜치.
  - **develop** : 개발 작업의 중심 브랜치로, git-flow에서 master의 역할을 수행.
  - **Feature** : 기능 단위로 개발을 진행하는 보조 브랜치로, 작업 완료 후 develop 브랜치에 병합한 뒤 삭제하여 브랜치 관리를 간소화했습니다.

<br>

### 프로젝트 구조

```
coworkers
├─ .eslintrc.json
├─ .prettierrc
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
├─ README.md
├─ src
│  └─ app
│     ├─ (component)
│     │  ├─ button
│     │  ├─ dropdown
│     │  └─ modal
│     ├─ (routes)
│     │  ├─ addboard
│     │  ├─ addteam
│     │  ├─ auth
│     │  ├─ boards
│     │  │  └─ [boardid]
│     │  │     └─ editboard
│     │  ├─ invitation
│     │  ├─ landing
│     │  ├─ login
│     │  ├─ myhistory
│     │  ├─ mypage
│     │  ├─ noteam
│     │  ├─ reset-password
│     │  ├─ signup
│     │  └─ [teamid]
│     │     ├─ edit
│     │     └─ [tasklist]
│     ├─ api
│     ├─ components
│     │  ├─ addboard
│     │  ├─ auth
│     │  ├─ boarddetail
│     │  ├─ boards
│     │  ├─ common
│     │  │  ├─ auth
│     │  │  ├─ button
│     │  │  ├─ dropdown
│     │  │  ├─ header
│     │  │  ├─ input
│     │  │  ├─ loading
│     │  │  └─ modal
│     │  ├─ editboard
│     │  ├─ icons
│     │  ├─ landing
│     │  ├─ login
│     │  ├─ myhistory
│     │  ├─ mypage
│     │  ├─ resetpassword
│     │  ├─ signup
│     │  ├─ taskdetail
│     │  ├─ tasklist
│     │  └─ team
│     ├─ constants
│     ├─ hooks
│     ├─ layout.tsx
│     ├─ lib
│     │  ├─ articles
│     │  ├─ articlecomment
│     │  ├─ auth
│     │  ├─ comment
│     │  ├─ group
│     │  ├─ image
│     │  ├─ instance.ts
│     │  ├─ oauth
│     │  ├─ task
│     │  ├─ tasklist
│     │  └─ user
│     ├─ not-found.tsx
│     ├─ notfound
│     ├─ page.tsx
│     ├─ providers
│     ├─ stores
│     ├─ styles
│     ├─ types
│     └─ utils
├─ tailwind.config.ts
└─ tsconfig.json

```
