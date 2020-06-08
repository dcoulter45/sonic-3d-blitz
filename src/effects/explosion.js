
Explosion = class Explosion{

  constructor(x, y, z, size = "small"){

    if (size === "large") {
      this.iso = game.add.isoSprite(x, y, z, "explosionLarge", 0, groups.objects);
      var anim = this.iso.animations.add("default", [0,1,2,3,4,5,6,7,8,9], 12, false);
    }
    else {
      this.iso = game.add.isoSprite(x, y, z, "explosion", 0, groups.objects);
      var anim = this.iso.animations.add("default",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 20, false);
    }

    this.iso.anchor.set(0.5);

    this.iso.animations.play("default");

    anim.onComplete.add(() => {
      this.iso.destroy();
    })
  }
}
