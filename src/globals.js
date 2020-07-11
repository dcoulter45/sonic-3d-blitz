var player
var stateParams = {
  displayTitle: true,
  respawnPoint: null,
  duration: null,
}
var level = null
var currentTrack = ""
var muteGame = true
var drawObjectBoxes = false
var drawWallBoxes = false
var groups = {}
var activeMarker = null
var markers = []

var levels = [
  {
    name: "SunriseShore",
    music: "PalmTreePanicGoodFuture",
    marker: { x: 166, y: 306 },
    timeBonus: 75,
  },
  {
    name: "SearingSands",
    music: "CollisionChaosPresent",
    marker: { x: 282, y: 270 },
    timeBonus: 180,
  },
  {
    name: "PolarParadise",
    music: "DiamondDustAct2",
    marker: { x: 352, y: 153 },
    timeBonus: 180,
  },
  {
    name: "WildWoodland",
    music: "GreenGroveAct2",
    marker: { x: 504, y: 250 },
    timeBonus: 180,
  },
  {
    name: "HotHollow",
    music: "VolcanoValleyAct2",
    marker: { x: 611, y: 189 },
    timeBonus: 180,
  },
  {
    name: "DeathEgg",
    music: "PanicPuppetAct2",
    marker: { x: 701, y: 60 },
  }
]