const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volumeValue = value;
  video.volume = value;

  if (volumeValue === "0") {
    video.muted = true;
    muteBtn.innerText = "Unmute";
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

const handleSkip = (event) => {
  event.preventDefault();
  if (event.keyCode === 39) {
    video.currentTime += 5;
  }
  if (event.keyCode === 37) {
    video.currentTime -= 5;
  }
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
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

window.addEventListener("keydown", handleSkip);
video.addEventListener("loadedmetadata", handelLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
