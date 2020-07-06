class OverworldState extends Phaser.State {
  preload() {
    game.load.image("southIsland", "assets/ui/south-island.png")
    game.load.image("sonicCursor", "assets/ui/sonic-cursor.png")

    this.markers = [
      { x: 166, y: 306 },
      { x: 282, y: 270 },
      { x: 352, y: 153 },
      { x: 504, y: 250 },
      { x: 611, y: 189 },
      { x: 701, y: 60 },
    ]
  }

  create() {
    game.add.sprite(0, 0, "southIsland")

    var currentLevel = game.save.data.level || 0
    var nextLevel = game.save.data.level + 1

    var { x, y } = levels[currentLevel].marker

    this.cursor = game.add.sprite(x, y, "sonicCursor")

    game.physics.startSystem(Phaser.Physics.P2JS)
    game.world.setBounds(0, 0, 781, 392)
    game.camera.follow(this.cursor)

    game.add.tween(this.cursor).to(levels[nextLevel].marker, 2000, "Linear", true)
    
    game.time.events.add(2500, () => {
      this.loadLevel(nextLevel)
    })
  }

  loadLevel(nextLevel) {

    game.save.data.level = nextLevel
    game.save.store()

    stateParams.activeLevel = levels[nextLevel].name + "-Act1"
    stateParams.respawnPoint = null
    stateParams.duration = null

    game.camera.fade("rgba(0,0,0,1)", 1000)

    game.time.events.add(1000, () => {
      game.state.start("GameState")
    })
  }
}