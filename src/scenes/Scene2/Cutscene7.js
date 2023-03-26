import B36 from "../../assets/Scene2/B36.png";
import B37 from "../../assets/Scene2/B37.png";
import { Align } from "../../utilities/Align";

export class Cutscene7 extends Phaser.Scene {
  constructor() {
    super("Cutscene7");
  }
  preload() {
    this.load.image("B36", B36);
    this.load.image("B37", B37);
  }
  create() {
    let Dialogs = [
      "— Bun întâlnișul, voinice! Nu ai trebuință de slugă la drum? Prin locurile iestea e cam greu de călătorit singur; nu cumva să-ți iasă vro dihanie ceva înainte și să-ți scurteze cărările. Eu cunosc bine pe-aici, și poate mai încolo să ai nevoie de unul ca mine.",
      "— Poate să am, poate să n-am, zise fiul craiului, dar acum deodată mă las în voia întâmplării.",
    ];
    let Backgrounds = ["B36", "B37"];

    let currentDialog = 0;

    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
    this.Dialog.setText(Dialogs[currentDialog]);

    Align.ScaleToGameW(this.game, this.Background, 0.8);
    Align.center(this.game, this.Background);

    this.input.on("pointerdown", () => {
      this.Background.destroy();

      currentDialog++;

      if (currentDialog >= Dialogs.length) {
        this.scene.start("Scene2Forest", { x: 1000, y: 400 });
        this.scene.get("Scene2Forest").events.once("start", () => {
          this.scene.shutdown();
        });
      }

      this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
      this.Dialog.setText(Dialogs[currentDialog]);

      Align.ScaleToGameW(this.game, this.Background, 0.8);
      Align.center(this.game, this.Background);
    });
  }
  update() {}
}
