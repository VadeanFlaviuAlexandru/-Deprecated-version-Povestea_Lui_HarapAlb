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
    this.load.image("musicON", "src/assets/Main/Buttons/musicON.png");
    this.load.image("musicOFF", "src/assets/Main/Buttons/musicOFF.png");
    this.load.image("info", "src/assets/Main/Buttons/info.png");
    this.load.audio("music1", 'src/assets/music/JocDeInceput.mp3')
  }
  create() {
    this.music1 = this.sound.add('music1', {
      volume: 0.2,
      loop: true
    })
    if (!this.sound.locked) {
      this.music1.play()
    }
    else {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.music1.play()
      })
    }
    this.Background = this.add.image(10, 10, "background");
    Align.ScaleToGameW(this.game, this.Background, 1);
    Align.center(this.game, this.Background);
    //-------------------------------------------------------------------buttons
    const playButton = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.6, "start").setDisplaySize(150, 50)
    const newgameButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, "newgame").setDisplaySize(150, 50)
    const controlsButton = this.add.image(newgameButton.x, newgameButton.y + newgameButton.displayHeight + 10, "controls").setDisplaySize(150, 50)
    const exitButton = this.add.image(controlsButton.x, controlsButton.y + controlsButton.displayHeight + 10, "exit").setDisplaySize(150, 50)
    var musicButton = this.add.image(this.game.config.width - 150, this.game.config.height - 70, "musicON").setDisplaySize(110, 50)
    if (localStorage.getItem('HarapAlb-musicOff')) {
      this.music1.stop();
      musicButton.setTexture('musicOFF')
    }
    const infoButton = this.add.image(musicButton.x - 100, musicButton.y, "info").setDisplaySize(50, 50)
    //-------------------------------------------------------------------interactivity
    playButton.setInteractive();
    newgameButton.setInteractive();
    controlsButton.setInteractive();
    exitButton.setInteractive();
    musicButton.setInteractive();
    infoButton.setInteractive();
    //-------------------------------------------------------------------buttons logic
    playButton.on("pointerover", () => { playButton.setTint(0xa1c4c6); });
    playButton.on("pointerdown", () => {
      this.music1.stop();
      this.scene.start("Scene2", { x: 161, y: 391 });
    });
    playButton.on("pointerout", () => { playButton.clearTint() });
    newgameButton.on("pointerover", () => { newgameButton.setTint(0xa1c4c6); });
    newgameButton.on("pointerout", () => { newgameButton.clearTint() });
    controlsButton.on("pointerover", () => { controlsButton.setTint(0xa1c4c6); });
    controlsButton.on("pointerdown", () => {
      var modal = document.getElementById("myModal-controls");
      var span = document.getElementsByClassName("close1")[0];
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
    controlsButton.on("pointerout", () => { controlsButton.clearTint() });
    exitButton.on("pointerover", () => { exitButton.setTint(0xa1c4c6); });
    exitButton.on("pointerdown", () => {
      close();
    });
    exitButton.on("pointerout", () => { exitButton.clearTint() });
    musicButton.on("pointerover", () => { musicButton.setTint(0xa1c4c6); });
    musicButton.on("pointerdown", () => {
      if (localStorage.getItem('HarapAlb-musicOff')) {
        this.music1.play()
        localStorage.removeItem('HarapAlb-musicOff')
        musicButton.setTexture('musicON')
      } else {
        this.music1.stop();
        musicButton.setTexture('musicOFF')
        localStorage.setItem('HarapAlb-musicOff', true)
      }
    });
    musicButton.on("pointerout", () => { musicButton.clearTint() });
    infoButton.on("pointerover", () => { infoButton.setTint(0xa1c4c6); });
    infoButton.on("pointerdown", () => {
      var modal = document.getElementById("myModal-info");
      var span = document.getElementsByClassName("close2")[0];
      modal.style.display = "block";
      span.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    });
    infoButton.on("pointerout", () => { infoButton.clearTint() });
  }
  update() { }
}
