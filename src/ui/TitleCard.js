var mapNameKeys = {
  WildWoodland: 0,
  HotHollow: 1,
  SearingSands: 2,
  PolarParadise: 3,
  SunriseShore: 4,
  DeathEgg: 5,
}

class TitleCard {
  constructor() {
    this.time = game.time.now

    this.black = game.add.graphics(0, 0, groups.ui)
    this.black.beginFill(0x000000);
    this.black.drawRect(0, 0, 400, 240)
    this.black.endFill()
    this.black.fixedToCamera = true

    this.rect = game.add.graphics(0, 0, groups.ui)
    this.rect.beginFill(0xFFFFFF);
    this.rect.drawRect(0, 0, 400, 240)
    this.rect.endFill()
    this.rect.alpha = 0
    this.rect.fixedToCamera = true

    var levelName = levels[game.save.data.level].name
    var index = mapNameKeys[levelName]

    this.bg = game.add.sprite(0, 240, "titleCardBg", 0, groups.ui)
    this.bg.fixedToCamera = true

    this.border = game.add.sprite(0, -240, "titleCardBorder", index, groups.ui)
    this.border.fixedToCamera = true

    this.levelTitle = game.add.sprite(150, 247, "titleCardLevels", index, groups.ui)
    this.levelTitle.fixedToCamera = true

    var startFrame = index * 8
    var frames = range(startFrame, startFrame + 7)

    this.border.animations.add("default", frames, 20, true)
    this.border.animations.play("default")

    this.showCard()

    // game.time.events.add(2000, this.hideCard, this)
  }

  showCard() {
    game.add.tween(this.rect).to({ alpha: 1 }, 500, "Linear", true)
    game.add.tween(this.border.cameraOffset).to({ y: 0 }, 500, "Linear", true)
    game.add.tween(this.bg.cameraOffset).to({ y: 168 }, 500, "Linear", true)
    game.add.tween(this.levelTitle.cameraOffset).to({ y: 175 }, 500, "Linear", true)
  }

  hideCard() {
    var timeElapsed = 2000 - (game.time.now - this.time)
    // Don't hide card if game loads faster than 2 seconds
    if (timeElapsed > 2000) {
      this.runHideTweens()
    } else {
      game.time.events.add(timeElapsed, () => {
        this.runHideTweens()
      })
    }
  }

  runHideTweens() {
    this.black.alpha = 0

    game.add.tween(this.rect).to({ alpha: 0 }, 500, "Linear", true)
    game.add.tween(this.border.cameraOffset).to({ y: -240 }, 500, "Linear", true)
    game.add.tween(this.bg.cameraOffset).to({ y: 240 }, 500, "Linear", true)
    game.add.tween(this.levelTitle.cameraOffset).to({ y: 247 }, 500, "Linear", true)

    game.time.events.add(500, () => {
      player.iso.disableControls = false

      this.rect.destroy()
      this.border.destroy()
      this.bg.destroy()
      this.levelTitle.destroy()
    })
  }
}