Crawler = class Crawler extends RenderInView {

	constructor(wx, wy, x, y, z, obj) {
		super(wx, wy, x, y, z, obj)
		
		// Set direction
		this.direction = getProp("direction", obj, "down")
		this.distance = getProp("distance", obj, 2) * TILE_WIDTH
		this.offsetZ = getProp("offsetZ", obj, 0)
		
    this.type = obj.type ? obj.type.toLowerCase() : "spider"

		// Set movement limits
		if(this.direction == "left" || this.direction == "down"){
			this.startX = x;
			this.startY = y;
			this.endX = this.startX + this.distance + 10;
			this.endY = this.startY + this.distance + 10;
		}
		else{
			this.endX = x;
			this.endY = y;
			this.startX = this.endX - this.distance - 10;
			this.startY = this.endY - this.distance - 10;
		}
	}

	render() {
		var { x, y, z } = this.props

		this.iso = game.add.isoSprite(x, y, z + 10 + this.offsetZ, this.type, 0, groups.objects);

		var frames = this.type === "spider" ? range(0,11) : range(0,7)

		this.iso.animations.add('default', frames, 10, true);
		this.iso.animations.play('default');

		enablePhysics(this.iso)
		groups.overlap.push(this.iso)

		this.iso.body.allowGravity = true
		this.iso.body.immovable = false
		this.iso.anchor.set(0.5)
		this.iso.destructible = "hard";

		if (this.type === "spider") {
			this.iso.body.widthX = 34
			this.iso.body.widthY = 34
			this.iso.body.height = 20
		}
		
		this.iso.update = this.update.bind(this);
		this.iso.remove = this.remove.bind(this);
	}

	update() {
		game.physics.isoArcade.collide(this.iso, groups.walls);

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
	}

	hide() {
		removeFromGroup(groups.overlap, this.iso)
		this.iso.destroy()
	}

	remove() {
		this.active = false 

    new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
    
    this.iso.destroy()
   
    Sounds.Destroy.play()
  }
}
