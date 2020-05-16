var muteCheckbox = document.getElementById("mute")
var isMuted = localStorage.getItem("muteGame") === "true"
muteCheckbox.checked = isMuted
muteGame = isMuted

muteCheckbox.onchange = (event) => {
  muteGame = muteCheckbox.checked
  localStorage.setItem("muteGame", JSON.stringify(muteCheckbox.checked))
}

var objectCheckbox = document.getElementById("objects")
var objectBoxesOn = localStorage.getItem("drawObjectBoxes") === "true"
objectCheckbox.checked = objectBoxesOn
drawObjectBoxes = objectBoxesOn

objectCheckbox.onchange = (event) => {
  drawObjectBoxes = objectCheckbox.checked
  localStorage.setItem("drawObjectBoxes", JSON.stringify(objectCheckbox.checked))
}

var wallCheckbox = document.getElementById("walls")
var wallBoxesOn = localStorage.getItem("drawWallBoxes") === "true"
wallCheckbox.checked = wallBoxesOn
drawWallBoxes = wallBoxesOn

wallCheckbox.onchange = (event) => {
  drawWallBoxes = wallCheckbox.checked
  localStorage.setItem("drawWallBoxes", JSON.stringify(wallCheckbox.checked))
}
