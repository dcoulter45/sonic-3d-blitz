function playDistantSound(iso, sound, loop = false, distance = 240) {
  var isoDistance = getDistanceBetween(player.iso, iso)

  if (isoDistance < distance) {
    var volume = (isoDistance / distance)

    var aud = sound.play(null, 0, 1, true)
    console.log(aud)
    // return loop ? sound.loopFull(volume) : sound.play()
  }

  return null
}