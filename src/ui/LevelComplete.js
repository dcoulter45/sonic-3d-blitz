class LevelComplete {
  ringCount = 0
  redRings = 0

  constructor(nextLevel) {
    this.nextLevel = nextLevel

    player.stop()
    player.iso.disableControls = true

    var activeLevel = levels[game.save.data.level]

    this.timePoints = Math.max((activeLevel.timeBonus - game.time.elapsed) + 100, 0)
    this.ringPoints = (game.rings.count / 50) * 100

    this.createText()
    this.tweenText()
    this.playMusic()

    // game.time.events.add(5000, () => this.loadNextArea(nextLevel))
  }

  createText() {
    this.text = game.add.sprite(-100, 36, "levelCompleteText", 0, groups.ui)
    this.text.fixedToCamera = true

    // this.act = game.add.sprite(400, 59, "levelCompleteUi", 0, groups.ui)
    // this.act.fixedToCamera = true

    this.ringBonus = game.add.sprite(-116, 101, "levelCompleteUi", 4, groups.ui)
    this.ringBonus.fixedToCamera = true

    this.ringBonusBg = game.add.sprite(400, 101, "levelCompleteUi", 3, groups.ui)
    this.ringBonusBg.fixedToCamera = true

    this.timeBonus = game.add.sprite(-100, 123, "levelCompleteUi", 5, groups.ui)
    this.timeBonus.fixedToCamera = true

    this.timeBonusBg = game.add.sprite(400, 123, "levelCompleteUi", 3, groups.ui)
    this.timeBonusBg.fixedToCamera = true

    // this.redRing1 = game.add.sprite(400, 154, "overworldUi", 6, groups.ui)
    // this.redRing1.fixedToCamera = true

    // this.redRing2 = game.add.sprite(424, 154, "overworldUi", 6, groups.ui)
    // this.redRing2.fixedToCamera = true

    // this.redRing3 = game.add.sprite(448, 154, "overworldUi", 6, groups.ui)
    // this.redRing3.fixedToCamera = true

    this.sonicFace = game.add.sprite(400, 177, "levelCompleteSonic", 1, groups.ui)
    this.sonicFace.fixedToCamera = true 
  }

  tweenText() {
    game.add.tween(this.text.cameraOffset).to({ x: 145 }, 500, "Linear", true)
    // game.add.tween(this.act.cameraOffset).to({ x: 224 }, 500, "Linear", true)

    game.add.tween(this.ringBonus.cameraOffset).to({ x: 120 }, 500, "Linear", true, 500)
    game.add.tween(this.ringBonusBg.cameraOffset).to({ x: 224 }, 500, "Linear", true, 500)

    game.add.tween(this.timeBonus.cameraOffset).to({ x: 120 }, 500, "Linear", true, 1000)
    game.add.tween(this.timeBonusBg.cameraOffset).to({ x: 224 }, 500, "Linear", true, 1000)

    // game.add.tween(this.redRing1.cameraOffset).to({x: 116}, 500, "Linear", true, 1500)
    // game.add.tween(this.redRing2.cameraOffset).to({x: 140}, 500, "Linear", true, 1500)
    // game.add.tween(this.redRing3.cameraOffset).to({x: 164}, 500, "Linear", true, 1500)

    game.add.tween(this.sonicFace.cameraOffset).to({ x: 156 }, 500, "Linear", true, 1500)
    
    game.time.events.add(2000, () => {
      this.countRingBonus()

      // if (game.rings.redRing) this.addRedRing()
    }, this)
  }

  addRedRing() {
    this.redRings += 1
    this["redRing" + this.redRings].loadTexture("overworldUi", 7)
  }

  countRingBonus() {
    this.ringBonusNumber = new NumberUi(250, 104)
    this.timeBonusNumber = new NumberUi(250, 126)

    this.counting = true
    this.playScoreAdd()

    this.ringBonusNumber.updateTo(this.ringPoints, () => {
      // if (this.ringPoints >= 100) this.addRedRing()
      
      this.countTimeBonus()
    })
  }

  countTimeBonus() {
    this.timeBonusNumber.updateTo(this.timePoints, () => {
      // if (this.timePoints >= 100) this.addRedRing()

      this.updateSonicFace()
    })
  }

  playScoreAdd() {
    Sounds.ScoreAdd.play()

    if (this.counting) {
      game.time.events.add(50, this.playScoreAdd, this)
    }
  }

  updateSonicFace() {
    this.counting = false

    var totalPoints = this.timePoints + this.ringPoints

    Sounds.ScoreTotal.play()

    if (totalPoints < 100) {
      this.sonicFace.loadTexture("levelCompleteSonic", 0)
    }
    else if (totalPoints > 200) {
      this.sonicFace.loadTexture("levelCompleteSonic", 2)
    }

    this.loadOverWorld()
  }

  playMusic() {
    if (game.track) game.track.stop()
    if (game.timeCounter) game.timeCounter.stop()

    var music = game.add.audio("LevelComplete")
    music.play()
  }

  loadOverWorld() {
    game.time.events.add(1000, () => {
      game.camera.fade("#000000", 1000)
  
      game.time.events.add(1000, () => {
        if (game.save.data.level === 6) {
          game.state.start("EndingState")
        } else {
          game.state.start("OverworldState")
        }
      }, this)
    })
  }
}