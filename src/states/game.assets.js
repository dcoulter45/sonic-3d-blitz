function preloadGameAssets() {

  game.load.spritesheet("sonic", "assets/characters/sonic.png",48,42);

  game.load.image("playerShadow", "assets/entities/playerShadow.png");
  game.load.image("shadow-w18", "assets/entities/shadow-w18.png");
  game.load.image("shadow-w26", "assets/entities/shadow-w26.png");
  game.load.image("shadow-w32", "assets/entities/shadow-w32.png");
  game.load.image("shadow-w40", "assets/entities/shadow-w40.png");

  //  UI
  // -----------
  game.load.spritesheet("points", "assets/points.png", 10, 12)
  game.load.image("act1", "assets/title-card/act1.png")
  game.load.spritesheet("levelCompleteText", "assets/ui/level-complete-text.png",179,38)
  game.load.image("titleCardBg", "assets/title-card/title-card-bg.png")
  game.load.spritesheet("titleCardBorder", "assets/title-card/title-card-border.png", 106, 240)
  game.load.spritesheet("titleCardLevels", "assets/title-card/title-card-levels.png", 260, 64)
  game.load.image("blueSky", "assets/backgrounds/blue-sky.png")
  game.load.image("sandSky", "assets/backgrounds/sand-sky.png")
  game.load.image("gameOver", "assets/ui/game-over.png")
  game.load.spritesheet("lives", "assets/ui/lives.png", 56, 20)
  game.load.spritesheet("livesNumbers", "assets/ui/lives-numbers.png", 7, 7)
  game.load.image("hudText", "assets/ui/hud-text.png")
  game.load.spritesheet("numbers", "assets/ui/numbers.png", 8, 12)

  //  Badniks
  // -----------
  game.load.spritesheet("bat", "assets/entities/badniks/bat.png",50,50);
  game.load.spritesheet("bee", "assets/entities/badniks/bee.png",36,40);
  game.load.spritesheet("gyro", "assets/entities/badniks/gyro.png",36,42);
  game.load.spritesheet("scorpion", "assets/entities/badniks/scorpion.png",48,50)
  game.load.spritesheet("snake", "assets/entities/badniks/snake.png",26,32);
  game.load.spritesheet("snowman", "assets/entities/badniks/snowman.png",36,54)
  game.load.spritesheet("spider", "assets/entities/badniks/spider.png",56,48);

  //  Objects
  // -----------
  game.load.spritesheet("bridge", "assets/entities/objects/bridge.png",94,53);
  game.load.spritesheet("checkpoint", "assets/entities/checkpoint.png",25,70)
  game.load.spritesheet("goalPost", "assets/entities/goal-post.png",54,68)
  game.load.spritesheet("raft", "assets/entities/objects/raft.png", 144, 78);
  game.load.spritesheet("ring", "assets/entities/ring.png",16,16);
  game.load.spritesheet("spikes", "assets/entities/objects/spikes.png",8,76);
  game.load.image("spikesBase", "assets/entities/objects/spikes-base.png");
  game.load.spritesheet("spikeGate", "assets/entities/objects/spike-gate.png", 40, 75);
  game.load.spritesheet("spikeGateShadow", "assets/entities/objects/spike-gate-shadow.png", 170, 85);
  game.load.spritesheet("spikeGateBar", "assets/entities/objects/spike-gate-bar.png", 133, 100);
  game.load.spritesheet("spikeWall", "assets/entities/objects/spike-wall.png",84,130)
  game.load.spritesheet("spikeball", "assets/entities/objects/spikeball.png",40,46);
  game.load.spritesheet("spring", "assets/entities/spring.png",68,58);
  game.load.spritesheet("lavaPlume", "assets/entities/lava-plume.png",110,138);

  //  Effects
  // -----------
  game.load.image("crosshair", "assets/effects/crosshair.png");
  game.load.spritesheet("dust", "assets/effects/dust.png",16,16);
  game.load.spritesheet("explosion", "assets/effects/explosion.png",50,50);
  game.load.spritesheet("splash", "assets/effects/splash.png",33,65);
  game.load.image("snow", "assets/effects/snow.png")

  //  Tiles 
  // ---------
  game.load.spritesheet("cactus", "assets/tiles/cactus.png",54,76)
  game.load.spritesheet("rocks", "assets/tiles/rocks.png",66,77);
  game.load.spritesheet("torch", "assets/tiles/torch.png",18,42);
  game.load.image("palmTree", "assets/tiles/palm-tree.png");
  game.load.image("pineTree", "assets/tiles/pine-tree.png")
  game.load.spritesheet("tiles", "assets/tiles/tiles.png",80,70);
  game.load.spritesheet("walls", "assets/tiles/walls.png",80,220);
  game.load.spritesheet("waterfall", "assets/tiles/waterfall.png",41,199);
  game.load.spritesheet("lavaBubble", "assets/tiles/lava-bubble.png",30,33);
  game.load.image("crystal", "assets/tiles/crystal.png")
  game.load.image("tree", "assets/tiles/tree.png")

  //  Maps
  // -----------
  game.load.json("test", "assets/maps/test.json")
  game.load.json("WildWoodland-Block1", "assets/maps/WildWoodland-Block1.json")
  game.load.json("WildWoodland-Block2", "assets/maps/WildWoodland-Block2.json")
  game.load.json("WildWoodland-Block3", "assets/maps/WildWoodland-Block3.json")
  game.load.json("WildWoodland-Block4", "assets/maps/WildWoodland-Block4.json")

  game.load.json("HotHollow-Block1", "assets/maps/HotHollow-Block1.json")
  game.load.json("HotHollow-Block2", "assets/maps/HotHollow-Block2.json")
  game.load.json("HotHollow-Block3", "assets/maps/HotHollow-Block3.json")

  game.load.json("SearingSands-Block1", "assets/maps/SearingSands-Block1.json")

  game.load.json("PolarParadise-Block1", "assets/maps/PolarParadise-Block1.json")
}