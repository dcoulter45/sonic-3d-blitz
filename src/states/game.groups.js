var groups = {}

function createGameGroups() {
  groups.tiles = game.add.group()
  groups.objects = game.add.group()
  groups.walls = game.add.group()
  groups.slopes = game.add.group()
  groups.water = game.add.group()
  groups.border = game.add.group()
}
