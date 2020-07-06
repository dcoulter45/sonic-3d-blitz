SpikeGate = class SpikeGate extends RenderInView {

  topZ = 130
  bottomZ = 70

  bars = []
  posts = []

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.topZ + z
    this.bottomZ + z
    this.axis = wx > wy ? "y" : "x"

    var delay = getProp("delay", obj, 0)

    game.time.events.add(delay, () => {
      this.resetBars()
    })
  }

  render() {
    var { x, y, z, obj } = this.props

    const startZ = getProp("start", obj, "top") === "top" ? this.topZ : this.bottomZ

    if (this.axis === "y") {
      this.post1 = game.add.isoSprite(x + 164, y + 12, z + 22, 'spikeGate', 23, groups.objects)
      this.post2 = game.add.isoSprite(x + 164, y + 12, z + 84, 'spikeGate', 17, groups.objects)
  
      this.post3 = game.add.isoSprite(x, y + 12, z + 22, 'spikeGate', 18, groups.objects)
      this.post4 = game.add.isoSprite(x, y + 12, z + 84, 'spikeGate', 12, groups.objects)
  
      this.bar1 = game.add.isoSprite(x + 132, y + 20, startZ, "spikeGate", 16, groups.objects)
      this.bar2 = game.add.isoSprite(x + 88, y + 20, startZ, "spikeGate", 15, groups.objects)
      this.bar3 = game.add.isoSprite(x + 44, y + 20, startZ, "spikeGate", 14, groups.objects)
      this.bar4 = game.add.isoSprite(x + 20, y + 20, startZ, "spikeGate", 13, groups.objects)
  
      this.shadow = game.add.isoSprite(x + 85, y + 16, z, "spikeGateShadow", 0, groups.objects)
      this.shadow.anchor.set(0.5)
      this.shadow.scale.x *= -1
    }
    else {
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

  hide() {
    this.posts.forEach((post) => {
      post.destroy()
    })

    this.bars.forEach((bar) => {
      removeFromGroup(groups.overlap, bar)
      bar.destroy()
    })
  }

  initBar(bar, order) {
    this.bars.push(bar)

    enablePhysics(bar)
    groups.overlap.push(bar)
    
    bar.body.moves = false
    bar.harmful = true

    if (this.axis === "y") {
      bar.body.widthX = 44;
      bar.body.widthY = 18;
      
      if (order === 4) {
        bar.pivot.x = -10
        bar.pivot.y = 8
      } else {
        bar.pivot.x = -6
        bar.pivot.y = 0
      }
    }
    else {
      bar.body.widthX = 18;
      bar.body.widthY = 44;
      bar.pivot.x = 5;
      bar.pivot.y = -4;

      if (order === 4) {
        // bar.body.widthY = 28;
        bar.pivot.x = 8;
        bar.pivot.y = 5;
      }
    }

    bar.body.height = 26;
  }

  initPost(post, position1, position2) {
    this.posts.push(post)

    enablePhysics(post)

    if (this.axis === "y") {
      post.body.widthX = 20;
      post.body.widthY = 26;
      post.pivot.x = 8
      post.pivot.y = 4
    }
    else {
      post.body.widthX = 18;
      post.body.widthY = 12;
      post.pivot.x = -10;
    }

    post.body.height = 64;

    groups.collide.push(post)
  }

  resetBars() {
    if (this.visible) {
      game.add.tween(this.bar1).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
      game.add.tween(this.bar2).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
      game.add.tween(this.bar3).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
      game.add.tween(this.bar4).to({ isoZ: this.topZ }, 1500, Phaser.Easing.Linear.None, true)
    }

    game.time.events.add(1500, () => {
      this.lowerBars()
    })
  }

  lowerBars() {
    if (this.visible) {
      game.add.tween(this.bar1).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
      game.add.tween(this.bar2).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
      game.add.tween(this.bar3).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
      game.add.tween(this.bar4).to({ isoZ: this.bottomZ }, 500, Phaser.Easing.Linear.None, true)
    }

    game.time.events.add(1000, () => {
      this.resetBars()
    })
  }
}