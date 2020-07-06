function playDistantSound(iso, sound) {
  // var isoDistance = getDistanceBetween(player.iso, iso)

  // if (isoDistance < distance) {
  //   var volume = (isoDistance / distance)

  //   var aud = sound.play(null, 0, 1, true)
  //   // return loop ? sound.loopFull(volume) : sound.play()
  // }

  // return null

  var distance = game.physics.isoArcade.distanceToXY(player.iso.body, iso.body.x, iso.body.y)

  if (distance < 200) {
    sound.play()
  }
}
