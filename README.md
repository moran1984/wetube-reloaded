# Wetube Reloaded

프로젝트를 구성할때 생각할 것들

1. 어떤 종류의 데이터 이용

   - 1. Video (영상 업로드, 수정, 자막, 삭제,시청, 댓글)
   - 2. 유저 (유저계정 생성, 로그인 프로필 수정, 삭제)

2. 이제 이 도메인 (1,2)을 URL 차원에서 생각해보자

# root에 가까운 주소들 -> Global Router === /home 에서 바로갈 수 있는 주소경로들

/ -> Home
/join -> Join
/login -> Login
/search -> Search

# user 관련 라우터 -> User Router

/edit-user -> /users/edit-> Edit Profile
/delete-user -> /users/delete -> Delete Profile

# video 관련 라우터 -> Video Router

/watch-video -> /videos/watch -> Watch Video
/edit-video -> /videos/edit -> Edit Video
/delete-video -> /videos/delete -> Delete Video
/videos-comment -> /videos/comments -> Comment on a video
/videos-comments -> /videos/comments/delete -> Delete A Comment of a Video
