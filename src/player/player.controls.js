function createCursors(player) {
  player.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  player.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
  player.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
  player.cursors = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR
  ]);

  player.space.onDown.add(()=> player.btn1Pressed = true );
  player.space.onUp.add(()=> player.btn1Pressed = false );
  player.a.onDown.add(()=> player.btn1Pressed = true );
  player.a.onUp.add(()=> player.btn1Pressed = false );
  player.s.onDown.add(()=> player.btn2Pressed = true );
  player.s.onUp.add(()=> player.btn2Pressed = false );
}