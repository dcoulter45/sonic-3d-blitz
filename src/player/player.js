const PLAYER_CONTROLLED_STATES = ["normal", "jump", "doubleJump", "sprung", "roll", "slam"]
const ATTACK_STATES = ["jump", "doubleJump", "roll", "slam", "homing attack", "flameDash"]
const DEAD_STATES = ["dead", "burning", "drowing", "falling", "squashed"]
const JUMP_STATES = ["jump", "sprung", "slam", "falling", "doubleJump", "flameDash"]
const WORLDS_END = -30
const MAX_VELOCITY = 225

Player = class Player {

	constructor(wx, wy, x, y, z, obj) {
		player = this

		var rollingStart = getProp("rollingStart", obj, false)
		var initialDirection = getProp("direction", obj, "down")

		if (stateParams.respawnPoint) {
			var { x, y, z } = stateParams.respawnPoint
		}

		this.iso = game.add.isoSprite(x, y, z, "sonic", 0, groups.objects);

		this.iso.key = "player";
		this.iso.anchor.set(0.5);
		this.crosshair = new Crosshair(0, 0, 0);
		this.shadow = new PlayerShadow(x, y, z)
		new PlayerCamera(x, y, z)

		game.physics.isoArcade.enable(this.iso);

		this.iso.body.widthX = 20;
		this.iso.body.widthY = 20;
		this.iso.body.height = 24;
		this.iso.pivot.y = 8;
		this.iso.body.collideWorldBounds = false;

		this.iso.body.maxVelocity.x = MAX_VELOCITY;
		this.iso.body.maxVelocity.y = MAX_VELOCITY;

		this.iso.movement = "normal";
		this.iso.direction = initialDirection.substring(0, 1);
		this.iso.direction2 = "";
		this.iso.hurtDIR = null;
		this.iso.cursorDown = false;
		this.iso.invulnerable = false;
		this.iso.cursor1 = "";
		this.iso.cursor2 = "";
		this.iso.disableControls = false;

		this.iso.collide = this.collide.bind(this);
		this.iso.update = this.update.bind(this);

		createAnimations(this.iso)
		createCursors()

		if (rollingStart) {
			this.iso.disableControls = true
			setVelocity(this.iso, initialDirection, 100)

			game.time.events.add(1200, () => {
				this.iso.body.velocity = { x: 0, y: 0, z: 0 }
				this.iso.disableControls = false
			})
		}
	}

	update() {

		this.iso.previousVelocity = {
			x: this.iso.body.velocity.x,
			y: this.iso.body.velocity.y,
			z: this.iso.body.velocity.z
		}

		this.iso.previousMovement = this.iso.movement
		this.iso.previousAction = this.iso.action

		if (!DEAD_STATES.includes(this.iso.movement)) {
			this.touchingFloor = false
			this.touchingWater = false

			game.physics.isoArcade.collide(player.iso, groups.walls, (obj1, obj2) => {
				if (obj1.body.touching.up) {
					if (obj2.key === "water") {
						this.touchingWater = true
					} else {
						this.touchingFloor = true
					}
				}

				obj1.collide(obj2)

				if (obj2.collide) obj2.collide(obj1)
			});

			game.physics.isoArcade.overlap(player.iso, groups.walls, function (obj1, obj2) {
				if (obj2.key === "slope") {
					player.handleSlope(obj2)
				} else {
					game.physics.isoArcade.collide(obj1, obj2)
				}

				if (obj1.body.touching.up) {
					if (obj2.key === "water") {
						this.touchingWater = true
					} else {
						this.touchingFloor = true
					}
				}

				obj1.collide(obj2)

				if (obj2.collide) obj2.collide(obj1)
				if (obj2.overlap) obj2.overlap(obj1)
			});

			// game.physics.isoArcade.collide(player.iso, groups.collide, (obj1, obj2) => {
			// 	if (obj1.body.touching.up) {
			// 		if (obj2.key === "water") {
			// 			this.touchingWater = true
			// 		} else {
			// 			this.touchingFloor = true
			// 		}
			// 	}

			// 	obj1.collide(obj2)

			// 	if (obj2.collide) obj2.collide(obj1)
			// })

			game.physics.isoArcade.overlap(player.iso, groups.overlap, function (obj1, obj2) {
				obj1.collide(obj2)
				if (obj2.collide) obj2.collide(obj1)
			})

			if (this.onFloor() && JUMP_STATES.includes(this.iso.movement)) {
				this.iso.movement = "normal"
			}

			if (!player.onFloor() && player.touchingWater && this.iso.movement !== "drowning") {
				this.die("drowning")
			}

			if (player.iso.body.position.z < WORLDS_END) {
				this.die("falling")
			}
		}

		// =============================
		//  Player controlled movement
		// =============================
		if (!this.iso.disableControls) {
			if (PLAYER_CONTROLLED_STATES.includes(this.iso.movement)) {
				detectCursors()
				playerRun()
				playerDeceleration()
			}

			if (this.iso.movement === "climbing") {
				playerClimb()
			}

			playerMoves()
		}

		// ============
		//  Animation
		// ============

		if (this.iso.movement == "normal") {

			if (this.iso.body.velocity.y == 0 && this.iso.body.velocity.x == 0) {
				this.iso.action = "stand";
			}
			else if (
				(this.iso.body.velocity.x > 10 && this.iso.direction == "u") ||
				(this.iso.body.velocity.x < -10 && this.iso.direction == "d") ||
				(this.iso.body.velocity.y > 10 && this.iso.direction == "r") ||
				(this.iso.body.velocity.y < -10 && this.iso.direction == "l")
			) {
				this.iso.action = "skid";
			}
			else if (isMovingFasterThan(this.iso.body.velocity, 200)) {
				this.iso.action = "run";
			}
			else {
				this.iso.action = "walk";
			}
		}
		else if (this.iso.movement === "skidding") {
			this.iso.action = "skid"
		}
		else if (this.iso.movement === "sink") {
			this.iso.action = "sink";
			this.iso.direction = "";
		}
		else if (this.iso.movement === "roll" || this.iso.movement === "doubleJump") {
			this.iso.action = "jump";
		}
		else {
			this.iso.action = this.iso.movement;
		}

		if (this.iso.action === "skid") {
			if (game.tick % 4 == 0) {
				new Dust(this.iso.body.position.x, this.iso.body.position.y, this.iso.body.position.z);
			}
		}

		if (player.iso.movement == "homing attack" || player.iso.movement == "slam") {
			if (game.tick % 2 == 0) {
				new HomingTrail(player.iso.body.position.x, player.iso.body.position.y, player.iso.body.position.z, player.iso.direction);
			}
		}

		playPlayerSounds()

		playAnimation(this.iso)

		detectHomingTarget()

		this.shadow.update()

		this.onSlope = false;
	}

	onFloor() {
		return (this.iso.body.onFloor() || this.touchingFloor || this.onSlope) ? true : false;
	}

	// ================
	//  COLLISIONS
	// ================

	collide(obj) {

		if (obj.harmful === true) {
			this.hurt();
		}
		else if (obj.destructible == "hard") {

			if (["jump", "homing attack", "slam", "roll"].includes(this.iso.movement)) {
				obj.remove();

				if (this.iso.movement == "jump" || this.iso.movement == "homing attack") {
					this.iso.body.velocity.z = 250;

					if (this.iso.movement === "homing attack") {
						this.homingTarget = null

						if (this.iso.direction === "r") this.iso.body.velocity.y = -75
						else if (this.iso.direction === "l") this.iso.body.velocity.y = 75
						else if (this.iso.direction === "d") this.iso.body.velocity.x = 75
						else if (this.iso.direction === "u") this.iso.body.velocity.x = -75
					}

					this.iso.movement = "jump";
				}
			}
			else {
				this.hurt();
			}
		}
		else if (
			["wall", "prop", "rock", "ice"].includes(obj.key)
			&& isMovingFasterThan(this.iso.previousVelocity, 220)
			&& (this.iso.body.touching.frontX || this.iso.body.touching.frontY || this.iso.body.touching.backX || this.iso.body.touching.backY)
			&& this.iso.movement !== "bounced"
		) {
			this.iso.movement = "bounced";
			Sounds.Land.play()

			this.iso.body.acceleration.x = 0;
			this.iso.body.acceleration.y = 0;
			this.iso.body.velocity.z = 100;

			if (this.iso.previousVelocity.x >= 220) {
				this.iso.body.velocity.x = -80;
				this.iso.body.velocity.y = this.iso.body.velocity.y * -0.5;
			}
			if (this.iso.previousVelocity.x <= -220) {
				this.iso.body.velocity.x = 80;
				this.iso.body.velocity.y = this.iso.body.velocity.y * -0.5;
			}
			if (this.iso.previousVelocity.y >= 220) {
				this.iso.body.velocity.x = this.iso.body.velocity.x * -0.5;
				this.iso.body.velocity.y = -80;
			}
			if (this.iso.previousVelocity.y <= -220) {
				this.iso.body.velocity.x = this.iso.body.velocity.x * -0.5;
				this.iso.body.velocity.y = 80;
			}

			game.time.events.add(800, () => {
				this.iso.movement = "normal";
				this.iso.body.velocity.x = 0;
				this.iso.body.velocity.y = 0;
			});
		}
	}

	// ================
	//  SLOPE
	// ================

	handleSlope(slope) {
		if (this.iso.body.velocity.z <= 0) {

			var zz = getSlopePos(this.iso, slope)

			if (zz >= this.iso.body.position.z - 5) {
				this.onSlope = true;
				this.iso.body.position.z = zz;
				this.iso.body.velocity.z = 0;
			}
		}
	}

	stop() {
		this.iso.body.acceleration = { x: 0, y: 0, z: 0 }
		this.iso.body.velocity = { x: 0, y: 0, z: 0 }
	}

	// ================
	//  HURT
	// ================

	hurt() {
		if (this.iso.invulnerable === false) {
			// DEAD
			if (game.rings.count === 0 && !this.shield) {
				this.die()
			}
			// HURT
			else {

				if (!this.shield) {
					new FakeRings(this.iso.body.position);
					game.rings.reset()
				}
				else {
					this.shield.destroy()
				}

				this.iso.movement = "hurt";
				this.iso.invulnerable = true;
				this.iso.body.velocity.z = 100;

				this.iso.body.acceleration.x = 0;
				this.iso.body.acceleration.y = 0;

				this.iso.hurtDIR = this.iso.direction.substring(0, 1);

				if (this.iso.hurtDIR == "d") {
					this.iso.body.velocity.x = Math.min(-120, this.iso.body.velocity.x * -0.75);
					this.iso.body.velocity.y = this.iso.body.velocity.y * -0.75;
				}
				else if (this.iso.hurtDIR == "u") {
					this.iso.body.velocity.x = Math.max(120, this.iso.body.velocity.x * -0.75);
					this.iso.body.velocity.y = this.iso.body.velocity.y * -0.75;
				}
				else if (this.iso.hurtDIR == "l") {
					this.iso.body.velocity.x = this.iso.body.velocity.x * -0.75;
					this.iso.body.velocity.y = Math.min(-120, this.iso.body.velocity.y * -0.75);
				}
				else if (this.iso.hurtDIR == "r") {
					this.iso.body.velocity.x = this.iso.body.velocity.x * -0.75;
					this.iso.body.velocity.y = Math.max(120, this.iso.body.velocity.y * -0.75);
				}

				game.time.events.add(450, () => {

					this.iso.body.velocity.x = 0;
					this.iso.body.velocity.y = 0;
				});

				game.time.events.add(900, () => {
					if (this.iso.movement === "hurt") {
						this.iso.movement = "normal"
						this.iso.hurtDIR = null
					}
				});

				game.time.events.add(2000, () => {
					this.iso.invulnerable = false
				})
			}
		}
	}

	die(causeOfDeath = "hurt") {
		if (!DEAD_STATES.includes(this.iso.movement)) {
			game.phase = "over"

			var delay = 1000

			if (this.shield) {
				this.shield.destroy()
			}

			game.camera.follow(null)

			if (causeOfDeath === "hurt") {
				this.iso.movement = "dead";

				Sounds.Hurt.play()
			}

			if (causeOfDeath === "falling") {
				this.iso.movement = "falling"
				this.iso.body.allowGravity = false
				this.iso.body.acceleration = { x: 0, y: 0, z: 0 }
				this.iso.body.velocity = { x: 0, y: 0, z: 0 }

				game.time.events.add(800, () => this.iso.body.allowGravity = true)
			}

			if (causeOfDeath === "burning") {
				this.iso.movement = "burning"
			}

			if (causeOfDeath === "drowning") {
				this.iso.movement = "drowning";

				game.time.events.add(800, () => {
					Sounds.WaterGush.play()
				})
			}

			if (causeOfDeath === "squashed") {
				delay = 2000
				this.iso.movement = "squashed"
				this.iso.body.moves = false
			}

			if (game.save.data.lives > 0) {
				this.resetGame(delay)
			}
			else {
				game.time.events.add(delay, () => {
					new GameOver()
				})
			}
		}
	}

	resetGame(delay) {
		game.timeCounter.stop()

		game.time.events.add(delay, () => game.camera.fade(0x000000, 1000))
		game.time.events.add(delay + 1000, () => {
			if (game.track) game.track.stop()
			game.lives.removeLife()
			stateParams.displayTitle = true
			game.state.restart()
		})
	}
}
