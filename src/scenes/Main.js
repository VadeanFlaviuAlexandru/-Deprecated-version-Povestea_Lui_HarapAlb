import controls from "../assets/Main/Buttons/controls.png";
import exit from "../assets/Main/Buttons/exit.png";
import newgame from "../assets/Main/Buttons/newgame.png";
import start from "../assets/Main/Buttons/start.png";
import background from "../assets/Main/background.jpg";
import { Align } from "../utilities/Align.js";

export class Main extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {
    this.load.image("controls", controls);
    this.load.image("exit", exit);
    this.load.image("newgame", newgame);
    this.load.image("start", start);
    this.load.image("background", background);
  }
  create() {
    this.Background = this.add.image(10, 10, "background");
    Align.ScaleToGameW(this.game, this.Background, 0.9);
    Align.center(this.game, this.Background);
    // buttons
    const playButton = this.add
      .image(
        this.game.config.width * 0.5,
        this.game.config.height * 0.6,
        "start"
      )
      .setDisplaySize(150, 50)
      .setTint(0x72751c);
    const newgameButton = this.add
      .image(
        playButton.x,
        playButton.y + playButton.displayHeight + 10,
        "newgame"
      )
      .setDisplaySize(150, 50)
      .setTint(0x72751c);
    const controlsButton = this.add
      .image(
        newgameButton.x,
        newgameButton.y + newgameButton.displayHeight + 10,
        "controls"
      )
      .setDisplaySize(150, 50)
      .setTint(0x72751c);
    const exitButton = this.add
      .image(
        controlsButton.x,
        controlsButton.y + controlsButton.displayHeight + 10,
        "exit"
      )
      .setDisplaySize(150, 50)
      .setTint(0x72751c);

    playButton.setInteractive();
    newgameButton.setInteractive();
    controlsButton.setInteractive();
    exitButton.setInteractive();

    playButton.on("pointerover", () => {
      playButton.setTint(0xa1c4c6);
    });
    playButton.on("pointerdown", () => {
      this.scene.start("Board");
    });
    playButton.on("pointerout", () => {
      playButton.setTint(0x72751c);
    });
    newgameButton.on("pointerover", () => {
      newgameButton.setTint(0xa1c4c6);
    });
    newgameButton.on("pointerout", () => {
      newgameButton.setTint(0x72751c);
    });
    controlsButton.on("pointerover", () => {
      controlsButton.setTint(0xa1c4c6);
    });
    controlsButton.on("pointerout", () => {
      controlsButton.setTint(0x72751c);
    });
    exitButton.on("pointerover", () => {
      exitButton.setTint(0xa1c4c6);
    });
    exitButton.on("pointerdown", () => {
      close();
    });
    exitButton.on("pointerout", () => {
      exitButton.setTint(0x72751c);
    });
  }
  update() {}
}
