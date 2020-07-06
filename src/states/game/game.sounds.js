var Sounds = {}

var SoundKeys = [
  "BlueShield",
  "BossHit",
  "Break",
  "BubbleBounce",
  "BubbleShield",
  "Explosion",
  "Destroy", 
  "Drop",
  "DropDash",
  "FireDash",
  "FireShield",
  "Hurt",
  "Jump",
  "Land",
  "Lava",
  "LightningJump",
  "LightningShield",
  "LoseRings",
  "MightyDrill",
  "Ring",
  "Roll",
  "Skidding",
  "SignPost",
  "ScoreAdd",
  "ScoreTotal",
  "Spike",
  "Spring",
  "StarPost",
  "WaterGush",
  "WindowShatter"
]

var MusicKeys = [
  "CollisionChaosPresent",
  "DiamondDustAct2",
  "GreenGroveAct2",
  "PalmTreePanicGoodFuture",
  "VolcanoValleyAct2",
  "BattleTheme",
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
  if (level.music) {
    game.track = game.add.audio(level.music)
    game.track.play(null, 0, 1, true, true)
  }
}