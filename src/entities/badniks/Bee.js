Bee = class Bee extends Badnik {

	points = 140

	constructor(wx, wy, x, y, z) {
		super()

		this.iso = game.add.isoSprite(x+13, y+13, z+30, 'bee', 0, groups.objects)

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

		this.iso.remove = this.remove.bind(this);
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

	toggleFloat() {
		this.iso.direction = (this.iso.direction == "up") ? "down" : "up";
	}
}
