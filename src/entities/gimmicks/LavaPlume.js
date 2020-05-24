LavaPlume = class LavaPlume {
  active = false

  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z + 20, "lavaPlume", 0, groups.objects);
    
    game.physics.isoArcade.enable(this.iso);

    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;

    this.iso.body.widthX = TILE_WIDTH
    this.iso.body.widthY = TILE_WIDTH

    this.anim = {
      bubble: this.iso.animations.add("bubble", [0,1], 4, true),
      plume: this.iso.animations.add("plume", [2,3,4,5,6,7], 8, false),
      hang: this.iso.animations.add("hang", [8,9], 8, true),
      fall: this.iso.animations.add("fall", [10,11,12,13,14,15,16,17], 8, false),
    }

    this.anim.plume.onComplete.add(this.hang, this)
    this.anim.fall.onComplete.add(() => this.iso.visible = false)

    this.iso.anchor.set(0.5);

    groups.overlap.push(this.iso)

    this.iso.collide = this.collide.bind(this)

    this.iso.visible = false

    this.bubble()
  }

  bubble() {
    this.iso.animations.play("bubble")
    this.iso.visible = true

    game.time.events.add(1000, () => this.plume())
  }

  plume() {
    this.anim.plume.play()
  }

  hang() {
    this.iso.animations.play("hang")
    this.active = true
    game.time.events.add(1000, () => this.fall())
  }

  fall() {
    this.anim.fall.play()
    this.active = false
    game.time.events.add(1000, () => this.bubble())
  }

  collide(obj) {
    if (obj.key === "player" && this.active) {
      player.die("burning")
    }
  }
}