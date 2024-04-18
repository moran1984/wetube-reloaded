# Wetube Reloaded

프로젝트를 구성할때 생각할 것들

1. 어떤 종류의 데이터 이용

   - 1. Video (영상 업로드, 수정, 자막, 삭제,시청, 댓글)
   - 2. 유저 (유저계정 생성, 로그인 프로필 수정, 삭제)

2. 이제 이 도메인 (1,2)을 URL 차원에서 생각해보자 = URL 그룹핑

# root에 가까운 주소들 -> Global Router === /home 에서 바로갈 수 있는 주소경로들

/ -> Home
/join -> Join
/login -> Login
/search -> Search

# user 관련 라우터 -> User Router

/users/:id-> See User
/users/logout -> Log Out
/users/edit -> Edit MY Profile
/users/delete -> Delete MY Profile

# video 관련 라우터 -> Video Router

/videos/:id -> Watch Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video
