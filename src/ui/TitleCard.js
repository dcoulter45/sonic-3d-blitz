class TitleCard {
  constructor() {
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

    this.bg = game.add.sprite(0, 240, "titleCardBg", 0, groups.ui)
    this.bg.fixedToCamera = true

    this.border = game.add.sprite(0, -240, "titleCardBorder", 0, groups.ui)
    this.border.fixedToCamera = true

    this.levelTitle = game.add.sprite(150, 247, "titleCardLevels", 0, groups.ui)
    this.levelTitle.fixedToCamera = true

    this.act = game.add.sprite(400, 120, "act1", 0, groups.ui)
    this.act.fixedToCamera = true

    this.border.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7], 20, true)
    this.border.animations.play("default")

    this.showCard()

    game.time.events.add(2000, this.hideCard, this)
  }

  showCard() {
    game.add.tween(this.rect).to({ alpha: 1 }, 500, "Linear", true)
    game.add.tween(this.border.cameraOffset).to({ y: 0 }, 500, "Linear", true)
    game.add.tween(this.bg.cameraOffset).to({ y: 168 }, 500, "Linear", true)
    game.add.tween(this.levelTitle.cameraOffset).to({ y: 175 }, 500, "Linear", true)
    game.add.tween(this.act.cameraOffset).to({ x: 340 }, 500, "Linear", true)
  }

  hideCard() {
    this.black.alpha = 0

    game.add.tween(this.rect).to({ alpha: 0 }, 500, "Linear", true)
    game.add.tween(this.border.cameraOffset).to({ y: -240 }, 500, "Linear", true)
    game.add.tween(this.bg.cameraOffset).to({ y: 240 }, 500, "Linear", true)
    game.add.tween(this.levelTitle.cameraOffset).to({ y: 247 }, 500, "Linear", true)
    game.add.tween(this.act.cameraOffset).to({ x: 400 }, 500, "Linear", true)
  }
}