Spikes = class Spikes{

  constructor(wx, wy, x, y, z, obj) {

    if (obj.type === "Flat") {
      this.createFlatSpike(wx, wy, x, y, z, obj)
    } else {
      this.createTallSpike(wx, wy, x, y, z, obj)
    }
  }

  createTallSpike(wx, wy, x, y, z, obj) {
    this.base = game.add.isoSprite(x, y, z, "spikesBase", 0, groups.objects);
    this.spike = game.add.isoSprite(x, y , z + 5, "spikes", 4, groups.objects);
    this.iso = game.add.isoSprite(x, y, z + 5, null, 0, groups.objects);

    this.base.anchor.set(0.5)

    this.spike.anchor.set(0.5)
    this.spike.animations.add("down", [3,2,1,0], 20, false);
    this.spike.animations.add("ready", [1], 20, false);
    this.spike.animations.add("up", [2,3,4], 20, false);
    this.spike.pivot.y = 34

    game.physics.isoArcade.enable(this.iso);
    
    this.iso.anchor.set(0.5);
    this.iso.body.allowGravity = false;
    this.iso.body.widthX = 14
    this.iso.body.widthY = 14
    this.iso.body.height = 80
    this.iso.harmful = true

    groups.overlap.push(this.iso)

    var initialState = getProp("initialState", obj, null)

    if (initialState === "up") {
      this.goUp();
    } else if (initialState === "down") {
      this.goDown();
    }
  }

  createFlatSpike(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y , z, "tiles", 36, groups.objects)
    game.physics.isoArcade.enable(this.iso);

    this.iso.key = "spikes"
    this.iso.anchor.set(0.5)
    this.iso.body.allowGravity = false
    this.iso.harmful = true
    this.iso.body.height = 16

    groups.overlap.push(this.iso)
  }

  goDown(){
    this.state = 'down';
    this.spike.animations.play('down')
    this.iso.harmful = false;

    game.time.events.add(1000, () => {
      this.goReady()
    })
  }

  goReady(){
    this.state = 'ready';
    this.spike.animations.play('ready')

    game.time.events.add(1000, () => {
      this.goUp()
    })
  }

  goUp(){
    this.state = 'up';
    this.spike.animations.play('up')
    this.iso.harmful = true;

    game.time.events.add(1000, () => {
      this.goDown()
    })
  }
}
