class Splash{

  constructor(x, y, z, type){

    var frames = type === "water" ? range(0, 7) : range(8, 15)
    

    this.iso = game.add.isoSprite(x, y, z + 15, "splash", frames[0], groups.objects);
    this.iso.anchor.set(0.5);

    game.physics.isoArcade.enable(this.iso)
    this.iso.body.allowGravity = false

    this.iso.animations.add("default", frames, 12, false);
    this.iso.animations.play("default");

    game.time.events.add(500, () => this.iso.destroy()) 
  }
}
