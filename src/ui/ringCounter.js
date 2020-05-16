var no1 = document.getElementById("no1");
var no2 = document.getElementById("no2");
var no3 = document.getElementById("no3");

class RingCounter {
  count = 0

  constructor() {
    this.updateUI()
  }

  add(number = 1) {
    this.count += number
    this.updateUI()
  }

  reset() {
    this.count = 0
    this.updateUI()
  }

  updateUI() {
    var digits = String(this.count).split("");

    no1.style.opacity = digits.length >= 3 ? "1" : "0";
    no2.style.opacity = digits.length >= 2 ? "1" : "0";
    no3.style.opacity = digits.length >= 1 ? "1" : "0";

    if (digits.length === 1) {
      console.log()
      no3.style.backgroundPosition = "-" + (digits[0] * 8) + "px";
    }
    else if (digits.length === 2) {      
      no2.style.backgroundPosition = "-" + (digits[0] * 8) + "px";
      no3.style.backgroundPosition = "-" + (digits[1] * 8) + "px";
    }
    else if (digits.length === 3) {
      no1.style.backgroundPosition = "-" + (digits[0] * 8) + "px";
      no2.style.backgroundPosition = "-" + (digits[1] * 8) + "px";
      no3.style.backgroundPosition = "-" + (digits[2] * 8) + "px";
    }
  }
}
