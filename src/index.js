import Phaser from 'phaser';
import { Cutscene } from './plugins/Cutscene';
import { CharacterPlugin } from './plugins/Character';
import { GameOver } from "./scenes/GameOver";
import { Main } from './scenes/Main';
import { Cutscene1 } from './scenes/Scene1/Cutscene1';
import { Cutscene2 } from './scenes/Scene1/Cutscene2';
import { Cutscene3 } from './scenes/Scene1/Cutscene3';
import { Cutscene4 } from './scenes/Scene1/Cutscene4';
import { Cutscene5 } from './scenes/Scene2/Cutscene5';
import { Cutscene6 } from './scenes/Scene2/Cutscene6';
import { Scene2Forest } from './scenes/Scene2/Scene2Forest';
import { Scene1 } from './scenes/Scene1/Scene1';
import { Scene2 } from './scenes/Scene2/Scene2';
import { Scene1Attic } from './scenes/Scene1/Scene1Attic';
import { Board } from './scenes/Mini-Games/MemoryMatch/Board';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1366,        //1366
    height: 800,        //800
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    plugins: {
        global: [
            { key: 'CharacterPlugin', plugin: CharacterPlugin, start: true }
        ],
        scene: [
            { key: 'Dialog', plugin: Cutscene, mapping: 'Dialog' }
        ]
    },
    scene: [Main, GameOver, Cutscene1, Scene1, Cutscene2,
        Scene1Attic, Cutscene3, Cutscene4, Board, Scene2,
        Cutscene5, Cutscene6, Scene2Forest]
};

const game = new Phaser.Game(config);
