function preloadGameAssets() {

  game.load.spritesheet('sonic', 'assets/characters/sonic.png',48,42);

  game.load.image('playerShadow', 'assets/entities/playerShadow.png');
  game.load.image('shadow-w18', 'assets/entities/shadow-w18.png');
  game.load.image('shadow-w26', 'assets/entities/shadow-w26.png');
  game.load.image('shadow-w32', 'assets/entities/shadow-w32.png');
  game.load.image('shadow-w40', 'assets/entities/shadow-w40.png');

  //  UI
  // -----------

  game.load.spritesheet('points', 'assets/points.png',10,12);
  game.load.image('score', 'assets/score.png');

  //  Badniks
  // -----------
  game.load.spritesheet('bee', 'assets/entities/badniks/bee.png',36,40);
  game.load.spritesheet('gyro', 'assets/entities/badniks/gyro.png',36,42);
  game.load.spritesheet('spider', 'assets/entities/badniks/spider.png',56,48);

  //  Objects
  // -----------
  game.load.spritesheet('bridge', 'assets/entities/objects/bridge.png',94,53);
  game.load.spritesheet('ring', 'assets/entities/ring.png',16,16);
  game.load.spritesheet('spikes', 'assets/entities/objects/spikes.png',8,76);
  game.load.image('spikesBase', 'assets/entities/objects/spikes-base.png');
  game.load.spritesheet('spikeGate', 'assets/entities/objects/spike-gate.png', 40, 75);
  game.load.spritesheet('spikeGateShadow', 'assets/entities/objects/spike-gate-shadow.png', 170, 85);
  game.load.spritesheet('spikeGateBar', 'assets/entities/objects/spike-gate-bar.png', 133, 100);
  game.load.spritesheet('spikeball', 'assets/entities/spikeball.png',30,26);
  game.load.spritesheet('spring', 'assets/entities/spring.png',68,58);  

  //  Effects
  // -----------
  game.load.image('crosshair', 'assets/effects/crosshair.png');
  game.load.spritesheet('dust', 'assets/effects/dust.png',16,16);
  game.load.spritesheet('explosion', 'assets/effects/explosion.png',50,50);
  game.load.spritesheet('splash', 'assets/effects/splash.png',33,32);

  //  Tiles 
  // ---------
  game.load.spritesheet('tiles', 'assets/tiles/tiles.png',80,70);
  game.load.spritesheet('walls', 'assets/tiles/walls.png',80,220);
  game.load.spritesheet('waterfall', 'assets/tiles/waterfall.png',41,199);
  game.load.image("tree", "assets/tiles/tree.png")

  //  Maps
  // -----------
  game.load.json("map", "assets/maps/test.json")
}