function loadTitleCardAssets() {
  game.load.image("titleCardBg", "assets/title-card/title-card-bg.png")
  game.load.spritesheet("titleCardBorder", "assets/title-card/title-card-border.png", 106, 240)
  game.load.spritesheet("titleCardLevels", "assets/title-card/title-card-levels.png", 260, 64)
}

function loadGameAssets() {
  var levelName = levels[game.save.data.level].name + "-Act1"

  game.load.spritesheet("sonic", "assets/characters/sonic.png",48,42);

  game.load.spritesheet("eggman", "assets/characters/eggman.png",100,70);

  game.load.image("playerShadow", "assets/entities/playerShadow.png");

  //  UI
  // -----------
  game.load.spritesheet("levelCompleteSonic", "assets/ui/level-complete-sonic.png",88,44)
  game.load.image("levelCompleteText", "assets/ui/level-complete-text.png")
  game.load.spritesheet("levelCompleteUi", "assets/ui/level-complete-ui.png",94,18)
  game.load.image("blueSky", "assets/backgrounds/blue-sky.png")
  game.load.image("sandSky", "assets/backgrounds/sand-sky.png")
  game.load.image("space", "assets/backgrounds/space.png")
  game.load.image("gameOver", "assets/ui/game-over.png")
  game.load.spritesheet("lives", "assets/ui/lives.png", 56, 20)
  game.load.spritesheet("livesNumbers", "assets/ui/lives-numbers.png", 8, 8)
  game.load.image("hudText", "assets/ui/hud-text.png")
  game.load.spritesheet("numbers", "assets/ui/numbers.png", 9, 14)
  game.load.spritesheet("font1", "assets/ui/font1.png", 18, 26)
  game.load.spritesheet("tutorialKeys", "assets/ui/tutorial-keys.png", 30, 22)

  //  Badniks
  // -----------
  game.load.spritesheet("bat", "assets/entities/badniks/bat.png",50,50);
  game.load.spritesheet("bee", "assets/entities/badniks/bee.png",36,40);
  game.load.image("bullet", "assets/entities/badniks/bullet.png")
  game.load.spritesheet("dragonfly", "assets/entities/badniks/dragonfly.png",48,46)
  game.load.spritesheet("gyro", "assets/entities/badniks/gyro.png",36,42);
  game.load.spritesheet("scorpion", "assets/entities/badniks/scorpion.png",48,50)
  game.load.spritesheet("snake", "assets/entities/badniks/snake.png",26,32);
  game.load.spritesheet("snowman", "assets/entities/badniks/snowman.png",36,54)
  game.load.spritesheet("spider", "assets/entities/badniks/spider.png",56,48);

  //  Objects
  // -----------
  game.load.spritesheet("bridge", "assets/entities/objects/bridge.png",94,53);
  game.load.spritesheet("bomb", "assets/entities/objects/bomb.png",16,32)
  game.load.spritesheet("checkpoint", "assets/entities/checkpoint.png",25,70)
  game.load.spritesheet("fireball", "assets/entities/objects/fireball.png", 64,65)
  game.load.spritesheet("goalPost", "assets/entities/goal-post.png",54,68)
  game.load.spritesheet("raft", "assets/entities/objects/raft.png", 152, 83)
  game.load.spritesheet("rings", "assets/entities/rings.png",16,16)
  game.load.spritesheet("monitors", "assets/entities/monitors.png",40,49)
  game.load.spritesheet("ice", "assets/entities/objects/ice.png",80,85)
  game.load.spritesheet("iceFragment", "assets/entities/objects/ice-fragment.png",14,12)
  game.load.spritesheet("spikes", "assets/entities/objects/spikes.png",8,76);
  game.load.spritesheet("spikesFlat", "assets/entities/objects/spikes-flat.png",55,47);
  game.load.image("spikesBase", "assets/entities/objects/spikes-base.png");
  game.load.spritesheet("spikeGate", "assets/entities/objects/spike-gate.png", 40, 75);
  game.load.spritesheet("spikeGateShadow", "assets/entities/objects/spike-gate-shadow.png", 170, 85);
  game.load.spritesheet("spikeGateBar", "assets/entities/objects/spike-gate-bar.png", 133, 100);
  game.load.spritesheet("spikeWall", "assets/entities/objects/spike-wall.png",84,130)
  game.load.spritesheet("spikeball", "assets/entities/objects/spikeball.png",40,38);
  game.load.spritesheet("spring", "assets/entities/spring.png",68,58);
  game.load.spritesheet("lavaPlume", "assets/entities/lava-plume.png",110,138);

  //  Effects
  // -----------
  game.load.image("crosshair", "assets/effects/crosshair.png");
  game.load.spritesheet("dust", "assets/effects/dust.png",16,16);
  game.load.spritesheet("flameDash", "assets/effects/flame-dash.png",60,56)
  game.load.spritesheet("explosion", "assets/effects/explosion.png",50,50);
  game.load.spritesheet("explosionLarge", "assets/effects/explosion-large.png",105,81);
  game.load.spritesheet("splash", "assets/effects/splash.png",33,65);
  game.load.spritesheet("shields", "assets/effects/shields.png",48,48)
  game.load.image("snow", "assets/effects/snow.png")

  //  Tiles 
  // ---------
  game.load.spritesheet("cactus", "assets/tiles/cactus.png",54,76)
  game.load.spritesheet("rocks", "assets/tiles/rocks.png",66,77);
  game.load.spritesheet("torch", "assets/tiles/torch.png",18,42);
  game.load.image("palmTree", "assets/tiles/palm-tree.png");
  game.load.image("pineTree", "assets/tiles/pine-tree.png")
  game.load.spritesheet("tiles", "assets/tiles/tileset.png",80,70);
  game.load.spritesheet("lavaBubble", "assets/tiles/lava-bubble.png",30,33);
  game.load.image("crystal", "assets/tiles/crystal.png")
  game.load.image("tree", "assets/tiles/tree.png")

  //  Map
  // -------
  game.load.json(levelName, "assets/maps/" + levelName + ".json")
}