import MainMenu from '../assets/MainMenu.jpg'
import { Align } from '../utilities/Align.js'

export class Main extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image('MainMenu', MainMenu)
    }
    create() {
        this.SplashScreen = this.add.image(10, 10, 'MainMenu')

        Align.ScaleToGameW(this.game, this.SplashScreen, 1.05)
        Align.center(this.game, this.SplashScreen)

        this.input.on('pointerdown', () => {
            this.scene.start('Scene1', { x: 880, y: 320, })
        })
    }
    update() { }
}