Bee = class Bee {

	constructor(x,y,z) {

		this.iso = game.add.isoSprite(x+13, y+13, z+10, 'bee', 0, groups.objects)

		this.iso.animations.add('default',[0,1,2],10,true)
		this.iso.animations.play('default')

		game.physics.isoArcade.enable(this.iso)

		this.shadow = new Shadow(this.iso, 26)

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;
		this.iso.body.collideWorldBounds = true;
		this.iso.targetable = true;
		this.iso.destructible = "hard";
		this.iso.direction = "up";

		this.iso.die = this.die.bind(this);
		this.iso.update = this.update.bind(this);

		game.time.events.loop(Phaser.Timer.SECOND, this.toggleFloat, this);
	}

	update() {

		if(this.iso.direction == "up"){
			this.iso.body.velocity.z = 15;
		}
		else{
			this.iso.body.velocity.z = -15;
		}
	}


	die() {
		new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
		game.time.events.add(300, ()=>{
			new Points([1,4,0],this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
		})
		this.iso.destroy()
		this.shadow.iso.destroy()
	}

	toggleFloat() {
		this.iso.direction = (this.iso.direction == "up") ? "down" : "up";
	}
}
