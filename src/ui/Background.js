class Background {
  constructor(level) {
    if (level.backgroundcolor) {
      var bg = game.add.graphics(0, 0, groups.ui)
      bg.beginFill(level.backgroundcolor);
      bg.drawRect(0, 0, 400, 240)
      bg.endFill()
      bg.alpha = 0
      bg.fixedToCamera = true
    } else {
      var background = game.add.sprite(0, 0, "blueSky", 0, groups.backdrop)
      background.fixedToCamera = true
    }
  }
}