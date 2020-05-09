class Crosshair{

  constructor(x,y,z){

    this.iso = game.add.isoSprite(x, y, z, 'crosshair', 0);
    this.iso.anchor.set(0.5);
    this.iso.visible = false;
  }
}
