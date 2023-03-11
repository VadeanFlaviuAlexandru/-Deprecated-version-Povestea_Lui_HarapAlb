import B25 from "../../assets/Scene1/B25.png"
import { Align } from '/CodingStuff/Licenta/Game/src/utilities/Align'

export class Cutscene3 extends Phaser.Scene {
    constructor() {
        super('Cutscene3');
    }
    preload() {
        this.load.image('B25', B25)
    }
    create() {
        let Dialogs = [
            "Niște straie foarte vechi, un arc, niște săgeți, un paloș și un buzdugan, toate pline de rugină... Dacă mă uit bine, văd și un căpăstru, un frâu, un bici și o șa, toate colbăite, sfarogite și vechi ca pământul. "
        ]
        let Backgrounds = [
            "B25"
        ]

        let currentDialog = 0;

        this.Background = this.add.image(10, 10, Backgrounds[currentDialog])
        this.gzDialog.setText(Dialogs[currentDialog])

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
            this.gzDialog.setText(Dialogs[currentDialog])

            Align.ScaleToGameW(this.game, this.Background, 0.8)
            Align.center(this.game, this.Background)
        })
    }
    update() { }
}