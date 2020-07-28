class Game extends Phaser.Game {
  constructor() {
    super(400, 240, Phaser.AUTO, "game", null, true, false);

    this.save = new SaveData();

    this.state.add("GameState", GameState, false);
    this.state.add("TitleState", TitleState, false);
    this.state.add("OverworldState", OverworldState, false);
    this.state.add("EndingState", EndingState, false);

    this.state.start("GameState");
  }
}
