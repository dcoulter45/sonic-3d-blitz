
class Player {

	constructor(x,y,z) {

		// Create another cube as our 'player', and set it up just like the cubes above.
		this.iso = game.add.isoSprite(x, y, z, "sonic", 0, groups.objects);
		this.shadow = game.add.isoSprite(x, y, z, "playerShadow", 0, groups.objects);

		this.iso.key = "player";
		this.iso.anchor.set(0.5);
		this.shadow.anchor.set(0.5);
		this.shadow.pivot.y = -5;
		this.crosshair = new Crosshair(0,0,0);

		game.physics.isoArcade.enable(this.iso);
		game.physics.isoArcade.enable(this.shadow);

		this.shadow.body.widthX = 18;
		this.shadow.body.widthY = 18;

		this.iso.body.widthX = 18;
		this.iso.body.widthY = 18;
		this.iso.body.height = 24;
		this.iso.pivot.y = 8;

		createAnimations(this.iso)

		this.iso.movement = "normal";
		this.iso.direction = "d";
		this.iso.direction2 = "";
		this.iso.hurtDIR = null;
		this.iso.cursorDown = false;
		this.iso.invulnerable = false;
		this.iso.cursor1 = "";
		this.iso.cursor2 = "";

		this.iso.body.maxVelocity.x = 225;
		this.iso.body.maxVelocity.y = 225;

		//  Controllers
		// -------------

		this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.cursors = game.input.keyboard.createCursorKeys();

		game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN,
			Phaser.Keyboard.SPACEBAR
		]);

		this.iso.body.collideWorldBounds = true;
		this.shadow.body.collideWorldBounds = false;
		this.shadow.body.allowGravity = false;

		this.iso.collide = this.collide.bind(this);
		this.iso.update = this.update.bind(this);

		this.space.onDown.add(()=> this.btn1Pressed = true );
		this.space.onUp.add(()=> this.btn1Pressed = false );
		this.a.onDown.add(()=> this.btn1Pressed = true );
		this.a.onUp.add(()=> this.btn1Pressed = false );
		this.s.onDown.add(()=> this.btn2Pressed = true );
		this.s.onUp.add(()=> this.btn2Pressed = false );

	}

	update(){

		this.iso.previousVelocity = {
			x: this.iso.body.velocity.x,
			y: this.iso.body.velocity.y,
			z: this.iso.body.velocity.z
		}

		// =============================
		//  Player controlled movement
		// =============================
		if(this.iso.movement == 'normal' || this.iso.movement == 'jump' || this.iso.movement == 'sprung' ||
			 this.iso.movement == 'falling' || this.iso.movement == 'roll' || this.iso.movement == 'slam'
		){

			//  Cursor Check
			// ----------------

			if(this.iso.cursor1 == ""){

				if (this.cursors.down.isDown){
					this.iso.cursor1 = "down";
					this.iso.direction = 'd';
					this.iso.cursorDown = true;
				} else if (this.cursors.up.isDown){
					this.iso.cursor1 = "up";
					this.iso.direction = 'u';
					this.iso.cursorDown = true;
				}
				else if (this.cursors.left.isDown){
					this.iso.cursor1 = "left";
					this.iso.direction = 'l';
					this.iso.cursorDown = true;
				}
				else if (this.cursors.right.isDown){
					this.iso.cursor1 = "right";
					this.iso.direction = 'r';
					this.iso.cursorDown = true;
				}
				else{
					this.iso.cursorDown = false;
				}
			}
			else{

				if(this.cursors[this.iso.cursor1].isUp){

					this.iso.cursor1 = "";
					this.iso.cursor2 = "";
				}

				// Track second cursor at full speed
				// ---------------------------------
				if(
					this.iso.body.velocity.x >= 50 || this.iso.body.velocity.x <= -50 ||
					this.iso.body.velocity.y >= 50 || this.iso.body.velocity.y <= -50
				){
					if (this.cursors.down.isDown && this.iso.cursor1 != 'down'){
						this.iso.cursor2 = "down";
						this.iso.direction2 ="d";
					}
					else if (this.cursors.up.isDown && this.iso.cursor1 != 'up'){
						this.iso.cursor2 = "up";
						this.iso.direction2 ="u";
					}
					else if (this.cursors.left.isDown && this.iso.cursor1 != 'left'){
						this.iso.cursor2 = "left";
						this.iso.direction2 ="l";
					}
					else if (this.cursors.right.isDown && this.iso.cursor1 != 'right'){
						this.iso.cursor2 = "right";
						this.iso.direction2 ="r";
					}
					else{
						this.iso.cursor2 = "";
						this.iso.direction2 ="";
					}
				}
				else{
					this.iso.cursor2 = "";
					this.iso.direction2 ="";
				}
			}


			if(this.iso.cursorDown === true){

				if(this.iso.cursor1 == 'down'){
					this.iso.body.acceleration.x = (this.iso.body.velocity.x >= 0) ? 200 : 400;
					if(this.iso.cursor2 == 'left') this.iso.body.velocity.y = this.iso.body.velocity.x * 0.75;
					else if(this.iso.cursor2 == 'right') this.iso.body.velocity.y = this.iso.body.velocity.x * -0.75;
					else this.iso.body.velocity.y = 0;
				}
				else if(this.iso.cursor1 == 'up'){
					this.iso.body.acceleration.x = (this.iso.body.velocity.x <= 0) ? -200 : -400;
					if(this.iso.cursor2 == 'left') this.iso.body.velocity.y = this.iso.body.velocity.x * -0.75;
					else if(this.iso.cursor2 == 'right') this.iso.body.velocity.y = this.iso.body.velocity.x * 0.75;
					else this.iso.body.velocity.y = 0;
				}
				else if(this.iso.cursor1 == 'left'){
					this.iso.body.acceleration.y = (this.iso.body.velocity.y >= 0) ? 200 : 400;
					if(this.iso.cursor2 == 'up') this.iso.body.velocity.x = this.iso.body.velocity.y * -0.75;
					else if(this.iso.cursor2 == 'down') this.iso.body.velocity.x = this.iso.body.velocity.y * 0.75;
					else this.iso.body.velocity.x = 0;
				}
				else if(this.iso.cursor1 == 'right'){
					this.iso.body.acceleration.y = (this.iso.body.velocity.y <= 0) ? -200 : -400;
					if(this.iso.cursor2 == 'up') this.iso.body.velocity.x = this.iso.body.velocity.y * 0.75;
					else if(this.iso.cursor2 == 'down') this.iso.body.velocity.x = this.iso.body.velocity.y * -0.75;
					else this.iso.body.velocity.x = 0;
				}
			}
			else{

				if(this.iso.body.velocity.x > 0){
					this.iso.body.acceleration.x = -300;
				}
				if(this.iso.body.velocity.x < 0){
					this.iso.body.acceleration.x = 300;
				}
				if(this.iso.body.velocity.y > 0){
					this.iso.body.acceleration.y = -300;
				}
				if(this.iso.body.velocity.y < 0){
					this.iso.body.acceleration.y = 300;
				}
			}

			if( this.iso.cursorDown === false){

				if( this.iso.body.velocity.x < 50 && this.iso.body.velocity.x > -50){

					this.iso.body.velocity.x = 0;
					this.iso.body.acceleration.x = 0;
				}

				if( this.iso.body.velocity.y < 50 && this.iso.body.velocity.y > -50){

					this.iso.body.velocity.y = 0;
					this.iso.body.acceleration.y = 0;
				}
			}
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

		// Objects Collision
		game.physics.isoArcade.overlap(game.player.iso,groups.objects, function(obj1,obj2){

			if(obj2.key == 'player' || obj2.key == 'playerShadow'){
				return false;
			}
			else if(obj2.collidable){
				game.physics.isoArcade.collide(obj1,obj2);
			}
			else if(obj1.movement !== 'dead' && obj1.invulnerable == false){
				if(obj1.collide) obj1.collide(obj2);
				if(obj2.collide) obj2.collide(obj1);
			}
		});


		if(this.onFloor() && (this.iso.movement == 'jump' || this.iso.movement == 'sprung' ||
			 this.iso.movement == 'slam' || this.iso.movement == 'falling')
		){
			this.iso.movement = 'normal';
		}

		// Roll
		if(
			this.btn2Pressed && this.onFloor() && this.iso.movement == 'normal' && ( this.iso.body.velocity.x > 50 ||
			this.iso.body.velocity.x < -50 || this.iso.body.velocity.y > 50 || this.iso.body.velocity.y < -50)
		){

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

		// Jump
		if(this.btn1Pressed && this.onFloor() && (this.iso.movement == 'normal' || this.iso.movement == 'roll')){

			this.iso.movement = 'jump';
			this.iso.body.velocity.z = 250;
			this.btn1Pressed = false;
		}

		if(this.iso.movement == 'spring'){
			this.iso.movement = 'sprung';
			game.time.events.add(600,()=>{
				if(this.iso.movement == 'sprung') this.iso.movement = 'jump';
			})
			this.iso.body.velocity.z = 350;
		}

		// Homing attack
		if(this.btn1Pressed && !this.onFloor() && this.iso.movement != 'homing attack' && this.homingTarget){

			this.iso.movement = 'homing attack';
			this.iso.body.acceleration = { x:0, y:0, z:0 };
			this.iso.body.velocity = { x:0, y:0, z:0 };
			this.btn1Pressed = false;

			this.homingTargetPosition = {
				x: this.homingTarget.body.position.x,
				y: this.homingTarget.body.position.y,
				z: this.homingTarget.body.position.z+10,
				moveX: (this.homingTarget.body.position.x-this.iso.body.position.x)/20,
				moveY: (this.homingTarget.body.position.y-this.iso.body.position.y)/20,
				moveZ: ((this.homingTarget.body.position.z+20)-this.iso.body.position.z)/20,
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

		playAnimation(this.iso)

		this.detectHomingTargets();
		this.updateShadow();

		this.onSlope = false;

		// level.update(this.iso.body.position.x);
	}

	updateShadow(){

		var zz = 0;
		this.shadow.body.position.x = this.iso.body.position.x;
		this.shadow.body.position.y = this.iso.body.position.y;

		groups.water.forEach((obj)=>{

			if(
				this.shadow.body.position.x < obj.isoX + obj.body.widthX &&
				this.shadow.body.position.x-2 > obj.isoX - 22 &&
				this.shadow.body.position.y < obj.isoY + obj.body.widthY &&
				this.shadow.body.position.y-2 > obj.isoY - 22 &&
				this.iso.body.position.z > obj.isoZ
			){
				if(obj.isoZ + 4 > zz){
					zz = obj.isoZ + 4;
				}
			}
		});

		groups.walls.forEach((obj)=>{

			if(
				this.shadow.body.position.x < obj.isoX + obj.body.widthX &&
				this.shadow.body.position.x-2 > obj.isoX - 22 &&
				this.shadow.body.position.y < obj.isoY + obj.body.widthY &&
				this.shadow.body.position.y-2 > obj.isoY - 22 &&
				this.iso.body.position.z > obj.isoZ
			){

				if(obj.key == 'slope'){

					if(obj.direction == 'down'){
						var x = (obj.isoX - this.iso.body.position.x);
						var z = Math.floor(obj.isoZ + 37 + Math.min(0,(x / 44) * 31));
					}
					if(obj.direction == 'up'){
						var x = (obj.isoX - (this.iso.body.position.x+20)) * -1;
						var z = Math.floor(obj.isoZ + 10 + Math.min(28,(x / 44) * 31));
					}
					if(obj.direction == 'left'){
						var x = (obj.isoY - this.iso.body.position.y);
						var z = Math.floor(obj.isoZ + 37 + Math.min(0,(x / 44) * 31));
					}
					if(obj.direction == 'right'){
						var x = (obj.isoY - (this.iso.body.position.y+20)) * -1;
						var z = Math.floor(obj.isoZ + 10 + Math.min(28,(x / 44) * 31));
					}

					if(z > zz){
						zz = z;
					}
				}
				else if(obj.key == 'wall' && obj.isoZ + 31 > zz){
					zz = obj.isoZ + 31;
				}
			}
		})

		if(zz <= this.iso.body.position.z){
			this.shadow.body.position.z = zz;
		}
		else{
			this.shadow.body.position.z = this.iso.body.position.z;
		}

	}

	onFloor(){

		return (this.iso.body.onFloor() || this.iso.body.touching.up || this.onSlope) ? true : false;
	}

	// ================
	//  HOMING TARGETS
	// ================

	detectHomingTargets(){

		if(!this.onFloor() && this.iso.movement !== 'homing attack' && this.iso.movement !== 'dead'){

			this.homingTarget = false;
			var targets = [];

			// Find targets in range
			groups.objects.forEach((object)=>{

				if(object.targetable && object.visible){

					var distance = {
						x: Math.abs(parseInt(object.body.position.x - this.iso.body.position.x)),
						y: Math.abs(parseInt(object.body.position.y - this.iso.body.position.y)),
						z: parseInt(object.body.position.z - this.iso.body.position.z)
					}

					if(distance.x + distance.y < 100 && distance.z < -10){
						targets.push({
							object: object,
							distance: distance
						})
					}
				}
			});

			// Find closet target
			targets.forEach((obj)=>{

				if(!this.homingTarget){
					this.homingTarget = obj.object;
				}
				else{
					var currentTargetDistance = Math.abs(parseInt(this.homingTarget.body.position.x - this.iso.body.position.x)) + Math.abs(parseInt(this.homingTarget.body.position.y - this.iso.body.position.y));

					if(obj.distance.x + obj.distance.y < currentTargetDistance){
						this.homingTarget = obj.object;
					}
				}
			});

			if(this.homingTarget){
				//this.homingTarget.tint = 0x86bfda;
				this.crosshair.iso.visible = true;
				this.crosshair.iso.isoX = this.homingTarget.body.position.x;
				this.crosshair.iso.isoY = this.homingTarget.body.position.y;
				this.crosshair.iso.isoZ = this.homingTarget.body.position.z;
			}
			else{
				this.crosshair.iso.visible = false;
			}
		}
		else{
			this.crosshair.iso.visible = false;
		}
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

				obj.die();

				if(this.iso.movement == 'jump' || this.iso.movement == 'homing attack' || this.iso.movement == 'slam'){
					this.iso.body.velocity.z = 250;
					this.iso.movement = 'jump';
				}
			}
			else{
				this.hurt();
			}
		}
		else if(obj.key == 'spring' && (this.iso.movement == 'normal' || this.iso.movement == 'jump' || this.iso.movement == 'sprung' || this.iso.movement == 'roll')){
			this.iso.movement = 'spring';
		}
		else if(obj.key == 'water' && this.iso.movement != "drowning" && isWithin(this.iso, obj, 5)){
			this.iso.movement = "drowning";
			this.iso.body.acceleration.x = 0;
			this.iso.body.acceleration.y = 0;
			this.iso.body.velocity.x = 0 //this.iso.body.velocity.x/2;
			this.iso.body.velocity.y = 0 //this.iso.body.velocity.y/2;
			this.iso.body.velocity.z = 0;

			game.time.events.add(2000, () => {
				game.state.restart();
			})
		}
		else if(obj.key == 'wall'){

			this.iso.movement = "bounced";

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

			game.time.events.add(800,()=>{
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

			if(zz >= this.iso.body.position.z - 5){
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

				game.time.events.add(450,()=>{

					this.iso.body.velocity.x = 0;
					this.iso.body.velocity.y = 0;
				});

				game.time.events.add(900,()=>{

					this.iso.movement = 'normal';
					this.iso.invulnerable = false;
					this.iso.hurtDIR = null;
				});
			}
		}
	}
}
