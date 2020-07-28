function renderObjects(layer) {
  var z = layer.offsety ? layer.offsety * -1 : 0

  layer.objects.forEach((obj) => {
    if (obj.name) {
      // Fix iso vs tiled rendering issue
      var x = (obj.x / 40) * 44;
      var y = (obj.y / 40) * 44;
      var wx = (obj.width / 40) * 44;
      var wy = (obj.height / 40) * 44;

      if (!window[obj.name]) {
        console.warn("No object named " + obj.name)
      }

      var newObject = new window[obj.name](wx, wy, x, y, z, obj);

      if (newObject.renderInView) {
        groups.renderInView.push(newObject)
      }
    }
  });
}

function renderObjectsInView() {

  groups.renderInView.forEach((obj) => {
    if (obj.active) {
      var distance = game.physics.isoArcade.distanceToXY(player.iso.body, obj.props.x, obj.props.y)

      if (distance <= RENDER_DISTANCE && !obj.visible) {
        obj.renderInView()
      }

      if (distance > RENDER_DISTANCE && obj.visible) {
        obj.hideInView()
      }
    }
  })

  game.time.events.add(Phaser.Timer.SECOND * 1, () => renderObjectsInView());
}