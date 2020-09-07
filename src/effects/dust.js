class Dust {

  constructor(x, y, z) {
    this.iso = game.add.isoSprite(x, y, z, "dust", 0, groups.objects);
    this.iso.anchor.set(0.5);

    this.iso.animations.add("default", [4, 3, 2, 1, 0], 16, true);
    this.iso.animations.play("default");

    game.time.events.add(250, () => {
      this.iso.destroy();
    }, this)
  }
}
