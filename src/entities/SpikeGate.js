SpikeGate = class SpikeGate {

  state = "moving"
  topZ = 100
  bottomZ = 30  
  velocity = 40

  constructor(wx, wy, x, y, z, object) {
    this.topZ + z
    this.bottomZ + z

    const startZ = object.properties && object.properties.start === "top" ? this.topZ : this.bottomZ

    this.post1 = game.add.isoSprite(x + 12, y + 164, z + 22, 'spikeGate', 6, groups.objects)
    this.post2 = game.add.isoSprite(x + 12, y + 164, z + 86, 'spikeGate', 0, groups.objects)

    this.post3 = game.add.isoSprite(x + 12, y, z + 22, 'spikeGate', 11, groups.objects)
    this.post4 = game.add.isoSprite(x + 12, y, z + 86, 'spikeGate', 5, groups.objects)

    this.bar1 = game.add.isoSprite(x + 20, y + 132, startZ, "spikeGate", 1, groups.objects)
    this.bar2 = game.add.isoSprite(x + 20, y + 88, startZ, "spikeGate", 2, groups.objects)
    this.bar3 = game.add.isoSprite(x + 20, y + 44, startZ, "spikeGate", 3, groups.objects)
    this.bar4 = game.add.isoSprite(x + 20, y + 20, startZ, "spikeGate", 4, groups.objects)

    this.shadow = game.add.isoSprite(x + 18, y + 82, z - 4, "spikeGateShadow", 0, groups.objects)
    this.shadow.anchor.set(0.5)
    this.shadow.pivot.y = 8

    this.initPost(this.post1, "left", "bottom")
    this.initPost(this.post2, "left", "top")
    this.initPost(this.post3, "right", "bottom")
    this.initPost(this.post4, "right", "top")

    this.initBar(this.bar1, 1)
    this.initBar(this.bar2, 2)
    this.initBar(this.bar3, 3)
    this.initBar(this.bar4, 4)

    var delay = object.properties && object.properties.delay ? object.properties.delay : 0

    game.time.events.add(delay, () => {
      this.resetBars()
    })
  }

  initBar(bar, order) {
    game.physics.isoArcade.enable(bar);

    bar.anchor.set(0.5);
    bar.body.moves = false;
    bar.harmful = true;

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
    post.body.widthX = 18;
    post.body.widthY = 12;
    post.body.height = 64;
    post.pivot.x = -10;
    post.pivot.y = position2 === "bottom" ? 8 : 6

    groups.collide.push(post)
  }

  resetBars() {
    game.add.tween(this.bar1).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
    game.add.tween(this.bar2).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
    game.add.tween(this.bar3).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
    game.add.tween(this.bar4).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)

    game.time.events.add(1500, () => {
      this.lowerBars()
    })
  }

  lowerBars() {
    game.add.tween(this.bar1).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
    game.add.tween(this.bar2).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
    game.add.tween(this.bar3).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
    game.add.tween(this.bar4).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)

    game.time.events.add(1000, () => {
      this.resetBars()
    })
  }
}