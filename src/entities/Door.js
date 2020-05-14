Door = class Door {
  
  state = "idle"
  y = 0
  x = 0
  nextArea = ""

  constructor(wx, wy, x, y, z, obj) {
    this.x = x
    this.y = y
    this.nextArea = obj.properties.nextArea

    this.door = game.add.isoSprite(x, y, z + 5, null, 0, groups.objects);
   
    game.physics.isoArcade.enable(this.door);

    this.door.key = "door"
    this.door.anchor.set(0.5)
    this.door.body.widthY = wy
    this.door.body.widthX = wx
    this.door.body.height = 124
    this.door.body.allowGravity = false
    this.door.body.immovable = true

    this.door.collidable = false
    this.door.collide = this.collide.bind(this)
  }

  collide(obj) {
    if (this.state === "idle" && obj.key === "player") {
      this.state = "active"
      obj.direction = "u"
      obj.direction2 = ""
      obj.disableControls = true
      obj.body.velocity.x = -50
      obj.body.velocity.y = 0
      obj.body.acceleration.x = 0
      obj.body.acceleration.y = 0
      game.camera.follow(null)

      game.add.tween(obj).to({ 
        isoY: this.y + 34,
        isoX: this.x + 5,
      }, 1000, Phaser.Easing.Linear.None, true)

      game.time.events.add(1000, () => {
        obj.body.velocity.x = 0

        activeLevel = this.nextArea

        game.state.restart()
      })
    }
  }
}