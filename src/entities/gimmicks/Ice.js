Ice = class Ice extends RenderInView {

  iceBlocks = []
  height = 44
  baseZ = 0

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.baseZ = z + 9
    this.stacks = getProp("stacks", obj, 1)
  }

  render() {
    var { wx, wy, x, y, z, obj } = this.props

    for (var i = 0; i < this.stacks; i++) {
      this.createIceBlock(i, x, y, z)
    }
  }

  createIceBlock(i, x, y, z) {
    var zz = (i * this.height) + this.baseZ
    var iceBlock = game.add.isoSprite(x, y, zz, "ice", 0, groups.objects)

    enablePhysics(iceBlock)
    groups.overlap.push(iceBlock)

    iceBlock.key = "ice"
    iceBlock.body.widthX = TILE_WIDTH
    iceBlock.body.widthY = TILE_WIDTH
    iceBlock.body.height = this.height

    iceBlock.collide = (obj) => this.collide(iceBlock, obj)
    this.iceBlocks.push(iceBlock)
  }

  hide() {
    this.iceBlocks.forEach((iceBlock) => {
      removeFromGroup(groups.overlap, iceBlock)
      iceBlock.destroy()
    })
  }

  collide(iceBlock, obj) {
    if (obj.key === "player") {
      var velocityCache = { ...obj.body.velocity }

      game.physics.isoArcade.collide(obj, iceBlock)

      var { up, down, frontY, frontX, backX, backY } = iceBlock.body.touching

      if (up && player.onFloor()) {
        player.die("squashed")
      }
      else if (
        (["jump", "doubleJump", "slam"].includes(obj.movement) && down)
        ||
        (obj.movement === "roll" && (frontY || frontX || backX || backY))
        ||
        (player.shield && player.shield.type === "Flame")
      ) {
        // Don't smash ice with bubble shield
        if (player.shield && player.shield.type === "Bubble" && obj.movement === "jump") {
          Sounds.BubbleBounce.play()
          obj.movement = "normal"
          player.touchingFloor = true
        }
        else {
          this.destroyIceBlock(iceBlock)
          obj.body.velocity = velocityCache
        }
      } else if (down) {
        player.touchingFloor = true
      }
    }
  }

  destroyIceBlock(iceBlock) {
    this.createFragments(iceBlock)
    iceBlock.destroy()
    Sounds.WindowShatter.play()

    var { z } = iceBlock.body.position

    removeFromGroup(this.iceBlocks, iceBlock)

    this.iceBlocks.forEach((iceBlock) => {
      if (iceBlock.body.z > z) {
        game.time.events.add(400, () => {
          var zz = iceBlock.body.z - this.height + 2.5

          moveToXYZ(iceBlock, { z: zz }, 400)
        }, this)
      }
    })
  }

  createFragments(iceBlock) {
    var { x, y, z } = iceBlock.body.position

    z = z - 10

    for (var i = 0; i < 6; i++) {

      var velocity = {
        x: randomInteger(-50, 50),
        y: randomInteger(-50, 50),
        z: randomInteger(250, 350)
      }

      var fragment = game.add.isoSprite(x, y, z, "iceFragment", 0, groups.objects)

      fragment.animations.add("default", range(0, 7), 12, true)
      fragment.animations.play("default")

      game.physics.isoArcade.enable(fragment)

      fragment.anchor.set(0.5)

      fragment.body.widthX = 15
      fragment.body.widthY = 15
      fragment.body.height = 15
      fragment.body.velocity = velocity

      fragment.update = function () {
        if (this.body.position.z <= z) {
          this.destroy()
        }
      }
    }
  }
}