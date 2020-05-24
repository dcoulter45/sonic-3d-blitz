Lava = class Lava{
  constructor(wx, wy, x, y, z){
    this.iso = game.add.isoSprite(x, y, z, null, 0, groups.walls);

    this.iso.anchor.set(0.5);
    game.physics.isoArcade.enable(this.iso);

    this.iso.key = "lava";
    this.iso.body.widthX = wx;
    this.iso.body.widthY = wy;
    this.iso.body.height = 1;

    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;

    this.iso.collide = this.collide.bind(this)

    var tiles = (wx / TILE_WIDTH) * (wy / TILE_WIDTH);
    var bubbles = Math.ceil(tiles / 12)

    for (var i = 0; i < bubbles; i++) {
      this.createBubble(wx, wy, x, y, z)
    }
  }

  createBubble(wx, wy, x, y, z) {
    var x1 = randomInteger(x, (x + wx - 30))
    var y1 = randomInteger(y, (y + wy - 30))
    var delay = randomInteger(1000, 2000)

    new LavaBubble(x1, y1, z)

    game.time.events.add(delay, () => {
      this.createBubble(wx, wy, x, y, z)
    })
  }

  collide(obj) {
    if (obj.key === "player" && obj.movement !== "burning") {
      player.die("burning")
    }
  }
}

class LavaBubble {
  constructor(x, y, z) {
    var bubble = game.add.isoSprite(x, y, z, "lavaBubble", 0, groups.objects)

    bubble.anchor.set(0.5)

    bubble.animations.add("default", range(0, 8), 8, false)
    var anim = bubble.animations.play("default")

    anim.onComplete.add(() => {
      bubble.destroy()
    })
  }
}