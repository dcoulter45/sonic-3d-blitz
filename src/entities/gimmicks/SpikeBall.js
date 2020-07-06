SpikeBall = class SpikeBall {
  constructor(wx, wy, x, y, z, obj) {
    this.direction = getProp("direction", obj, "down")
    this.distance = getProp("distance", obj, 2) * TILE_WIDTH
    
    if(this.direction == "left" || this.direction == "down"){
			this.startX = x + 10;
			this.startY = y;
			this.endX = this.startX + this.distance;
			this.endY = this.startY + this.distance;
		}
		else{
			this.endX = x + 10;
			this.endY = y;
			this.startX = this.endX - this.distance;
			this.startY = this.endY - this.distance;
    }
    
    this.iso = game.add.isoSprite(x, y, z + 8, "spikeball", 0, groups.objects)
  
    game.physics.isoArcade.enable(this.iso);
    groups.collide.push(this.iso)

    this.iso.anchor.set(0.5)
    this.iso.animations.add("default", range(0, 7), 8, true)
    this.iso.animations.play("default")
    
    this.iso.body.allowGravity = false
    this.iso.body.immovable = true
    this.iso.harmful = true

		this.iso.update = this.update.bind(this);
		
		this.shadow = game.add.isoSprite(x, y, z, "spikeball", 10, groups.objects)
		new Shadow(this.shadow, this.iso, true)
  }

  update() {

		game.physics.isoArcade.collide(this.iso,groups.walls);

		// After reaching a certain, swap direction
		if(this.direction == "left" && this.iso.body.position.y > this.endY){
			this.direction = "right";
		}
		else if(this.direction == "right" && this.iso.body.position.y < this.startY){
			this.direction = "left";
		}
		if(this.direction == "up" && this.iso.body.position.x < this.startX){
			this.direction = "down";
		}
		else if(this.direction == "down" && this.iso.body.position.x > this.endX){
			this.direction = "up";
		}

		// Set velocity
		setVelocity(this.iso, this.direction, 80)
	}
}