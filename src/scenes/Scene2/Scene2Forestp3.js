import { AnimsOnHorse } from "../../plugins/AnimsOnHorse";
import { LoadingScreen } from "../../utilities/LoadingScreen";
import { PlayerInstructions } from "../../utilities/PlayerInstructions";

export class Scene2Forest3 extends Phaser.Scene {
  constructor() {
    super("Scene2Forest3");
    this.cursors = null;
    this.player = null;
    this.animsManagerOnHorse = new AnimsOnHorse(this);
    this.script = null;
  }
  preload() {
    LoadingScreen(this);
    this.load.image("tilesCodru3", "src/assets/World/SimpleGrassTiles.png");
    this.load.image("tiles2Codru3", "src/assets/World/PlantTiles.png");
    this.load.image("tiles6Codru3", "src/assets/World/PropsTiles.png");
    this.load.image("spanT", "src/assets/Player/span.png");
    this.load.tilemapTiledJSON(
      "mapCodru3",
      "src/assets/Scene2/Scene2ForestSplitPart2.json"
    );
    this.animsManagerOnHorse.preload();
    this.load.json(
      "scriptDataHorse",
      "src/assets/Interactions/scriptOnHorse.json"
    );
  }
  init(data) {
    this.spawnX = data.x;
    this.spawnY = data.y;
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player = this.add.character({
      x: this.spawnX,
      y: this.spawnY,
      name: "horse",
      image: "horse",
      speed: 270,
    });
    this.player.setTexture("horse", "horse-front");
    const mapCodru3 = this.make.tilemap({ key: "mapCodru3" });
    const tilesetCodru3 = mapCodru3.addTilesetImage(
      "SimpleGrassTiles",
      "tilesCodru3"
    );
    const tileset6Codru3 = mapCodru3.addTilesetImage(
      "PropsTiles",
      "tiles6Codru3"
    );
    const tileset2Codru3 = mapCodru3.addTilesetImage(
      "PlantTiles",
      "tiles2Codru3"
    );
    const tileset3Codru = mapCodru3.addTilesetImage("span", "spanT");
    const layer1Codru3 = mapCodru3.createLayer("GrassLayer", tilesetCodru3);
    const layerSCodru = mapCodru3.createLayer("SpanLayer", tileset3Codru);
    const layer2Codru3 = mapCodru3.createLayer("PropsLayer", tileset6Codru3);
    const layer9Codru3 = mapCodru3.createLayer("BushesLayer", tileset2Codru3);
    const layer3Codru3 = mapCodru3.createLayer("PlantLayer", tileset2Codru3);
    const layer4Codru3 = mapCodru3.createLayer("Plant2Layer", tileset2Codru3);
    const layer5Codru3 = mapCodru3.createLayer("Plant3Layer", tileset2Codru3);
    const layer6Codru3 = mapCodru3.createLayer("Plant4Layer", tileset2Codru3);
    const layer7Codru3 = mapCodru3.createLayer("Plant5Layer", tileset2Codru3);
    const layer8Codru3 = mapCodru3.createLayer("Plant6Layer", tileset2Codru3);
    layer2Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer2Codru3,
      this.HitLayer.bind(this)
    );
    layer3Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer3Codru3,
      this.HitLayer.bind(this)
    );
    layer4Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer4Codru3,
      this.HitLayer.bind(this)
    );
    layer5Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer5Codru3,
      this.HitLayer.bind(this)
    );
    layer6Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer6Codru3,
      this.HitLayer.bind(this)
    );
    layer7Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer7Codru3,
      this.HitLayer.bind(this)
    );
    layer8Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer8Codru3,
      this.HitLayer.bind(this)
    );
    layer9Codru3.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer9Codru3,
      this.HitLayer.bind(this)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, mapCodru3.widthInPixels, mapCodru3.heightInPixels);
    camera.setBounds(0, 0, mapCodru3.widthInPixels, mapCodru3.heightInPixels);
    this.animsManagerOnHorse.create();
    this.player.setDepth(10);
    layer2Codru3.setDepth(11);
    layer9Codru3.setDepth(12);
    layer3Codru3.setDepth(13);
    layer4Codru3.setDepth(14);
    layer5Codru3.setDepth(15);
    layer6Codru3.setDepth(16);
    layer7Codru3.setDepth(17);
    layer8Codru3.setDepth(18);
    this.script = this.cache.json.get("scriptDataHorse");
    const objectLayer = mapCodru3.getObjectLayer("ScriptLayer");
    if (objectLayer && objectLayer.objects) {
      objectLayer.objects.forEach((object) => {
        let tmp = this.add.rectangle(
          object.x + object.width / 2,
          object.y + object.height / 2,
          object.width,
          object.height
        );
        tmp.properties = object.properties.reduce(
          (obj, item) => Object.assign(obj, { [item.name]: item.value }),
          {}
        );
        this.physics.world.enable(tmp, 1);
        this.physics.add.collider(this.player, tmp, this.HitScript, null, this);
      });
    }
  }
  update() {
    PlayerInstructions(this);
    if (this.Dialog.visible) {
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
      if (this.cursors.space.isDown) {
        this.Dialog.display(false);
      }
      return false;
    }
  }
  HitLayer(player, target) {
    if (target.properties.portal && !this.Dialog.visible) {
      this.scene.start(target.properties.portal);
    }
  }
  HitScript(player, target) {
    if (target.properties.name && !this.Dialog.visible) {
      player.anims.stopAfterRepeat(0);
      this.Dialog.setText(this.script[player.name][target.properties.name]);
    }
  }
}
