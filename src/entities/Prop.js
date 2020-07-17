Prop = class Prop extends RenderInView{

  render() {
    var { wx, wy, x, y, z, obj } = this.props

    if (obj.type === "Fence") {
      var isRotated = obj.width > obj.height

      this.iso = game.add.isoSprite(x, y, z, "tiles", isRotated ? 34 : 35, groups.objects);

      game.physics.isoArcade.enable(this.iso);

      this.iso.body.widthX = isRotated ? 35 : 16;
      this.iso.body.widthY = isRotated ? 16 : 35;
      this.iso.body.height = 22;
      this.iso.pivot.x = isRotated ? -8 : 8;
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

    if (obj.type === "Bush") {
      var isRotated = obj.width > obj.height

      this.iso = game.add.isoSprite(x, y, z, "tiles", isRotated ? 32 : 33, groups.objects);

      game.physics.isoArcade.enable(this.iso);

      this.iso.body.widthX = isRotated ? 35 : 16;
      this.iso.body.widthY = isRotated ? 16 : 35;
      this.iso.body.height = 22;
      this.iso.pivot.x = isRotated ? -10 : 10;
      this.iso.pivot.y = 20;
    }

    if (obj.type === "PalmTree") {
      this.iso = game.add.isoSprite(x, y, z + 30, "palmTree", 0, groups.objects)

      game.physics.isoArcade.enable(this.iso)

      this.iso.body.widthX = 28
      this.iso.body.widthY = 28
      this.iso.pivot.y = 30
    }

    if (obj.type === "PineTree") {
      this.iso = game.add.isoSprite(x, y, z + 48, "pineTree", 0, groups.objects)

      game.physics.isoArcade.enable(this.iso)

      this.iso.body.widthX = 66
      this.iso.body.widthY = 66
      this.iso.pivot.y = -6
    }

    if (obj.type === "Crystal") {
      this.iso = game.add.isoSprite(x, y, z + 18, "crystal", 0, groups.objects);

      game.physics.isoArcade.enable(this.iso);

      this.iso.body.widthX = 44;
      this.iso.body.widthY = 44;
      this.iso.body.height = 80;
    }

    if (obj.type === "Pumpkin") {
      this.iso = game.add.isoSprite(x + 4, y + 4, z, "tiles", 151, groups.objects)

      game.physics.isoArcade.enable(this.iso);

      this.iso.pivot.y = 10
      this.iso.body.widthX = 36
      this.iso.body.widthY = 36
      this.iso.body.height = 20
    }

    if (obj.type === "Grave") {
      this.iso = game.add.isoSprite(x + 4, y + 4, z, "tiles", 152, groups.objects)

      game.physics.isoArcade.enable(this.iso);

      this.iso.pivot.y = 10
      this.iso.body.widthX = 36
      this.iso.body.widthY = 36
      this.iso.body.height = 40
    }

    this.iso.key = "prop"
    this.iso.anchor.set(0.5);
    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;

    groups.collide.push(this.iso)
  }

  hide() {
    this.iso.destroy()

    removeFromGroup(groups.collide, this.iso)
  }
}
