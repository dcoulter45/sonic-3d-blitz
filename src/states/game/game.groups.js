function createGameGroups() {
  groups.backdrop = game.add.group()
  groups.tiles = game.add.group()
  groups.objects = game.add.group()
  groups.walls = game.add.group()
  groups.ui = game.add.group()

  groups.targets = []
  groups.collide = []
  groups.overlap = []
  groups.renderInView = []
}

function removeFromGroup(group, obj) {
  var index = group.indexOf(obj)
  group.splice(index, 1)
}