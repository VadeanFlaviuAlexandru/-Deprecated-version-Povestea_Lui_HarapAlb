import B21 from "../../assets/Scene1/B21.png"
import { Align } from '../../utilities/Align'

export class Cutscene1 extends Phaser.Scene {
    constructor() {
        super('Cutscene1');
    }
    preload() {
        this.load.image('B1', B1)
    }
    create() {
        let Dialogs = [
        ]
        let Backgrounds = [
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
                this.scene.start('Scene1', { x: 400, y: 1170 });
                this.scene.get("Scene1").events.once('start', () => {
                    this.scene.shutdown();
                });
            }


            this.Background = this.add.image(10, 10, Backgrounds[currentDialog])
            this.Dialog.setText(Dialogs[currentDialog])

            Align.ScaleToGameW(this.game, this.Background, 0.8)
            Align.center(this.game, this.Background)
        })
    }
    update() { }
}