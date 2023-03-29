export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }
    preload() {
    }
    create() {
        this.text1 = this.add.text(this.game.config.width/3, this.game.config.height/2, 'Demo end 🦆', { font: "74px Arial Black", fill: "#fff" });
    }
    update() { }
}