import Phaser from "phaser";
import { Cutscene } from "./plugins/Cutscene";
import { CharacterPlugin } from "./plugins/Character";
import { GameOver } from "./scenes/GameOver";
import { Main } from "./scenes/Main";
import { Cutscene1 } from "./scenes/Scene1/Cutscene1";
import { Cutscene2 } from "./scenes/Scene1/Cutscene2";
import { Cutscene3 } from "./scenes/Scene1/Cutscene3";
import { Cutscene4 } from "./scenes/Scene1/Cutscene4";
import { Cutscene5 } from "./scenes/Scene2/Cutscene5";
import { Cutscene6 } from "./scenes/Scene2/Cutscene6";
import { Cutscene7 } from "./scenes/Scene2/Cutscene7";
import { Cutscene8 } from "./scenes/Scene2/Cutscene8";
import { Cutscene9 } from "./scenes/Scene2/Cutscene9";
import { Scene2Forest } from "./scenes/Scene2/Scene2Forest";
import { Scene2Forest2 } from "./scenes/Scene2/Scene2Forestp2";
import { Scene2Forest3 } from "./scenes/Scene2/Scene2Forestp3";
import { Scene1 } from "./scenes/Scene1/Scene1";
import { Scene2 } from "./scenes/Scene2/Scene2";
import { Scene1Attic } from "./scenes/Scene1/Scene1Attic";
import { Board } from "./scenes/Mini-Games/MemoryMatch/Board";
import { QuickMath } from "./scenes/Mini-Games/QuickMath/QuickMath";
import { Cutscene10 } from "./scenes/Scene2/Cutscene10";
import { GameInfo } from "./plugins/GameInfo";
import { Scene2AfterBridge } from "./scenes/Scene2/Scene2AfterBridge";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1166, //1366
  height: 630, //800
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  plugins: {
    global: [{ key: "CharacterPlugin", plugin: CharacterPlugin, start: true }],
    scene: [
      { key: "Dialog", plugin: Cutscene, mapping: "Dialog" },
      { key: "GameInfo", plugin: GameInfo, mapping: "GameInfo" },
    ],
  },
  scene: [
    Main,
    GameOver,
    Cutscene1,
    Scene1,
    Cutscene2,
    Scene1Attic,
    Cutscene3,
    Cutscene4,
    Board,
    Scene2,
    Cutscene5,
    Cutscene6,
    Scene2Forest,
    Cutscene7,
    Cutscene8,
    Scene2Forest2,
    Scene2Forest3,
    Cutscene9,
    QuickMath,
    Cutscene10,
    Scene2AfterBridge
  ],
};

const game = new Phaser.Game(config);
