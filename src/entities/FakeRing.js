class FakeRings{

	constructor(position) {

		Sounds.LoseRings.play()

		var total = Math.min(15, game.rings.count);
		var rings = new Array(total);

		for(var i = 0; i < total; i++) {
			rings[i] = game.add.isoSprite(position.x, position.y, position.z, 'rings', 0, groups.objects);
			rings[i].shadow = game.add.isoSprite(position.x, position.y, position.z, 'rings', 0, groups.objects);
		}

		rings.forEach((ring) => {
			game.physics.isoArcade.enable(ring);
			game.physics.isoArcade.enable(ring.shadow);

			ring.shadow.animations.add('default', [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 20, true);
			ring.shadow.animations.play('default');
			ring.shadow.anchor.set(0.5);

			ring.animations.add('default', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 20, true);
			ring.animations.play('default');
			ring.anchor.set(0.5);

			ring.alpha = 0.6;

			ring.body.velocity.x = Math.floor(Math.random() * 240) - 120;
			ring.body.velocity.y = Math.floor(Math.random() * 240) - 120;
			ring.body.velocity.z = 160;

			game.time.events.add(2000, () => {
				ring.flashing = true;
			}, this)

			game.time.events.add(3000, () => {
				ring.destroy();
				ring.shadow.destroy();
			}, this)

			ring.update = () => {
				game.physics.isoArcade.collide(ring, groups.walls, (obj1, wall) => {
					if (wall.key === "water" || wall.key === "lava") {
						ring.destroy()
						ring.shadow.destroy()
					}
				});

				if (ring.flashing) {
					if(game.tick % 2 == 0) ring.alpha = (ring.alpha==0.6) ? 0 : 0.6;
				}

				if (ring.body.velocity.x > 0) ring.body.acceleration.x = -50;
				if (ring.body.velocity.x < 0) ring.body.acceleration.x = 50;
				if (ring.body.velocity.y > 0) ring.body.acceleration.y = -50;
				if (ring.body.velocity.y < 0) ring.body.acceleration.y = 50;

				ring.shadow.isoX = ring.body.position.x;
				ring.shadow.isoY = ring.body.position.y;
			}
		})
	}
}
