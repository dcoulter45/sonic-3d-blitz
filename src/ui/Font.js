var fonts = [
  {
    sprite: "font1",
    sizing: [11, 11, 11, 11, 11, 11, 11, 11, 5, 10, 12, 11, 17, 11, 15, 11, 15, 11, 11, 11, 11, 11, 17, 15, 11, 11],
    space: 10,
  }
]

class Font {
  letters = []
  letterSpacing = 1

  constructor(x, y, text) {

    text = text.toLowerCase()
    var font = fonts[0]
    
    for (var i = 0; i < text.length; i++) {
      var charCode = text.charCodeAt(i) - 97

      if (charCode >= 0) {
        var letter = game.add.sprite(x, y, "font1", charCode, groups.ui)
        x += font.sizing[charCode] + this.letterSpacing
        letter.fixedToCamera = true

        this.letters.push(letter)
      } else {
        x += font.space
      }
    }
  }

  destroy() {
    this.letters.forEach((letter) => {
      letter.destroy()
    })
  }
}