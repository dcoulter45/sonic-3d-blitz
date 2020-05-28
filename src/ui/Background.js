class Background {
  constructor(level) {
    if (level.backgroundcolor) {
      if (level.backgroundcolor === "#d1c1a0") {
        var background = game.add.sprite(0, 0, "sandSky", 0, groups.backdrop)
        background.fixedToCamera = true
      } 
      else {
        var hex = parseInt(level.backgroundcolor.replace("#", ""), 16)
        var bg = game.add.graphics(0, 0, groups.backdrop)
  
        bg.beginFill(hex)
        bg.drawRect(0, 0, 400, 240)
        bg.endFill()
        bg.fixedToCamera = true
      }
    } else {
      var background = game.add.sprite(0, 0, "blueSky", 0, groups.backdrop)
      background.fixedToCamera = true
    }
  }
}