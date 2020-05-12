Spikeball = class Spikeball{

  constructor(wx, wy, x, y, z) {

    this.startX = x+11;
    this.startY = y+9;

    this.endX = (obj.properties && obj.properties.directionX) ? this.startX+(obj.properties.directionX*44) : 0;
		this.endY = (obj.properties && obj.properties.directionY) ? this.startY+(obj.properties.directionY*44) : 0;

		this.iso = game.add.isoSprite(this.startX, this.startY, z+10, 'spikeball', 0, groups.objects);

		game.physics.isoArcade.enable(this.iso);

    new Shadow(this.iso,'18');

    this.iso.animations.add('default',[0,1,2,3,4,5],20,true);
    this.iso.animations.play('default');

		this.iso.anchor.set(0.5);

		this.iso.body.immovable = true;
		this.iso.body.collideWorldBounds = true;
		this.iso.body.allowGravity = false;
    this.iso.update = this.update.bind(this)

    this.iso.harmful = true;

    this.directionX = "left";
    this.directionY = "down";
  }

  update(){

    // After reaching a certain, swap direction
    if(this.endX !== 0){
      if(this.directionX == "left" && this.iso.body.position.x > this.endX){
        this.directionX = "right";
      }
      else if(this.directionX == "right" && this.iso.body.position.x < this.startX){
        this.directionX = "left";
      }

      // Set velocity
      if(this.directionX == "left"){
        this.iso.body.velocity.x = 50;
      }
      else if(this.directionX == "right"){
        this.iso.body.velocity.x = -50;
      }
    }

    if(this.endY !== 0){

      // After reaching a certain, swap direction
      if(this.directionY == "up" && this.iso.body.position.y < this.startY){
        this.directionY = "down";
      }
      else if(this.directionY == "down" && this.iso.body.position.y > this.endY){
        this.directionY = "up";
      }

      // Set velocity
      if(this.directionY == "up"){
        this.iso.body.velocity.y = -50;
      }
      else if(this.directionY == "down"){
        this.iso.body.velocity.y = 50;
      }
    }
  }
}
