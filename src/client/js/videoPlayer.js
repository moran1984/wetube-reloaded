const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullscreen");
const fullScreeIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

console.log(videoContainer.dataset.id);

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
volumeRange.value = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }

  volumeValue = value;
  video.volume = value;

  if (volumeValue === "0") {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
};
const formatTime = (seconds) => {
  const startIndex = seconds >= 3600 ? 11 : 14;
  return new Date(seconds * 1000).toISOString().substring(startIndex, 19);
};

const handelLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;

  video.currentTime = value;
};
const handleKeyboard = (event) => {
  const keyBoardInput = event.key;
  switch (keyBoardInput) {
    case " ":
      event.preventDefault();
      handleMouseMove();
      handlePlayClick();
      return;
    case "f":
    case "F":
    case "Enter":
      handleFullScreen();
      return;
    case "m":
    case "M":
      event.preventDefault();
      handleMuteClick();
      return;
    case "ArrowRight":
      event.preventDefault();
      handleMouseMove();
      video.currentTime += 10;
      return;
    case "ArrowLeft":
      event.preventDefault();
      handleMouseMove();
      video.currentTime -= 5;
      return;
    case "ArrowUp":
      event.preventDefault();
      volumeValue = Math.min(1, volumeValue + 0.1); // 볼륨 최대값은 1
      video.volume = volumeValue;
      volumeRange.value = volumeValue;
      handleMouseMove();
      if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
      }
      if (volumeValue === 0) {
        video.muted = true;
        muteBtnIcon.classList = "fas fa-volume-mute";
      }
      return;
    case "ArrowDown":
      event.preventDefault();
      volumeValue = Math.max(0, volumeValue - 0.1); // 볼륨 최소값은 0
      video.volume = volumeValue;
      volumeRange.value = volumeValue;
      handleMouseMove();
      if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
      }
      if (volumeValue === 0) {
        video.muted = true;
        muteBtnIcon.classList = "fas fa-volume-mute";
      }
    default:
      return; // 아무 작업도 수행하지 않음
  }
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreeIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreeIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    // 스텝 3. 조건문 실행
    clearTimeout(controlsMovementTimeout); // 스텝 4. 스텝 2에서 작동된 함수(타임아웃) 삭제
    controlsMovementTimeout = null; // 스텝 5. 값은 null로 대임
  }
  videoControls.classList.add("showing"); // 스텝 1.비디오 컨트롤러 보여줌
  controlsMovementTimeout = setTimeout(hideControls, 3000); //  스텝 2. 타임아웃 시작 & 3초뒤 컨트롤러 숨김
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 1000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("click", handlePlayClick);
video.addEventListener("loadeddata", handelLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", handleKeyboard);
