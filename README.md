# Google Assistant 학봉관 기상곡 플레이어
사감쌤들 그리워요😢 그리운 사감썜과 그 음악을 위한 Google Assistant 플레이어

# 그래서 이게 뭔가요
디미고라이프의 기상곡을 구글 어시스턴트로 들어봅시다

# Workflow
![](https://e.imgur.com/dN8mub7.png)

# Used Tech
- Backend
  - Hosting: Firebase Function
  - Libraries
    - Express: Function Routing
    - dotenv: storing dimigolife authenticating data
    - axios: request dimigolife auth/chart data
    - yt-search: search video by title on youtube
    - ytdl-core: download searched video
    - ffmpeg: convert downloaded video to audio-format
- Frontend
  - front-frontend: Actions on Google (Google Assistant Intergration)
  - fron-backend: Dialogflow connected with Fulfullment

# WIP
- [ ] make lighter backend
- [ ] for 우정학사
- [ ] Direct-Recorded 사감쌤 Voice

# Caution
모든 음원 데이터는 유튜브에서 파싱해옵니다. 이 앱은 사용자의 개인정보를 보관하지 않습니다. 
