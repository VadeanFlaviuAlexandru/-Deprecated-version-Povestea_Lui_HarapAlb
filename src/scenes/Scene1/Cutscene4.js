import B21 from "../../assets/Scene1/B21.png"
import B27 from "../../assets/Scene1/B27.png"
import B28 from "../../assets/Scene1/B28.png"
import B29 from "../../assets/Scene1/B29.png"
import B30 from "../../assets/Scene1/B30.png"
import { Align } from '/CodingStuff/Licenta/Game/src/utilities/Align'

export class Cutscene4 extends Phaser.Scene {
    constructor() {
        super('Cutscene4');
    }
    preload() {
        this.load.image('B21', B21)
        this.load.image('B27', B27)
        this.load.image('B28', B28)
        this.load.image('B29', B29)
        this.load.image('B30', B30)
    }
    create() {
        let Dialogs = [
            "Pe urmă umple o tavă cu jăratic, se duce la herghelie ",
            "și o pune jos între cai.",
            "Și atunci, numai iaca ce iese din mijlocul hergheliei o răpciugă de cal, grebănos, dupuros și slab, de-i numărai coastele; și venind de-a dreptul la tava, apucă o gură de jăratic. Fiul craiului îi și trage atunci cu frâul în cap, zicând: ",
            "— Ghijoagă urâcioasă ce ești! din toți caii, tocmai tu te-ai găsit să mănânci jăratic? De te-a împinge păcatul să mai vii o dată, vai de steaua ta are să fie! ",
            "pune tarnița pe cal, anină armele la oblânc, își ia merinde și bani de ajuns, schimburi în desagi și o ploscă plină cu apă.",
            "Apoi sărută mâna tată-său, primind carte de la dânsul către împăratul, zice rămas bun fraților săi și a treia zi către seară pornește și el, mergând din pasul calului.",
        ]
        let Backgrounds = [
            "B27", "B28", "B29", "B29", "B30", "B21"
        ]

        let currentDialog = 0;

        this.Background = this.add.image(10, 10, Backgrounds[currentDialog])
        this.Dialog.setText(Dialogs[currentDialog])

        Align.ScaleToGameW(this.game, this.Background, 0.8)
        Align.center(this.game, this.Background)


        this.input.on('pointerdown', () => {

            this.Background.destroy()

            currentDialog++;

            if (currentDialog >= Dialogs.length) {
                this.scene.start('Scene1', { x: 880, y: 320 })
                this.scene.get("Scene1").events.once('start', () => {
                    this.scene.shutdown();
                });
            }

            this.Background = this.add.image(10, 10, Backgrounds[currentDialog])
            this.Dialog.setText(Dialogs[currentDialog])

            Align.ScaleToGameW(this.game, this.Background, 0.8)
            Align.center(this.game, this.Background)

            this.registry.destroy("ExitAttic")
        })
    }
    update() { }
}