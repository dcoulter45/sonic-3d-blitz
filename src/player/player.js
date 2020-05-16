const PLAYER_CONTROLLED_STATES = ["normal", "falling", "jump", "sprung", "roll", "slam"]
const MAX_VELOCITY = 225

Player = class Player {

	constructor(wx, wy, x, y, z, obj) {
		player = this

		// Create another cube as our 'player', and set it up just like the cubes above.
		this.iso = game.add.isoSprite(x, y, z, "sonic", 0, groups.objects);

		this.iso.key = "player";
		this.iso.anchor.set(0.5);
		this.crosshair = new Crosshair(0,0,0);
		this.shadow = new PlayerShadow(x, y, z)

		game.physics.isoArcade.enable(this.iso);
    game.camera.follow(this.iso)

		this.iso.body.widthX = 18;
		this.iso.body.widthY = 18;
		this.iso.body.height = 24;
		this.iso.pivot.y = 8;
		this.iso.body.collideWorldBounds = false;

		this.iso.body.maxVelocity.x = MAX_VELOCITY;
		this.iso.body.maxVelocity.y = MAX_VELOCITY;

		this.iso.movement = "normal";
		this.iso.direction = "d";
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

		if (obj.properties && obj.properties.rollingStart) {
			this.iso.disableControls = true
			this.iso.body.velocity.x = 100

			game.time.events.add(1200, () => {
				this.iso.body.velocity.x = 0
				this.iso.disableControls = false
			})
		}
	}

	update(){

		this.iso.previousVelocity = {
			x: this.iso.body.velocity.x,
			y: this.iso.body.velocity.y,
			z: this.iso.body.velocity.z
		}

		this.iso.previousMovement = this.iso.movement
		this.iso.previousAction = this.iso.action

		// Objects Collision
		game.physics.isoArcade.overlap(this.iso, groups.objects, function(obj1, obj2) {

			if (obj2.key == 'player' || obj2.key == 'playerShadow') {
				return false;
			}
			else if (obj2.collidable) {
				game.physics.isoArcade.collide(obj1,obj2);
			}
			else if (obj1.movement !== 'dead' && obj1.invulnerable == false) {
				if(obj1.collide) obj1.collide(obj2);
				if(obj2.collide) obj2.collide(obj1);
			}
		});

		if( this.onFloor() && ["jump", "sprung", "slam", "falling"].includes(this.iso.movement)) {
			this.iso.movement = 'normal';
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

			if(this.iso.movement == 'sink'){
				this.iso.body.velocity.x = 0;
				this.iso.body.velocity.y = 0;
				this.iso.body.acceleration.x = 0;
				this.iso.body.acceleration.y = 0;
			}

			if(this.iso.movement == 'drowning' && this.iso.body.position.z < -60){
				this.iso.body.acceleration = {x:0,y:0,z:0};
				this.iso.body.velocity = {x:0,y:0,z:0};
				this.iso.body.allowGravity = false;
			}

			if(this.iso.movement == 'dead'){
				this.iso.body.velocity = { x:0,y:0,z:50 };
				this.iso.body.acceleration = { x:0,y:0,z:0 };
			}

			if(this.iso.movement !== 'dead' && this.iso.body.position.z < -1000){
				this.iso.movement = 'dead';
				game.state.restart();
			}

			if(this.iso.movement == 'homing attack'){
				this.iso.body.position.x += this.homingTargetPosition.moveX;
				this.iso.body.position.y += this.homingTargetPosition.moveY;
				this.iso.body.position.z += this.homingTargetPosition.moveZ;

				if(this.onFloor()){
					this.iso.movement = 'normal';
				}
			}

			if(this.iso.movement == 'homing attack' || this.iso.movement == 'slam'){
				if(game.tick % 2 == 0){
					new HomingTrail(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z,this.iso.direction);
				}
			}

			// Roll
			if (
				this.btn2Pressed 
				&& this.onFloor() 
				&& this.iso.movement == 'normal'
				&& isMovingFasterThan(this.iso.body.velocity, 50)
			) {
				this.iso.movement = 'roll';
				this.btn2Pressed = false;

				game.time.events.add(600,()=>{
					if(this.iso.movement == 'roll'){
						this.iso.movement = 'normal';
					}
				});
			}

			// Slam
			if(this.btn2Pressed && this.iso.movement == 'jump'){
				this.iso.movement = 'slam';
				this.iso.body.velocity = { x:0, y:0, z: -350 };
				this.btn2Pressed = false;
			}

			// Drop Dash 
			if (this.iso.previousMovement === "slam" && this.onFloor()) {
				this.iso.movement = "roll"
				
				if (this.iso.direction === "u") {
					this.iso.body.velocity.x = MAX_VELOCITY * -1
				} else if (this.iso.direction === "d") {
					this.iso.body.velocity.x = MAX_VELOCITY
				} else if (this.iso.direction === "r") {
					this.iso.body.velocity.y = MAX_VELOCITY * -1
				} else if (this.iso.direction === "l") {
					this.iso.body.velocity.y = MAX_VELOCITY 
				}

				game.time.events.add(600,()=>{
					if(this.iso.movement == 'roll'){
						this.iso.movement = 'normal';
					}
				});
			}

			// Jump
			if(this.btn1Pressed && this.onFloor() && (this.iso.movement == 'normal' || this.iso.movement == 'roll')){

				this.iso.movement = 'jump';
				this.iso.body.velocity.z = 250;
				this.btn1Pressed = false;
			}

			if (this.iso.movement == 'spring') {
				this.iso.movement = 'sprung';
				game.time.events.add(600,()=>{
					if(this.iso.movement == 'sprung') this.iso.movement = 'jump';
				})
				this.iso.body.velocity.z = 350;
			}

			// Homing attack
			if (this.btn1Pressed && !this.onFloor() && this.iso.movement != 'homing attack' && this.homingTarget) {

				this.iso.movement = 'homing attack';
				this.iso.body.acceleration = { x:0, y:0, z:0 };
				this.iso.body.velocity = { x:0, y:0, z:0 };
				this.btn1Pressed = false;

				this.homingTargetPosition = {
					x: this.homingTarget.body.position.x,
					y: this.homingTarget.body.position.y,
					z: this.homingTarget.body.position.z + 10,
					moveX: (this.homingTarget.body.position.x - this.iso.body.position.x) / 20,
					moveY: (this.homingTarget.body.position.y - this.iso.body.position.y) / 20,
					moveZ: ((this.homingTarget.body.position.z+20) - this.iso.body.position.z) / 20,
				}
			}

		}

		// ============
		//  Animation
		// ============

		if(this.iso.movement == 'normal'){

			if(this.iso.body.velocity.y == 0 && this.iso.body.velocity.x == 0){

				this.iso.action = 'stand';
			}
			else if(
				(this.iso.body.velocity.x > 10 && this.iso.direction == 'u') ||
				(this.iso.body.velocity.x < -10 && this.iso.direction == 'd') ||
				(this.iso.body.velocity.y > 10 && this.iso.direction == 'r') ||
				(this.iso.body.velocity.y < -10 && this.iso.direction == 'l')
			){
				this.iso.action = 'skid';

				if(game.tick % 4 == 0){
					new Dust(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
				}
			}
			else if(this.iso.body.velocity.x >= 200 || this.iso.body.velocity.x <= -200 ||
							this.iso.body.velocity.y >= 200 || this.iso.body.velocity.y <= -200){

				this.iso.action = 'run';
			}
			else{
				this.iso.action = 'walk';
			}
		}
		else if(this.iso.movement == 'sink'){
			this.iso.action = 'sink';
			this.iso.direction = "";
		}
		else if(this.iso.movement == 'roll'){
			this.iso.action = 'jump';
		}
		else{
			this.iso.action = this.iso.movement;
		}

		playPlayerSounds()

		playAnimation(this.iso)

		detectHomingTarget()
		
		this.shadow.update()

		this.onSlope = false;
	}

	onFloor(){
		return (this.iso.body.onFloor() || this.iso.body.touching.up || this.onSlope) ? true : false;
	}

	// ================
	//  COLLISIONS
	// ================

	collide(obj){
		if(obj.harmful === true){
			this.hurt();
		}
		else if(obj.destructible == "hard"){

			if(this.iso.movement == 'jump' || this.iso.movement == 'homing attack' || this.iso.movement == 'roll' || this.iso.movement == 'slam'){

				obj.remove();

				if(this.iso.movement == 'jump' || this.iso.movement == 'homing attack' || this.iso.movement == 'slam'){
					this.iso.body.velocity.z = 250;
					this.iso.movement = 'jump';
				}
			}
			else{
				this.hurt();
			}
		}
		else if (obj.key == 'spring' && ["normal", "jump", "sprung", "roll"].includes(this.iso.movement)) {
			this.iso.movement = 'spring';
		}
		else if (obj.key == 'water' && this.iso.movement != "drowning") {
			this.iso.movement = "drowning";
			this.iso.body.acceleration.x = 0;
			this.iso.body.acceleration.y = 0;
			this.iso.body.velocity.x = 0 //this.iso.body.velocity.x/2;
			this.iso.body.velocity.y = 0 //this.iso.body.velocity.y/2;
			this.iso.body.velocity.z = 0;

			game.time.events.add(800, () => {
				Sounds.WaterGush.play()
			})

			game.time.events.add(2000, () => {
				game.state.restart();
			})
		}
		else if (
			["wall", "prop"].includes(obj.key) 
			&& isMovingFasterThan(this.iso.previousVelocity, 220)
			&& this.iso.previousVelocity.z == 0
			&& this.iso.movement !== "bounced"
		) {

			this.iso.movement = "bounced";
			Sounds.Land.play()

			this.iso.body.acceleration.x = 0;
			this.iso.body.acceleration.y = 0;
			this.iso.body.velocity.z = 100;

			if(this.iso.previousVelocity.x >= 220){
				this.iso.body.velocity.x = -80;
				this.iso.body.velocity.y = this.iso.body.velocity.y * -0.5;
			}
			if(this.iso.previousVelocity.x <= -220){
				this.iso.body.velocity.x = 80;
				this.iso.body.velocity.y = this.iso.body.velocity.y * -0.5;
			}
			if(this.iso.previousVelocity.y >= 220){
				this.iso.body.velocity.x = this.iso.body.velocity.x * -0.5;
				this.iso.body.velocity.y = -80;
			}
			if(this.iso.previousVelocity.y <= -220){
				this.iso.body.velocity.x = this.iso.body.velocity.x * -0.5;
				this.iso.body.velocity.y = 80;
			}

			game.time.events.add(800, () => {
				this.iso.movement = 'normal';
				this.iso.body.velocity.x = 0;
				this.iso.body.velocity.y = 0;
			});
		}
	}

	// ================
	//  SLOPE
	// ================

	handleSlope(slope){

		if(this.iso.body.velocity.z <= 0){

			if(slope.direction == 'down'){
				var xx = (slope.body.position.x - this.iso.body.position.x);
				var zz = Math.floor(slope.body.position.z + 30 + ((xx / 44) * 31));
			}
			else if(slope.direction == 'up'){
				var xx = (slope.body.position.x - (this.iso.body.position.x+20)) * -1;
				var zz = Math.floor(slope.body.position.z + ((xx / 44) * 31));
			}
			else if(slope.direction == 'left'){
				var xx = (slope.body.position.y - this.iso.body.position.y);
				var zz = Math.floor(slope.body.position.z + 30 + ((xx / 44) * 31));
			}
			else if(slope.direction == 'right'){
				var xx = (slope.body.position.y - (this.iso.body.position.y+20) ) * -1;
				var zz = Math.floor(slope.body.position.z + ((xx / 44) * 31));
			}

			if (zz >= this.iso.body.position.z - 5 && zz < slope.body.position.z + 30) {
				this.onSlope = true;
				this.iso.body.position.z = zz;
				this.iso.body.velocity.z = 0;
			}
		}
	}

	// ================
	//  HURT
	// ================

	hurt(){

		if(this.iso.invulnerable === false){

			// DEAD
			if(ringCounter.rings == 0){

				this.iso.movement = "dead";

				game.time.events.add(1000,()=>{
					game.state.restart();
				})
			}
			// HURT
			else{

				new FakeRings(this.iso.body.position);
				ringCounter.decrement();

				this.iso.movement = "hurt";
				this.iso.invulnerable = true;
				this.iso.body.velocity.z = 100;

				this.iso.body.acceleration.x = 0;
				this.iso.body.acceleration.y = 0;

				this.iso.hurtDIR = this.iso.direction.substring(0, 1);

				if(this.iso.hurtDIR == 'd'){
					this.iso.body.velocity.x = Math.min(-120,this.iso.body.velocity.x * -0.75);
					this.iso.body.velocity.y = this.iso.body.velocity.y * -0.75;
				}
				else if(this.iso.hurtDIR == 'u'){
					this.iso.body.velocity.x = Math.max(120,this.iso.body.velocity.x * -0.75);
					this.iso.body.velocity.y = this.iso.body.velocity.y * -0.75;
				}
				else if(this.iso.hurtDIR == 'l'){
					this.iso.body.velocity.x = this.iso.body.velocity.x * -0.75;
					this.iso.body.velocity.y = Math.min(-120,this.iso.body.velocity.y * -0.75);
				}
				else if(this.iso.hurtDIR == 'r'){
					this.iso.body.velocity.x = this.iso.body.velocity.x * -0.75;
					this.iso.body.velocity.y = Math.max(120,this.iso.body.velocity.y * -0.75);
				}

				game.time.events.add(450, () => {

					this.iso.body.velocity.x = 0;
					this.iso.body.velocity.y = 0;
				});

				game.time.events.add(900, () => {

					this.iso.movement = 'normal';
					this.iso.invulnerable = false;
					this.iso.hurtDIR = null;
				});
			}
		}
	}
}
