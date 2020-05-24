Flyer = class Flyer extends Badnik {

	points = 140

	constructor(wx, wy, x, y, z, obj) {
		super()

    if (obj.type === "Bat") {
      this.iso = game.add.isoSprite(x, y, z + 30, "bat", 0, groups.objects)

      this.iso.animations.add("default", range(0, 9), 10, true)
      this.iso.animations.play("default")
    }

		game.physics.isoArcade.enable(this.iso)

		this.shadow = new Shadow(this.iso, 26)

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;
		this.iso.body.collideWorldBounds = true;
		this.iso.targetable = true;
		this.iso.destructible = "hard";

		this.iso.remove = this.remove.bind(this);
		this.iso.update = this.update.bind(this);

		groups.targets.push(this.iso)
		groups.overlap.push(this.iso)

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
