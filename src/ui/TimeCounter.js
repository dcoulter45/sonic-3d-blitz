var oneHour = 1000 * 60 * 60

class TimeCounter {
  
  stopped = false

  constructor() {
    this.timer = game.time.create(false)
    this.timer.loop(oneHour);

    if (stateParams.duration !== null) {
      this.timer.add(stateParams.duration)
    }

    this.timer.start()

    this.no1 = game.add.sprite(46, 19, "numbers", 0, groups.ui)
    this.no2 = game.add.sprite(54, 19, "numbers", 0, groups.ui)
    this.no3 = game.add.sprite(66, 19, "numbers", 0, groups.ui)
    this.no4 = game.add.sprite(74, 19, "numbers", 0, groups.ui)

    this.no1.alpha = 0

    this.no1.fixedToCamera = true
    this.no2.fixedToCamera = true
    this.no3.fixedToCamera = true
    this.no4.fixedToCamera = true
  }

  stop() {
    this.stopped = true
  }

  update() {
    if (!this.stopped) {
      stateParams.duration = this.timer.duration

      var date = new Date(oneHour - this.timer.duration)
      var seconds = date.getSeconds()
      var minutes =  date.getMinutes()

      if (minutes > 0) {
        var digits = minutes > 9 ? Array.from(String(minutes), Number) : [0, minutes]

        if (minutes > 9) {
          this.no1.alpha = 1
        }

        this.no1.loadTexture("numbers", digits[0])
        this.no2.loadTexture("numbers", digits[1])
      }
      
      var digits = seconds > 9 ? Array.from(String(seconds), Number) : [0, seconds]
        
      this.no3.loadTexture("numbers", digits[0])
      this.no4.loadTexture("numbers", digits[1])
    }
  }
}