function gamePhysics() {
  game.time.advancedTiming = true

  // Add and enable the plug-in.
  game.plugins.add(new Phaser.Plugin.Isometric(game))

  // Start the IsoArcade physics system.
  game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE)

  // Set the global gravity for IsoArcade.
  game.physics.isoArcade.gravity.setTo(0, 0, -600)

  // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
  // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
  game.iso.anchor.setTo(0.5,0.2)
}