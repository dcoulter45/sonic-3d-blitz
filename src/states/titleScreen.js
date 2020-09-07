var BADGE_START_Y = -160
var BADGE_END_Y = 41

var TITLE_START_Y = BADGE_START_Y + 70
var TITLE_END_Y = BADGE_END_Y + 70

class TitleState extends Phaser.State {
  badge = null
  sonic = null
  title = null
  button = "continue"
  track = null

  preload() {
    game.load.image("background", "assets/title-screen/background.png")
    game.load.image("badge", "assets/title-screen/badge.png")
    game.load.image("badgeTitle", "assets/title-screen/badge-title.png")
    game.load.image("cursor", "assets/title-screen/cursor.png")
    game.load.spritesheet("sonicTitle", "assets/title-screen/sonic-title.png", 160, 105)
    game.load.spritesheet("text", "assets/title-screen/title-screen-text.png", 67, 7)
    game.load.audio("titleScreen", ["assets/music/TitleScreen.ogg", "assets/music/TitleScreen.m4a"])
  }

  create() {
    game.canvas.id = "game-window";
    
    this.track = game.add.audio("titleScreen")
    this.track.play()

    game.add.sprite(0, 0, "background")
    
    this.badge = game.add.sprite(63, BADGE_START_Y, "badge")
    this.cursor = game.add.sprite(150, 200, "cursor")
    this.sonic = game.add.sprite(124, 15, "sonicTitle", 23)
    this.title = game.add.sprite(133, TITLE_START_Y, "badgeTitle")
    this.continue = game.add.sprite(170, 200, "text", 1)
    this.newGame = game.add.sprite(170, 220, "text", 2)

    this.sonic.animations.add("rise", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 12, false)
    this.sonic.animations.add("shake", [18, 19, 20, 21, 22], 10, true)

    this.dropBadge()

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.toggle, this)
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.toggle, this)
    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.start, this)
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.start, this)
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.start, this)
  }

  dropBadge() {
    var tween = game.add.tween(this.badge).to({ y: BADGE_END_Y }, 2000, "Linear", true);
                game.add.tween(this.title).to({ y: TITLE_END_Y }, 2000, "Linear", true);

    tween.onComplete.add(this.showSonic, this)
  }

  showSonic() {
    var anim = this.sonic.animations.play("rise")

    anim.onComplete.add(() => {
      this.sonic.animations.play("shake")
    })
  }

  toggle() {
    if (this.button === "continue") {
      this.button = "newGame"
      this.continue.loadTexture("text", 0)
      this.newGame.loadTexture("text", 3)
      this.cursor.position.y = 220
    } else {
      this.button = "continue"
      this.continue.loadTexture("text", 1)
      this.newGame.loadTexture("text", 2)
      this.cursor.position.y = 200
    }
  }

  start() {
    game.camera.fade("rgba(0,0,0,1)", 1000);

    if (this.button === "newGame") {
      game.save.data.lives = 3
      game.save.data.level = 0
      game.save.store()
    }

    game.time.events.add(1500, () => {
      this.track.stop()
      this.state.start("GameState")
    }, this)
  }
}