class TutorialPopup {
  keys = {}
  tutPart = 1

  constructor() {

    this.bg = game.add.graphics(0, 0, groups.ui)
    this.bg.beginFill(0x131313);
    this.bg.drawRect(0, 0, 400, 85)
    this.bg.endFill()
    this.bg.alpha = 0.5
    this.bg.fixedToCamera = true

    this.keys.right = game.add.sprite(254, 40, "tutorialKeys", 4, groups.ui)
    this.keys.up = game.add.sprite(214, 40, "tutorialKeys", 2, groups.ui)
    this.keys.down = game.add.sprite(234, 51, "tutorialKeys", 7, groups.ui)
    this.keys.left = game.add.sprite(214, 61, "tutorialKeys", 0, groups.ui)
    this.keys.a = game.add.sprite(114, 46, "tutorialKeys",  8, groups.ui)
    this.keys.s = game.add.sprite(135, 56, "tutorialKeys",  10, groups.ui)

    this.keys.right.animations.add("press", [4, 5], 2, true)
    this.keys.left.animations.add("press", [1, 0], 2, true)
    this.keys.a.animations.add("press", [8, 9], 2, true)
    this.keys.s.animations.add("press", [10, 11], 2, true)

    this.keys.left.fixedToCamera = true
    this.keys.up.fixedToCamera = true
    this.keys.right.fixedToCamera = true
    this.keys.down.fixedToCamera = true
    this.keys.a.fixedToCamera = true
    this.keys.s.fixedToCamera = true


    this.cursors = game.input.keyboard.createCursorKeys();

    this.tutPart1()
  }

  tutPart1() {
    var text = new Font(82, 5, "Hold down to run")

    var cursorDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    cursorDown.onDown.add(() => {
      if (this.tutPart === 1) {
        this.tutPart = 2

        game.time.events.add(1000, () => {
          text.destroy()
          this.tutPart2()
        }, this)
      }
    })
  }

  tutPart2() {
    var text = new Font(20, 5, "Press Left and Right to side step")
    var rightPressed = false
    var leftPressed = false

    var cursorLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    var cursorRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    var nextStep = () => {
      if (rightPressed && leftPressed && this.tutPart === 2) {
        this.tutPart = 3

        game.time.events.add(1000, () => {
          text.destroy()
          this.keys.right.animations.stop()
          this.keys.left.animations.stop()
          this.tutPart3()
        }, this)
      }
    }

    cursorLeft.onDown.add(() => {
      leftPressed = true
      nextStep()
    })

    cursorRight.onDown.add(() => {
      rightPressed = true
      nextStep()
    })

    this.keys.right.animations.play("press")
    this.keys.left.animations.play("press")
  }

  tutPart3() {
    var text = new Font(110, 5, "Press A to Jump")
    var cursorA = game.input.keyboard.addKey(Phaser.Keyboard.A);

    this.keys.a.animations.play("press")

    cursorA.onDown.add(() => {
      if (this.tutPart === 3) {
        this.tutPart = 4

        game.time.events.add(1000, () => {
          this.tutPart4()
          this.keys.a.animations.stop()
          text.destroy()
        }, this)
      }
    })
  }

  tutPart4() {
    var text = new Font(110, 5, "Press S to Roll")
    var cursorS = game.input.keyboard.addKey(Phaser.Keyboard.S);

    this.keys.s.animations.play("press")


    cursorS.onDown.add(() => {
      if (this.tutPart === 4) {
        this.tutPart = 0
        
        game.time.events.add(1000, () => {
          text.destroy()
          this.keys.s.animations.stop()

          this.destroy()
        }, this)
      }
    })
  }

  destroy() {
    for (var key in this.keys) {
      this.keys[key].destroy()
    }

    this.bg.destroy()
  }
}