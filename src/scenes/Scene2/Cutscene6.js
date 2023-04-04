import B33 from "../../assets/Scene2/B33.png";
import B34 from "../../assets/Scene2/B34.png";
import B35 from "../../assets/Scene2/B35.png";
import { Align } from "../../utilities/Align";

export class Cutscene6 extends Phaser.Scene {
  constructor() {
    super("Cutscene6");
  }
  preload() {
    this.load.image("B33", B33);
    this.load.image("B34", B34);
    this.load.image("B35", B35);
    this.load.audio("music5", 'src/assets/music/OmuleCatAiTraiSLOWEDandREVERB.mp3')
  }
  create() {
    this.sound.get("music4").stop();
    this.music5 = this.sound.add('music5', {
      volume: 0.2,
      loop: true
    })
    this.music5.play()
    if (!this.sound.locked) {
      this.music5.play()
    }
    else {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.music5.play()
      })
    }
    let Dialogs = [
      "Dragul tatei, nu da, că eu sunt!",
      "Atunci fiul craiului descalecă, și tată-său, cuprinzându-l în brațe, îl sărută și-i zice: ",
      "Fătul meu, bun tovarăș ți-ai ales; de te-a învățat cineva, bine ți-a priit, iară de-ai făcut-o din capul tău, bun cap ai avut. Mergi de-acum tot înainte, că tu ești vrednic de împărat. Numai ține minte sfatul ce-ți dau: în călătoria ta ai să ai trebuință și de răi, și de buni, dar să te ferești de omul roș, iară mai ales de cel spân, cât îi putea; să n-ai de-a face cu dânșii, căci sunt foarte șugubeți. Și, la toată întâmplarea, calul, tovarășul tău, te-a mai sfătui și el ce ai să faci, că de multe primejdii m-a scăpat și pe mine în tinerețile mele!",
      "Na-ți acum și pielea asta de urs, că ți-a prinde bine vreodată. Mergeți în pace, dragii mei. De-acum înainte, Dumnezeu știe când ne-om mai vedea!... ",
    ];
    let Backgrounds = ["B33", "B34", "B35", "B35"];
    let currentDialog = 0;
    this.Background = this.add.image(10, 10, Backgrounds[currentDialog]);
    this.Dialog.setText(Dialogs[currentDialog]);
    Align.ScaleToGameW(this.game, this.Background, 0.8);
    Align.center(this.game, this.Background);
    this.input.keyboard.on("keydown-SPACE", () => {
      this.Background.destroy();
      currentDialog++;
      if (currentDialog >= Dialogs.length) {
        this.scene.start("Scene2AfterBridge", { x: 3220, y: 1444 });
        this.scene.get("Scene2").events.once("start", () => {
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
