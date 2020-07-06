RedRing = class RedRing extends RenderInView {

  render() {
    var { x, y, z } = this.props

		this.iso = game.add.isoSprite(x + 2, y + 2, z + 15, 'rings', 0, groups.objects);
		game.physics.isoArcade.enable(this.iso);

		this.iso.animations.add('collect', [56,57,58,59], 10, false);
		this.iso.animations.add('default', range(40, 55), 20, true);
		this.iso.animations.play('default');

		this.iso.anchor.set(0.5);
		this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;

		this.iso.body.widthX = 18;
		this.iso.body.widthY = 18;
		
		groups.overlap.push(this.iso)

		this.iso.collide = this.collide.bind(this)

		this.shadow = game.add.isoSprite(x + 2, y + 2, z, 'rings', 0, groups.objects);

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

			Sounds.Ring.play()

			this.iso.body.enable = false;
			this.iso.animations.play('collect');
			this.shadow.visible = false;

			game.rings.redRing = true

			game.time.events.add(500, () => {
				this.hide()
			});
		}
	}
}