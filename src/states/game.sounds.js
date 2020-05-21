var Sounds = {}

var SoundKeys = [
  "Destroy", 
  "DropDash",
  "Hurt", 
  "Jump", 
  "Land",
  "LoseRings",
  "Ring", 
  "Roll", 
  "Skidding",
  "Spike",
  "WaterGush",
]

var MusicKeys = [
  "GreenGroveAct1",
  "ExtraLife",
  "GameOver",
]

function preloadGameSounds() {
  SoundKeys.forEach((sound) => {
    game.load.audio(sound, [
      `assets/sounds/${sound}.ogg`,
      `assets/sounds/${sound}.m4a`,
    ])
  })

  MusicKeys.forEach((track) => {
    game.load.audio(track, [
      `assets/music/${track}.ogg`,
      `assets/music/${track}.m4a`,
    ])
  })  
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
  
    game.track = game.add.audio(currentTrack)
    // track.loop = true
    game.track.play()
  }
}