import Phaser from 'phaser';
import { GzDialog } from './plugins/Cutscene';
import { GzRpgCharacterPlugin } from './plugins/GzRpgCharacter';
import { GameOver } from "./scenes/GameOver";
import { Main } from './scenes/Main';
import { Cutscene1 } from './scenes/Scene1/Cutscene1';
import { Cutscene2 } from './scenes/Scene1/Cutscene2';
import { Cutscene3 } from './scenes/Scene1/Cutscene3';
import { Cutscene4 } from './scenes/Scene1/Cutscene4';
import { Scene1 } from './scenes/Scene1/Scene1';
import { Scene1Attic } from './scenes/Scene1/Scene1Attic';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1366,    //1366
    height: 800,    //800
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    plugins: {
        global: [
            { key: 'GzRpgCharacterPlugin', plugin: GzRpgCharacterPlugin, start: true }
        ],
        scene: [
            { key: 'gzDialog', plugin: GzDialog, mapping: 'gzDialog' }
        ]
    },
    scene: [Main, GameOver, Cutscene1, Scene1, Cutscene2, Scene1Attic, Cutscene3,Cutscene4]
};

const game = new Phaser.Game(config);