import { Anims } from "../../plugins/anims";

export class Scene2Forest2 extends Phaser.Scene {
  constructor() {
    super("Scene2Forest2");
    this.cursors = null;
    this.player = null;
    this.animsManager = new Anims(this);
    this.script = null;
  }
  preload() {
    this.load.image("tilesCodru2", "src/assets/World/SimpleGrassTiles.png");
    this.load.image("tiles2Codru2", "src/assets/World/PlantTiles.png");
    this.load.image("tiles6Codru2", "src/assets/World/PropsTiles.png");
    this.load.image("spanT", "src/assets/Player/span.png");
    this.load.tilemapTiledJSON(
      "mapCodru2",
      "src/assets/Scene2/Scene2Forest.json"
    );
    this.animsManager.preload();
    this.load.json("scriptData", "src/assets/script.json");
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
      name: "HarapAlb",
      image: "HarapAlb",
      speed: 270,
    });
    this.player.setTexture("HarapAlb", "HarapAlb-front");
    const mapCodru2 = this.make.tilemap({ key: "mapCodru2" });
    const tilesetCodru2 = mapCodru2.addTilesetImage(
      "SimpleGrassTiles",
      "tilesCodru2"
    );
    const tileset6Codru2 = mapCodru2.addTilesetImage(
      "PropsTiles",
      "tiles6Codru2"
    );
    const tileset2Codru2 = mapCodru2.addTilesetImage(
      "PlantTiles",
      "tiles2Codru2"
    );
    const tileset3Codru = mapCodru2.addTilesetImage("span", "spanT");
    const layer1Codru2 = mapCodru2.createLayer("GrassLayer", tilesetCodru2);
    const layerSCodru = mapCodru2.createLayer("SpanLayer", tileset3Codru);
    const layer2Codru2 = mapCodru2.createLayer("PropsLayer", tileset6Codru2);
    const layer9Codru2 = mapCodru2.createLayer("BushesLayer", tileset2Codru2);
    const layer3Codru2 = mapCodru2.createLayer("PlantLayer", tileset2Codru2);
    const layer4Codru2 = mapCodru2.createLayer("Plant2Layer", tileset2Codru2);
    const layer5Codru2 = mapCodru2.createLayer("Plant3Layer", tileset2Codru2);
    const layer6Codru2 = mapCodru2.createLayer("Plant4Layer", tileset2Codru2);
    const layer7Codru2 = mapCodru2.createLayer("Plant5Layer", tileset2Codru2);
    const layer8Codru2 = mapCodru2.createLayer("Plant6Layer", tileset2Codru2);
    layer2Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer2Codru2,
      this.HitLayer.bind(this)
    );
    layer3Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer3Codru2,
      this.HitLayer.bind(this)
    );
    layer4Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer4Codru2,
      this.HitLayer.bind(this)
    );
    layer5Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer5Codru2,
      this.HitLayer.bind(this)
    );
    layer6Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer6Codru2,
      this.HitLayer.bind(this)
    );
    layer7Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer7Codru2,
      this.HitLayer.bind(this)
    );
    layer8Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer8Codru2,
      this.HitLayer.bind(this)
    );
    layer9Codru2.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer9Codru2,
      this.HitLayer.bind(this)
    );
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, mapCodru2.widthInPixels, mapCodru2.heightInPixels);
    camera.setBounds(0, 0, mapCodru2.widthInPixels, mapCodru2.heightInPixels);
    this.animsManager.create();
    this.player.setDepth(10);
    layer2Codru2.setDepth(11);
    layer9Codru2.setDepth(12);
    layer3Codru2.setDepth(13);
    layer4Codru2.setDepth(14);
    layer5Codru2.setDepth(15);
    layer6Codru2.setDepth(16);
    layer7Codru2.setDepth(17);
    layer8Codru2.setDepth(18);
    this.script = this.cache.json.get("scriptData");
    const objectLayer = mapCodru2.getObjectLayer("ScriptLayer");
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
    if (this.cursors.left.isDown)
      this.player.SetInstruction({ action: "walk", option: "left" });
    else if (this.cursors.right.isDown)
      this.player.SetInstruction({ action: "walk", option: "right" });
    if (this.cursors.up.isDown)
      this.player.SetInstruction({ action: "walk", option: "back" });
    else if (this.cursors.down.isDown)
      this.player.SetInstruction({ action: "walk", option: "front" });
    this.player.update();
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
      this.scene.start(target.properties.portal, {
        cutscene11: "B36",
        cutscene22: "B37",
      });
    }
  }
  HitScript(player, target) {
    if (target.properties.name && !this.Dialog.visible) {
      player.anims.stopAfterRepeat(0);
      this.Dialog.setText(this.script[player.name][target.properties.name]);
    }
  }
}
