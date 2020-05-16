var Sounds = {}

var SoundKeys = [
  "Destroy", 
  "DropDash", 
  "Jump", 
  "Land",
  "LoseRings",
  "Ring", 
  "Roll", 
  "Skidding",
  "WaterGush",
]

function preloadGameSounds() {
  SoundKeys.forEach((sound) => {
    game.load.audio(sound, [
      `assets/sounds/${sound}.ogg`,
      `assets/sounds/${sound}.m4a`,
    ])
  })

  game.load.audio("GreenGroveAct1", [
    `assets/music/GreenGroveAct1.ogg`,
    `assets/music/GreenGroveAct1.m4a`,
  ])
}

function loadGameSounds() {
  SoundKeys.forEach((sound) => {
    Sounds[sound] = game.add.audio(sound)
  })

  // game.sound.setDecodedCallback(decodeArray, () => {
  //   console.log("audio loaded")
  // }, this);
}

function playLevelTrack(level) {
  if (level.properties && level.properties.track && level.properties.track !== currentTrack) {
    currentTrack = level.properties.track
  
    var track = game.add.audio(currentTrack)
    // track.loop = true
    // track.play()    
  }
}