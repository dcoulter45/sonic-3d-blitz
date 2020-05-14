Crab = class Crab {

	constructor(wx, wy, x, y, z) {

		this.startX = x;
		this.startY = y;
		this.endX = x+88;
		this.endX = y+88;

		this.iso = game.add.isoSprite(x, y, z, 'crab', 0, groups.objects);

		this.iso.animations.add('default',[0,1,2,3,4,5,6,7,8,9,10,11],10,true);
		this.iso.animations.play('default');

		game.physics.isoArcade.enable(this.iso);
		this.shadow = new Shadow(this.iso,40);

		this.iso.anchor.set(0.5);
		this.iso.targetable = true;
		this.iso.destructible = "hard";

		this.direction = "none"

		this.iso.collide = this.collide.bind(this);
		this.iso.update = this.update.bind(this);
	}

	update(){

		game.physics.isoArcade.collide(this.iso,groups.walls);

		// After reaching a certain, swap direction
		if(this.direction == "left" && this.iso.body.position.x > this.endX){
			this.direction = "right";
		}
		else if(this.direction == "rght" && this.iso.body.position.x < this.startX){
			this.direction = "left";
		}

		// Set velocity
		if(this.direction == "left"){
			this.iso.body.velocity.x = 50;
		}
		else if(this.direction == "right"){
			this.iso.body.velocity.x = -50;
		}

	}

	collide(obj){

		if(obj.key == "player" && (obj.movement == 'jump' || obj.movement == 'homing attack')){
			this.destroy()
		}
	}

	destroy(){
		new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
		game.time.events.add(300, ()=>{
			new Points([3,0,0],this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
		})
		this.iso.destroy();
	}
}
