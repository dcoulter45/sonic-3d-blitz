Prop = class Prop {

  constructor(wx, wy, x, y, z, obj) {
    if (obj.type === "Fence") {
      var isRotated = obj.width > obj.height

      this.iso = game.add.isoSprite(x, y, z, "tiles", isRotated ? 31 : 32, groups.objects);

      game.physics.isoArcade.enable(this.iso);

      this.iso.body.widthX = isRotated ? 35 : 16;
      this.iso.body.widthY = isRotated ? 16 : 35;
      this.iso.body.height = 22;
      this.iso.pivot.x = isRotated ? -34 : -15;
      this.iso.pivot.y = 20;
    }

    if (obj.type === "Tree") {
      this.iso = game.add.isoSprite(x, y, z + 18, "tree", null, groups.objects);

      game.physics.isoArcade.enable(this.iso);

      this.iso.pivot.y = 14;
      this.iso.body.widthX = 48;
      this.iso.body.widthY = 48;
      this.iso.body.height = 100;
    }

    if (obj.type === "Rock") {
      this.iso = game.add.isoSprite(x, y, z, "tiles", 23, groups.objects)

      game.physics.isoArcade.enable(this.iso);

      this.iso.pivot.y = 20;
      this.iso.body.widthX = 22;
      this.iso.body.widthY = 22;
    }

    if (obj.type === "Bush") {
      var isRotated = obj.width > obj.height

      this.iso = game.add.isoSprite(x, y, z, "tiles", isRotated ? 28 : 29, groups.objects);

      game.physics.isoArcade.enable(this.iso);

      this.iso.body.widthX = isRotated ? 35 : 16;
      this.iso.body.widthY = isRotated ? 16 : 35;
      this.iso.body.height = 22;
      this.iso.pivot.x = isRotated ? -10 : 10;
      this.iso.pivot.y = 20;
    }

    this.iso.key = "prop"
    this.iso.anchor.set(0.5);
    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;
    this.iso.body.collideWorldBounds = true;

    groups.collide.push(this.iso)
  }
}
