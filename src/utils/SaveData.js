class SaveData {
  constructor() {
    var data = localStorage.getItem("saveData")

    if (data === null) {
      this.data = {
        level: "WildWoodland",
        lives: 3,
      }
    } else {
      this.data = JSON.parse(data)
    }
  }

  store() {
    localStorage.setItem("saveData", JSON.stringify(this.data))
  }

  clear() {
    localStorage.removeItem("saveData")
  }
}