class PlayerOverworld {
  moving = false

  constructor(x, y) {
    this.sprite = game.add.sprite(x + 8, y, "sonicOverworld", 0, groups.objects)

    this.sprite.animations.add("default", [0,1,2,1], 6, true)
    this.sprite.animations.play("default")
    this.sprite.update = this.update.bind(this)

    game.camera.follow(this.sprite)

    this.cursors = game.input.keyboard.createCursorKeys()

    this.actText = game.add.sprite(335, 216, "overworldUi", activeMarker.act - 1, groups.ui)
    this.actText.fixedToCamera = true

    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.selectMarker, this)
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.selectMarker, this)
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.selectMarker, this)
  }

  update () {
    if (!this.moving) {
      var markerIndex = markers.indexOf(activeMarker)

      var nextMarker = markers[markerIndex + 1]
      var nextMarkerPosition = this.getMarkerPosition(nextMarker)

      var lastMarker = markers[markerIndex - 1]
      var lastMarkerPosition = this.getMarkerPosition(lastMarker)
      
      if (nextMarker && this.cursors[nextMarkerPosition].isDown) {
        this.moveToMarker(nextMarker)
      } 
      else if (lastMarker && this.cursors[lastMarkerPosition].isDown) {
        this.moveToMarker(lastMarker)
      }
    }
  }

  selectMarker() {
    if (!this.moving) {
      game.camera.fade("#000000", 500)
      stateParams.activeLevel = activeMarker.area + "-Act" + activeMarker.act

      game.time.events.add(500, () => {
        game.state.start("GameState") 
      })
    }
  }

  getMarkerPosition(marker) {
    if (!marker) return ""
    if (marker.position.x > activeMarker.position.x) return "right"
    if (marker.position.x < activeMarker.position.x) return "left"
    if (marker.position.y > activeMarker.position.y) return "down"
    if (marker.position.y < activeMarker.position.y) return "up"
  }

  moveToMarker(marker) {
    this.moving = true
    activeMarker = marker

    var tween = game.add.tween(this.sprite.position).to({
      x: marker.position.x + 8,
      y: marker.position.y
    }, 800, "Linear", false)

    var textTween = game.add.tween(this.actText.cameraOffset).to({x: 400}, 300, "Linear", false)

    textTween.onComplete.add(() => {
      this.actText.loadTexture("overworldUi", activeMarker.act - 1)
      game.add.tween(this.actText.cameraOffset).to({x: 335}, 300, "Linear", true, 200)
    })
    
    tween.onComplete.add(() => {
      this.moving = false
    })

    textTween.start()
    tween.start()
  }
}