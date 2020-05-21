var groups = {}

function createGameGroups() {
  groups.backdrop = game.add.group()
  groups.tiles = game.add.group()
  groups.objects = game.add.group()
  groups.walls = game.add.group()
  groups.water = game.add.group()
  groups.border = game.add.group()
  groups.ui = game.add.group()

  groups.collide = []
  groups.overlap = []
}
