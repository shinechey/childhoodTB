function showStory(storyId) {
  document.querySelector('.story-grid').style.display = 'none';
  document.getElementById(storyId).style.display = 'flex';
}

function goBack() {
  document.querySelectorAll('.story-page').forEach(page => page.style.display = 'none');
  document.querySelector('.story-grid').style.display = 'flex';
}

// 获取所有播放器
document.querySelectorAll(".audio-player").forEach((player, index) => {
  const audio = player.querySelector("audio");
  const playPauseBtn = player.querySelector(".play-pause");
  const progressBar = player.querySelector("input[type='range']");
  const currentTimeDisplay = player.querySelector(".current-time");
  const durationDisplay = player.querySelector(".duration");

  // 更新播放器时间
  function updateTime() {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;

    progressBar.value = (currentTime / duration) * 100 || 0;
    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
  }

  // 格式化时间为 mm:ss
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // 播放或暂停音频
  function togglePlayPause() {
    if (audio.paused) {
      // 暂停其他播放器
      document.querySelectorAll("audio").forEach((otherAudio) => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.closest(".audio-player").querySelector(".play-pause").textContent = "►";
        }
      });
      audio.play();
      playPauseBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playPauseBtn.textContent = "►";
    }
  }

  // 处理进度条拖动
  function seekAudio() {
    const duration = audio.duration || 0;
    const seekTime = (progressBar.value / 100) * duration;
    audio.currentTime = seekTime;
  }

  // 添加事件监听器
  playPauseBtn.addEventListener("click", togglePlayPause);
  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", updateTime);
  progressBar.addEventListener("input", seekAudio);

  // 初始化播放器显示
  updateTime();
});
