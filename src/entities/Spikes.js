Spikes = class Spikes{

  constructor(wx, wy, x, y, z, obj) {

    this.spike = game.add.isoSprite(x + 10, y , z, "spikes", 0, groups.objects);
    this.base = game.add.isoSprite(x, y, z - 4, "spikesBase", 0, groups.objects);
    this.iso = game.add.isoSprite(x + 10, y, z, null, 0, groups.objects);

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

    this.tick = 0;
    this.iso.update = this.update.bind(this)

    if (obj.properties && obj.properties.initialState ) {

      if (obj.properties.initialState == 'up') {
        this.goUp();
      }
      else if (obj.properties.initialState == 'down') {
        this.goDown();
      }
    }
    else {
      this.goDown();
    }
  }

  update(){

    this.tick += 1;

    if(this.tick > 50 && this.state == 'down'){
      this.goReady();
    }
    else if(this.tick > 100 && this.state == 'ready'){
      this.tick = 0;
      this.goUp();
    }
    else if(this.tick > 100 && this.state == 'up'){
      this.tick = 0;
      this.goDown();
    }
  }

  goDown(){
    this.state = 'down';
    this.spike.animations.play('down')
    this.iso.harmful = false;
  }

  goReady(){
    this.state = 'ready';
    this.spike.animations.play('ready')
  }

  goUp(){
    this.state = 'up';
    this.spike.animations.play('up')
    this.iso.harmful = true;
  }
}
