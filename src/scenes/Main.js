import { Align } from "../utilities/Align.js";

export class Main extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }
  preload() {
    this.load.image("controls", "src/assets/Main/Buttons/controls.png");
    this.load.image("exit", "src/assets/Main/Buttons/exit.png");
    this.load.image("newgame", "src/assets/Main/Buttons/newgame.png");
    this.load.image("start", "src/assets/Main/Buttons/start.png");
    this.load.image("background", "src/assets/Main/background.jpg");
    this.load.audio("music1", 'src/assets/music/JocDeInceput.mp3')
  }
  create() {
    this.music1 = this.sound.add('music1', {
      volume: 0.2,
      loop: true
    })
    this.music1.play()
    if (!this.sound.locked) {
      this.music1.play()
    }
    else {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.music1.play()
      })
    }
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
      this.scene.start("Cutscene1");
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
    controlsButton.on("pointerdown", () => {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    })
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
  update() { }
}
