class RingCounter {
  count = 0

  constructor() {
    this.text = game.add.sprite(5, 5, "hudText", 0, groups.ui)
    this.text.fixedToCamera = true

    this.no1 = game.add.sprite(58, 5, "numbers", 0, groups.ui)
    this.no1.fixedToCamera = true

    this.no2 = game.add.sprite(66, 5, "numbers", 0, groups.ui)
    this.no2.fixedToCamera = true
    
    this.no3 = game.add.sprite(74, 5, "numbers", 0, groups.ui)
    this.no3.fixedToCamera = true

    this.updateUI()
  }

  add(number = 1) {
    this.count += number

    if (this.count === 100) {
      game.lives.addLife()
    }

    this.updateUI()
  }

  reset() {
    this.count = 0
    this.updateUI()
  }

  updateUI() {
    var digits = String(this.count).split("");

    this.no1.alpha = digits.length >= 3 ? 1 : 0;
    this.no2.alpha = digits.length >= 2 ? 1 : 0;

    if (digits.length === 1) {
      this.no3.loadTexture("numbers", parseInt(digits[0]))
    }
    else if (digits.length === 2) {      
      this.no3.loadTexture("numbers", parseInt(digits[1]))
      this.no2.loadTexture("numbers", parseInt(digits[0]))
    }
    else if (digits.length === 3) {
      this.no3.loadTexture("numbers", parseInt(digits[2]))
      this.no2.loadTexture("numbers", parseInt(digits[1]))
      this.no1.loadTexture("numbers", parseInt(digits[0]))
    }
  }
}
