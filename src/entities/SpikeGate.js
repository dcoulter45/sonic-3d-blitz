SpikeGate = class SpikeGate {

  topZ = 100
  bottomZ = 30  
  velocity = 40

  constructor(x, y, z, object) {
    this.topZ + z
    this.bottomZ + z

    const startZ = object.properties && object.properties.start === "top" ? this.topZ : this.bottomZ

    this.post1 = game.add.isoSprite(x + 12, y + 164, z + 15, 'spikeGate', 6, groups.objects)
    this.post2 = game.add.isoSprite(x + 12, y + 164, z + 79, 'spikeGate', 0, groups.objects)

    this.post3 = game.add.isoSprite(x + 12, y, z + 15, 'spikeGate', 11, groups.objects)
    this.post4 = game.add.isoSprite(x + 12, y, z + 79, 'spikeGate', 5, groups.objects)

    this.bar1 = game.add.isoSprite(x + 20, y + 132, startZ, "spikeGate", 1, groups.objects)
    this.bar2 = game.add.isoSprite(x + 20, y + 88, startZ, "spikeGate", 2, groups.objects)
    this.bar3 = game.add.isoSprite(x + 20, y + 44, startZ, "spikeGate", 3, groups.objects)
    this.bar4 = game.add.isoSprite(x + 20, y + 20, startZ, "spikeGate", 4, groups.objects)

    this.shadow = game.add.isoSprite(x + 18, y + 82, z - 5, "spikeGateShadow", 0, groups.objects)
    this.shadow.anchor.set(0.5)

    if (object.properties && object.properties.moving) {
      this.bar1.update = this.update.bind(this)
    } else {
      this.velocity = 0
    }

    this.initPost(this.post1, "left", "bottom")
    this.initPost(this.post2, "left", "top")
    this.initPost(this.post3, "right", "bottom")
    this.initPost(this.post4, "right", "top")

    this.initBar(this.bar1, 1)
    this.initBar(this.bar2, 2)
    this.initBar(this.bar3, 3)
    this.initBar(this.bar4, 4)
  }

  initBar(bar, order) {
    game.physics.isoArcade.enable(bar);

    bar.anchor.set(0.5);
    bar.body.immovable = true;
    bar.body.allowGravity = false;
    bar.harmful = true;

    bar.body.velocity.z = this.velocity;
    bar.body.widthX = 18;
    bar.body.widthY = 44;
    bar.body.height = 30;

    bar.pivot.x = 5;
    bar.pivot.y = -4;

    if (order === 4) {
      bar.body.widthY = 28;
      bar.pivot.x = 8;
      bar.pivot.y = 5;
    }
  }

  initPost(post, position1, position2) {
    game.physics.isoArcade.enable(post);

    post.anchor.set(0.5);
    post.body.immovable = true;
    post.body.allowGravity = false;
    post.collidable = true;
    post.body.widthX = 18;
    post.body.widthY = 12;
    post.body.height = 64;
    post.pivot.x = -10;
    post.pivot.y = position2 === "bottom" ? 8 : 6
  }

  update() {
    if (this.bar1.body.velocity.z > 0 && this.bar1.body.position.z > (this.topZ - 20)) {
      this.bar1.body.velocity.z = this.velocity * -1;
      this.bar2.body.velocity.z = this.velocity * -1;
      this.bar3.body.velocity.z = this.velocity * -1;
      this.bar4.body.velocity.z = this.velocity * -1;
    }

    if (this.bar1.body.velocity.z < 0 && this.bar1.body.position.z < (this.bottomZ - 20)) {
      this.bar1.body.velocity.z = this.velocity;
      this.bar2.body.velocity.z = this.velocity;
      this.bar3.body.velocity.z = this.velocity;
      this.bar4.body.velocity.z = this.velocity;
    }
  }
}