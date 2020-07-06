Spring = class Spring {

  constructor(wx, wy, x, y, z, obj) {

		this.iso = game.add.isoSprite(x, y, z, 'spring', 0, groups.objects);

    enablePhysics(this.iso)
    groups.overlap.push(this.iso)

    this.iso.animations.add('spring',[2,3,3,3,2,1,0],10,false);

    this.iso.body.widthX = TILE_WIDTH
    this.iso.body.widthY = TILE_WIDTH
    this.iso.body.height = 10
    
    this.iso.collide = this.collide.bind(this);
  }

  collide(obj) {
    if (obj.key === "player" && PLAYER_CONTROLLED_STATES.includes(obj.movement)) {
      this.iso.animations.play("spring");
      player.iso.movement = "spring"
      Sounds.Spring.play()
    }
  }
}
