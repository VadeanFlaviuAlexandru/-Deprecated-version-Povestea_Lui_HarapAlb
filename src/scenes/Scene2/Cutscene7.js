import { Align } from "../../utilities/Align";
import B36 from "../../assets/Scene2/B36.png"
import B37 from "../../assets/Scene2/B37.png"

export class Cutscene7 extends Phaser.Scene {
  constructor() {
    super("Cutscene7");
  }
  preload() {
    this.load.image("B36", B36);
    this.load.image("B37", B37);
  }
  init(data) {
    this.cutscene1 = data.cutscene1;
    this.cutscene2 = data.cutscene2;
  }
  create() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
    });
    this.load.on("complete", function () {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
    let Dialogs = [
      "— Bun întâlnișul, voinice! Nu ai trebuință de slugă la drum? Prin locurile iestea e cam greu de călătorit singur; nu cumva să-ți iasă vro dihanie ceva înainte și să-ți scurteze cărările. Eu cunosc bine pe-aici, și poate mai încolo să ai nevoie de unul ca mine.",
      "— Poate să am, poate să n-am, zise fiul craiului, dar acum deodată mă las în voia întâmplării.",
    ];
    let Backgrounds = [this.cutscene1, this.cutscene2];
    let currentDialog = 0;
    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
    this.Dialog.setText(Dialogs[currentDialog]);
    Align.ScaleToGameW(this.game, this.Background, 0.8);
    Align.center(this.game, this.Background);
    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      currentDialog++;
      if (currentDialog >= Dialogs.length) {
        this.scene.start("Scene2Forest2", { x: 3400, y: 830 });
      }
      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      this.Dialog.setText(Dialogs[currentDialog]);
      Align.ScaleToGameW(this.game, this.Background, 0.8);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
