var fullscreenBtn = document.getElementById("fullscreen");

fullscreenBtn.onclick = () => {
  var gameWindow = document.getElementById("game-window");

  gameWindow.requestFullscreen();
}