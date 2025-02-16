# 프로젝트 소개
---
> AI로 여행 코스를 추천해주는 웹서비스입니다.
> 
> 사용자는 AI와 대화한 후 개인 맞춤 여행지들을 추천받을 수 있습니다.
>
> 자유게시판과 여행지 후기를 등록하여 사람들과 공유할 수 있습니다.
>
> 사용 기술: Java, SpringBoot, React, Redis, AWS(EC2, RDS, S3), Docker, GitActions, IntelliJ, VSCode, Notion, Figma
>
> 개발 기간: 2024.03 ~ 2024.06
>
> 개발 인원: FE 4명
>
> [백엔드 Github](https://github.com/eunaJ/LightHouseAI)

# ERD 구조
---
![등대 ERD](https://github.com/user-attachments/assets/fe317326-fda6-49aa-8db9-6b3a4ad70db4)

# 시스템 아키텍처
---
![등대 아키텍처](https://github.com/user-attachments/assets/8e247c81-db30-44b4-8ee9-1a3298d87fa8)

# 주요 기능
1. 회원가입, 로그인
  - 일반, 카카오, 네이버 총 3가지 방식으로 로그인할 수 있다.
2. AI 여행 코스 추천
  - 공공 데이터를 학습한 GPT-3.5_Turbo 모델이 대화형 인터페이스로 사용자와 대화 후 키워드를 추출하여 이미 등록된 여행지 중에서 높은 선호도 순으로 추천한다.
3. 자유게시판
  - 회원만 댓글, 좋아요가 가능하다. 
4. 여행지
  - 여행 인원, 별점, 장소별 후기 등을 등록할 수 있다.
