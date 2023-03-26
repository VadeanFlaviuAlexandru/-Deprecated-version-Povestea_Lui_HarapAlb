import { Anims } from "../../plugins/anims";

export class Scene2Forest extends Phaser.Scene {
  constructor() {
    super("Scene2Forest");
    this.cursors = null;
    this.player = null;
    this.animsManager = new Anims(this);
    this.script=null;
  }
  preload() {
    // map
    this.load.image("tilesCodru", "src/assets/World/SimpleGrassTiles.png");
    this.load.image("tiles2Codru", "src/assets/World/PlantTiles.png");
    this.load.image("tiles6Codru", "src/assets/World/PropsTiles.png");
    this.load.tilemapTiledJSON(
      "mapCodru",
      "src/assets/Scene2/Scene2Forest.json"
    );
    // player
    this.animsManager.preload();
    // script
    this.load.json("scriptData", "src/assets/script.json");
  }
  init(data) {
    this.spawnX = data.x;
    this.spawnY = data.y;
  }
  create() {
    // player stuff
    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player = this.add.character({
      x: this.spawnX,
      y: this.spawnY,
      name: "HarapAlb",
      image: "HarapAlb",
      speed: 400,
    });
    this.player.setTexture("HarapAlb", "HarapAlb-front");
    // map stuff
    const mapCodru = this.make.tilemap({ key: "mapCodru" });
    const tilesetCodru = mapCodru.addTilesetImage(
      "SimpleGrassTiles",
      "tilesCodru"
    );
    const tileset6Codru = mapCodru.addTilesetImage("PropsTiles", "tiles6Codru");
    const tileset2Codru = mapCodru.addTilesetImage("PlantTiles", "tiles2Codru");
    const layer1Codru = mapCodru.createLayer("GrassLayer", tilesetCodru);
    const layer2Codru = mapCodru.createLayer("PropsLayer", tileset6Codru);
    const layer9Codru = mapCodru.createLayer("BushesLayer", tileset6Codru);
    const layer3Codru = mapCodru.createLayer("PlantLayer", tileset2Codru);
    const layer4Codru = mapCodru.createLayer("Plant2Layer", tileset2Codru);
    const layer5Codru = mapCodru.createLayer("Plant3Layer", tileset2Codru);
    const layer6Codru = mapCodru.createLayer("Plant4Layer", tileset2Codru);
    const layer7Codru = mapCodru.createLayer("Plant5Layer", tileset2Codru);
    const layer8Codru = mapCodru.createLayer("Plant6Layer", tileset2Codru);
    layer2Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer2Codru,
      this.HitLayer.bind(this)
    );
    layer3Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer3Codru,
      this.HitLayer.bind(this)
    );
    layer4Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer4Codru,
      this.HitLayer.bind(this)
    );
    layer5Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer5Codru,
      this.HitLayer.bind(this)
    );
    layer6Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer6Codru,
      this.HitLayer.bind(this)
    );
    layer7Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer7Codru,
      this.HitLayer.bind(this)
    );
    layer8Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer8Codru,
      this.HitLayer.bind(this)
    );
    layer9Codru.setCollisionByProperty({ collide: true });
    this.physics.add.collider(
      this.player,
      layer9Codru,
      this.HitLayer.bind(this)
    );
    // camera
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, mapCodru.widthInPixels, mapCodru.heightInPixels);
    camera.setBounds(0, 0, mapCodru.widthInPixels, mapCodru.heightInPixels);
    // animations
    this.animsManager.create();
    // correcting layers
    this.player.setDepth(10);
    layer2Codru.setDepth(11);
    layer9Codru.setDepth(12);
    layer3Codru.setDepth(13);
    layer4Codru.setDepth(14);
    layer5Codru.setDepth(15);
    layer6Codru.setDepth(16);
    layer7Codru.setDepth(17);
    layer8Codru.setDepth(18);
    // script for interactions
    this.script = this.cache.json.get("scriptData");
    const objectLayer = mapCodru.getObjectLayer("ScriptLayer");
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
    // animations
    if (this.cursors.left.isDown)
      this.player.SetInstruction({ action: "walk", option: "left" });
    else if (this.cursors.right.isDown)
      this.player.SetInstruction({ action: "walk", option: "right" });
    if (this.cursors.up.isDown)
      this.player.SetInstruction({ action: "walk", option: "back" });
    else if (this.cursors.down.isDown)
      this.player.SetInstruction({ action: "walk", option: "front" });
    this.player.update();
    // dialog
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
        cutscene1: "B36",
        cutscene2: "B37",
      });
      this.scene.get("Cutscene7").events.once("start", () => {
        this.scene.shutdown();
      });
    }
    if(target.properties.name == "test"){
      this.Dialog.setText("TEST")
    }
  }
  HitScript(player, target) {
    if (target.properties.name && !this.Dialog.visible) {
      player.anims.stopAfterRepeat(0);
      this.Dialog.setText(this.script[player.name][target.properties.name]);
    }
  }
}
