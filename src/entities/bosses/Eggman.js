
function Eggman(x, y, z) {
  var iso = game.add.isoSprite(x, y, z + 55, "eggman", 5, groups.objects)

  enablePhysics(iso)
  groups.collide.push(iso)

  iso.animations.add("move-u", [0, 1, 2, 3], 12, true)
  iso.animations.add("move-l", [4, 5, 6, 7], 12, true)
  iso.animations.add("move-r", [11, 10, 9, 8], 12, true)
  iso.animations.add("move-d", [15, 14, 13, 12], 12, true)
  iso.animations.add("hurt-u", [20, 21], 12, true)
  iso.animations.add("hurt-r", [22, 23], 12, true)
  iso.animations.add("hurt-l", [24, 25], 12, true)
  iso.animations.add("hurt-d", [26, 27], 12, true)

  iso.shadow = game.add.isoSprite(x, y, z, "eggman", 16, groups.objects)
  iso.shadow.pivot.y = -14

  new Shadow(iso.shadow, iso, false)

  return iso
}