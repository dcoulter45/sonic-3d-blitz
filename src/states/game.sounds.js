var Sounds = {}

var SoundKeys = [
  "BossHit",
  "Explosion",
  "Destroy", 
  "Drop",
  "DropDash",
  "Hurt", 
  "Jump", 
  "Land",
  "LavaGeyser",
  "LoseRings",
  "Ring", 
  "Roll", 
  "Skidding",
  "SignPost",
  "Spike",
  "StarPost",
  "WaterGush",
]

var MusicKeys = [
  "AmazingArea",
  "BattleTheme",
  "GreenGroveAct1",
  "RustyRuinsAct1",
  "LevelComplete",
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
  var track = getProp("track", level, null)

  if (track) {
    game.track = game.add.audio(track)
    game.track.play(null, 0, 1, true, true)
  }
}