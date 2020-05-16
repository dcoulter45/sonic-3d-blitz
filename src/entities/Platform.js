Platform = class Platform {

  direction = "left"
  distance = 4 * TILE_WIDTH

  constructor(wx, wy, x, y, z, obj) {
    if (obj.properties) {
      if (obj.properties.direction) {
        this.direction = obj.properties.direction
      }

      if (obj.properties.distance >= 0) {
        this.distance = obj.properties.distance * TILE_WIDTH
      }
    }

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

    this.iso = game.add.isoSprite(x, y, z, "tiles", 37, groups.objects)
    game.physics.isoArcade.enable(this.iso)

		this.iso.anchor.set(0.5)
		this.iso.body.immovable = true
    this.iso.body.allowGravity = false
    this.iso.body.height = 10
    this.iso.body.widthX = 36
    this.iso.body.widthY = 36
    this.iso.pivot.y = 6

    this.iso.update = this.update.bind(this);

    this.shadow = game.add.isoSprite(x, y, z - 30, "tiles", 9, groups.objects)
    this.shadow.anchor.set(0.5)
    
    collidables.push(this.iso)
  }

  update() {
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
    setVelocity(this.iso, this.direction, 50)
    
    this.shadow.isoX = this.iso.body.position.x
    this.shadow.isoY = this.iso.body.position.y
  }
}