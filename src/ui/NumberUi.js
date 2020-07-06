class NumberUi {
  constructor(x, y) {
    this.no1 = game.add.sprite(x, y, "numbers", 0, groups.ui)
    this.no1.fixedToCamera = true

    this.no2 = game.add.sprite(x + 8, y, "numbers", 0, groups.ui)
    this.no2.fixedToCamera = true
    
    this.no3 = game.add.sprite(x + 16, y, "numbers", 0, groups.ui)
    this.no3.fixedToCamera = true
  }

  updateTo(number, callback) {
    var repeats = Math.ceil(number / 3)
    var i = 0

    game.time.events.repeat(10, repeats, () => {
      i += 3

      if (i < number) {
        this.update(i)
      }
      else if (i >= number) {
        this.update(number)

        if (callback) callback()
      }
    })
  }

  update(number) {
    var digits = String(number).split("");

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