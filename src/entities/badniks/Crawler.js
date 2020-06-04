Crawler = class Crawler extends Badnik {

	constructor(wx, wy, x, y, z, obj) {
		super()
		
		// Set direction
		this.direction = getProp("direction", obj, "down")
    this.distance = getProp("distance", obj, 2) * TILE_WIDTH
    this.type = obj.type ? obj.type : "spider"

		// Set movement limits

		if(this.direction == "left" || this.direction == "down"){
			this.startX = x+10;
			this.startY = y;
			this.endX = this.startX + this.distance;
			this.endY = this.startY + this.distance;
		}
		else{
			this.endX = x+10;
			this.endY = y;
			this.startX = this.endX - this.distance;
			this.startY = this.endY - this.distance;
		}

    // Add sprite and animations

		this.iso = game.add.isoSprite(x, y, z, this.type, 0, groups.objects);

		var frames = this.type === "spider" ? range(0,11) : range(0,7)

		this.iso.animations.add('default',frames,10,true);
		this.iso.animations.play('default');

		game.physics.isoArcade.enable(this.iso);

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;
		this.iso.targetable = true;
		this.iso.destructible = "hard";

		groups.targets.push(this.iso)
		groups.overlap.push(this.iso)
		
		this.iso.update = this.update.bind(this);
		this.iso.remove = this.remove.bind(this);
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
		setVelocity(this.iso, this.direction, 50)
	}
}
