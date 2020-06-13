Ring = class Ring extends RenderInView {

	constructor(wx, wy, x, y, z, obj) {
		super(wx, wy, x, y, z, obj)

		level.rings += 1
	}

	render() {
		var { x, y, z } = this.props

		this.iso = game.add.isoSprite(x + 2, y + 2, z + 15, 'ring', 0, groups.objects);
		game.physics.isoArcade.enable(this.iso);

		this.iso.animations.add('collect', [32,33,34,35], 10, false);
		this.iso.animations.add('default', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 20, true);
		this.iso.animations.play('default');

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;

		this.iso.body.widthX = 18;
		this.iso.body.widthY = 18;
		
		groups.overlap.push(this.iso)

		this.iso.collide = this.collide.bind(this)

		this.shadow = game.add.isoSprite(x + 2, y + 2, z, 'ring', 0, groups.objects);

		new Shadow(this.shadow, this.iso, true)

		this.shadow.animations.add('default', [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 20, true);
		this.shadow.animations.play('default');
	}

	hide() {
		removeFromGroup(groups.overlap, this.iso)
		
		this.iso.destroy()
		this.shadow.destroy()	
	}

	collide(obj) {
		if (obj.key == 'player') {
			this.active = false
			game.rings.add(1)

			Sounds.Ring.play()

			this.iso.body.enable = false;
			this.iso.animations.play('collect');
			this.shadow.visible = false;

			game.time.events.add(500, () => {
				this.iso.destroy();
				this.shadow.destroy();
			});
		}
	}
}
