class Background {
  constructor(level) {
    if (level === "SearingSands") {
      var background = game.add.sprite(0, 0, "sandSky", 0, groups.backdrop)
      background.fixedToCamera = true
    }
    else if (level === "DeathEgg") {
      var background = game.add.sprite(0, 0, "space", 0, groups.backdrop)
      background.fixedToCamera = true
    }
    else if (level === "WildWoodland" || level === "SunriseShore" || level === "PolarParadise") {
      var background = game.add.sprite(0, 0, "blueSky", 0, groups.backdrop)
      background.fixedToCamera = true
    }
    else {
      var hex = parseInt("131313", 16)
      var bg = game.add.graphics(0, 0, groups.backdrop)

      bg.beginFill(hex)
      bg.drawRect(0, 0, 400, 240)
      bg.endFill()
      bg.fixedToCamera = true
    }
  }
}