Door = class Door {
  
  state = "idle"
  y = 0
  x = 0
  nextArea = ""

  constructor(wx, wy, x, y, z, obj) {
    this.x = x
    this.y = y
    this.nextArea = getProp("nextArea", obj, null)
    this.direction = getProp("direction", obj, "up")

    this.door = game.add.isoSprite(x, y, z + 5, null, 0, groups.objects);
   
    game.physics.isoArcade.enable(this.door);

    this.door.key = "door"
    this.door.anchor.set(0.5)
    this.door.body.widthY = wy
    this.door.body.widthX = wx
    this.door.body.height = 124
    this.door.body.allowGravity = false
    this.door.body.immovable = true

    this.door.collide = this.collide.bind(this)
  
    groups.overlap.push(this.door)
  }

  collide(obj) {
    if (this.state === "idle" && obj.key === "player") {
      this.state = "active"

      obj.direction = this.direction.substring(0, 1)
      obj.direction2 = ""
      obj.disableControls = true

      obj.body.acceleration.x = 0
      obj.body.acceleration.y = 0

      setVelocity(player.iso, this.direction, 100)

      game.camera.follow(null)

      // game.add.tween(obj.body.position).to({ 
      //   y: this.y + 34,
      //   x: this.x + 5,
      // }, 1000, Phaser.Easing.Linear.None, true)

      game.camera.fade("#000000", 1000)

      game.time.events.add(1000, () => {
        obj.body.velocity.x = 0
        obj.body.velocity.y = 0

        stateParams.activeLevel = this.nextArea
        stateParams.displayTitle = false

        game.state.restart()
      })
    }
  }
}