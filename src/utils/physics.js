function enablePhysics(iso) {
  game.physics.isoArcade.enable(iso)
  iso.anchor.set(0.5)
  iso.body.allowGravity = false
  iso.body.immovable = true
}