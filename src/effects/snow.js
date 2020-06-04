class Snow {
  constructor() {
    this.snow = game.add.tileSprite(0, 0, 400, 240, "snow", 0, groups.ui)

    this.snow.fixedToCamera = true

    this.snow.update = this.update.bind(this)
  }

  getSnowSpeed(v) {
    return (v / MAX_VELOCITY) * 2
  }

  update() {
    var { x, y, z } = player.iso.body.velocity

    // if (x > 0) {
    //   this.snow.tilePosition.x -= this.getSnowSpeed(x)
    // }
    // else if (x < 0) {
    //   this.snow.tilePosition.x -= this.getSnowSpeed(x)
    //   this.snow.tilePosition.y -= this.getSnowSpeed(x) / 2
    // }
    
    // if (y > 0) {
    //   this.snow.tilePosition.y -= this.getSnowSpeed(x)
    // }
    // else if (y < 0) {
    //   this.snow.tilePosition.y -= this.getSnowSpeed(y)
    //   this.snow.tilePosition.x -= this.getSnowSpeed(y) / 2
    // }

    if (x < 0) {
      this.snow.tilePosition.y -= this.getSnowSpeed(x)
    }
    
    if (y < 0) {
      this.snow.tilePosition.y -= this.getSnowSpeed(y)
    }

    this.snow.tilePosition.x -= 1
    this.snow.tilePosition.y += 1.5


    // var zSpeed = this.getSnowSpeed(z) + 1
    // console.log(zSpeed)
  }
}