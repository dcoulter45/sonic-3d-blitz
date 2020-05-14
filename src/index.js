class Game extends Phaser.Game {

	constructor() {

		super(400, 240, Phaser.AUTO, 'game', null, true, false);

		this.state.add('GameState', GameState, false);

		this.state.start('GameState');
	}
}