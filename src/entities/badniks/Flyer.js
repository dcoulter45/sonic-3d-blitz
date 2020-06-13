Flyer = class Flyer extends RenderInView {
	render() {
		var { x, y, z, obj } = this.props

		if (obj.type === "Bat") {
      this.iso = game.add.isoSprite(x, y, z + 30, "bat", 0, groups.objects)

      this.iso.animations.add("default", range(0, 9), 10, true)
      this.iso.animations.play("default")
    }

		if (obj.type === "Bee") {
			this.iso = game.add.isoSprite(x, y, z + 30, "bee", 0, groups.objects)

			this.iso.animations.add("default",[0,1,2],10,true)
			this.iso.animations.play("default")
    }

		if (obj.type === "Dragonfly") {
			this.iso = game.add.isoSprite(x, y, z + 30, "dragonfly", 0, groups.objects)

			this.iso.animations.add("default",[0,1,2],10,true)
			this.iso.animations.play("default")
		}

		game.physics.isoArcade.enable(this.iso)
		// this.shadow = new Shadow(this.iso, 26)

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;
		this.iso.targetable = true;
		this.iso.destructible = "hard";

		this.iso.remove = this.destroy.bind(this);
		this.iso.update = this.update.bind(this);

		groups.targets.push(this.iso)
		groups.overlap.push(this.iso)

		game.time.events.loop(Phaser.Timer.SECOND, this.toggleFloat, this);
	}

	hide() {
		removeFromGroup(groups.targets, this.iso)
		removeFromGroup(groups.overlap, this.iso)
		this.iso.destroy()
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

	destroy() {
		this.active = false
		this.hide()

		new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
    Sounds.Destroy.play()
	}
}
