Spider = class Spider{

	constructor(x,y,z,obj){
		// Set direction
		this.direction = (obj.properties && obj.properties.direction) ? obj.properties.direction : "left";
		this.distance = (obj.properties && obj.properties.distance) ? (obj.properties.distance*44)-44 : 88;

		// Set movement limits

		if(this.direction == "left" || this.direction == "down"){
			this.startX = x+10;
			this.startY = y;
			this.endX = this.startX+this.distance;
			this.endY = this.startY+this.distance;
		}
		else{
			this.endX = x+10;
			this.endY = y;
			this.startX = this.endX-this.distance;
			this.startY = this.endY-this.distance;
		}

		// Add sprite and animations
		this.iso = game.add.isoSprite(x, y, z, 'spider', 0, groups.objects);

		this.iso.animations.add('default',[0,1,2,3,4,5,6,7,8,9,10,11],10,true);
		this.iso.animations.play('default');

		game.physics.isoArcade.enable(this.iso);

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;
		this.iso.targetable = true;
		this.iso.destructible = "hard";

		this.iso.update = this.update.bind(this);
		this.iso.die = this.die.bind(this);
	}

	update(){

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
		if(this.direction == "left"){
			this.iso.body.velocity.y = 50;
		}
		else if(this.direction == "right"){
			this.iso.body.velocity.y = -50;
		}
		else if(this.direction == "down"){
			this.iso.body.velocity.x = 50;
		}
		else if(this.direction == "up"){
			this.iso.body.velocity.x = -50;
		}
	}

	die(){
		new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
		
		game.time.events.add(300, ()=>{
			new Points([3,0,0],this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
		})
		
		this.iso.destroy();
	}
}
