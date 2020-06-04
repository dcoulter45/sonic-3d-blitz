GoalPost = class GoalPost {
  active = false

  constructor(wx, wy, x, y, z, obj) {
    this.direction = getProp("direction", obj, "up")
    this.nextLevel = getProp("nextLevel", obj, null)

    this.iso = game.add.isoSprite(x, y, z + 10, "goalPost", 8, groups.objects)

    enablePhysics(this.iso)
    groups.collide.push(this.iso)

    this.eggman = this.iso.animations.add("eggman", [9,3,4,5,6,3,7,8,9], 12, false)
    this.sonic = this.iso.animations.add("sonic", [3,4,5,6,3,0,1,2,3,4,5,6,3,0,1,2], 12, false)
    this.sonicSlow = this.iso.animations.add("sonic", [3,4,5,6,3,0,1], 6, false)

    this.eggman.onComplete.add(() => {
      this.sonic.play()
    })

    this.sonic.onComplete.add(() => {
      this.sonicSlow.play()
    })
    
    this.iso.body.widthX = 40
    this.iso.body.widthY = 40

    this.detection = game.add.isoSprite(x, y, z + 4, null)

    enablePhysics(this.detection)
    groups.overlap.push(this.detection)

    this.detection.body.widthX = wx
    this.detection.body.widthY = wy
    this.detection.body.height = 180
    this.detection.collide = this.collide.bind(this)
  }

  collide(obj) {
    if (obj.key === "player" && !this.active) {
      new LevelComplete()

      this.active = true
      
      this.eggman.play()

      obj.direction = this.direction.substring(0, 1)
      obj.direction2 = ""
      obj.disableControls = true

      obj.body.acceleration.x = 0
      obj.body.acceleration.y = 0

      stateParams.activeLevel = this.nextLevel

      setVelocity(player.iso, this.direction, 100)

      game.camera.follow(null)
    }
  }
}