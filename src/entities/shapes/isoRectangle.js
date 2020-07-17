function isoRectangeSprite(width, height) {
  var mask = game.add.graphics(0, -6)

  var point1 = game.iso.project({ x: 0, y: 0, z: 0})
  var point2 = game.iso.project({ x: width, y: 0, z: 0})
  var point3 = game.iso.project({ x: width, y: height, z: 0})
  var point4 = game.iso.project({ x: 0, y: height, z: 0})

  var polygon = new Phaser.Polygon([
      point1.x, point1.y,
      point2.x, point2.y,
      point3.x, point3.y,
      point4.x, point4.y,
  ])

  mask.beginFill(0x000000)
  mask.drawPolygon(polygon.points)
  mask.endFill()
  mask.visible = false

  return mask.generateTexture()
}