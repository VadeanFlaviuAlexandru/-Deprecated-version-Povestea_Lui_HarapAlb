import Background from "../../../assets/MemoryMatch/Background.jpg";
import { Align } from "../../../utilities/Align";
import { getRandomInt } from "../../../utilities/Random";
import Card from "./Card";
import { images } from "./imageUtils.js";

export class Board extends Phaser.Scene {
  constructor() {
    super("Board");
    this.Cards = [];
    this.selectedCards = [];
    this.attempts = 0;
    this.waitForNewRound = false;
    this.score;
    this.cursors = null;
    this.timedEvent;
    this.text;
  }
  preload() {
    this.load.image("Background", Background);
    this.loadCards();
    this.GameInfo.setText(
      'Pentru ca fiul craiului să învingă acest urs, trebuie completat "Jocul de memorie". Trebuie să găsești perechi de cărți cu aceeași imagine în cel mult 13 de secunde! '
    );
  }
  create() {
    this.Background = this.add.image(10, 10, "Background");
    Align.ScaleToGameW(this.game, this.Background, 1);
    Align.center(this.game, this.Background);
    this.text = this.add.text(32, 32);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.shuffle();
  }
  update() {
    if (this.GameInfo.visible) {
      //dialog
      if (this.cursors.space.isDown) {
        this.restartGame();
        this.timedEvent = this.time.delayedCall(14000, this.onEvent, [], this);
        this.GameInfo.display(false);
      }
      return false;
    }
    this.text.setText(
      "Timp rămas: " + this.timedEvent.getProgress().toString().substr(0, 4)
    );
  }
  loadCards() {
    Object.keys(images).map((name) => {
      this.load.image(name, images[name]);
    });
  }
  cardClickHandler(card) {
    if (!this.GameInfo.visible) {
      if (
        this.waitForNewRound ||
        card.out ||
        this.selectedCards.includes(card)
      ) {
        return;
      }
      card.faceUp();
      this.selectedCards.push(card);
      if (this.selectedCards.length === 2) {
        this.newRound();
      }
    }
  }
  newRound() {
    this.waitForNewRound = true;
    setTimeout(() => {
      if (this.matchCards()) {
        this.setAsReadOnly();
      } else {
        this.faceCardsDown();
      }
      this.updateScore();
      this.selectedCards.length = 0;
      this.waitForNewRound = false;
      this.attempts++;
    }, 1000);
  }
  matchedCards() {
    return this.Cards.filter((card) => card.outOfTheGame).length / 2;
  }
  updateScore() {
    var style = {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };

    if (!this.score) {
      this.score = this.add.text(0, 400, "", style);
    }
    const efficiency = this.attempts
      ? ((this.matchedCards() / this.attempts) * 100).toFixed(0)
      : 0;

    // this.score.text = `
    //   Attempts:${this.attempts}
    //   Matches: ${this.matchedCards()}
    //   Efficiency: ${efficiency}%
    // `;
    if (this.matchedCards() === 4) {
      setTimeout(() => {
        this.scene.start("Cutscene6");
      }, 300);
    }
  }
  setAsReadOnly() {
    this.selectedCards.forEach((card) => card.readOnly());
  }
  faceCardsDown() {
    this.selectedCards.forEach((card) => card.faceDown());
  }
  matchCards() {
    if (!this.selectedCards.length) {
      return;
    }
    const cardA = this.selectedCards[0];
    const cardB = this.selectedCards[1];

    return cardA.key === cardB.key;
  }
  onEvent() {
    this.restartGame();
    this.GameInfo.setText(
      "Din păcate, fiul craiului nu a putut rămane concentrat... Hai să încercăm din nou!"
    );
  }
  restartGame() {
    this.selectedCards.length = 0;
    this.Cards.forEach((card) => {
      card.faceDown();
      card.outOfTheGame = false;
    });
    this.shuffle();
  }
  shuffle() {
    const MAX_CARD_PER_LINE = 4;
    const PAIRS = 4;
    const H_OFFSET = 200;
    const V_OFFSET = 200;
    const INITIAL_X = this.game.config.width / 3.5;
    const INITIAL_Y = this.game.config.height / 4;

    const lines =
      parseInt((PAIRS * 2) / MAX_CARD_PER_LINE) +
      (((PAIRS * 2) / MAX_CARD_PER_LINE) % MAX_CARD_PER_LINE ? 1 : 0);
    const numberOfCards = PAIRS * 2;
    const positions = [];

    const imageNames = Object.keys(images)
      .filter((name) => {
        return name.includes("card");
      })
      .slice(0, PAIRS);

    let total = numberOfCards;
    for (let line = 0; line < lines; line++) {
      for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
        if (total > 0) {
          positions.push({
            x: INITIAL_X + H_OFFSET * pos,
            y: INITIAL_Y + V_OFFSET * line,
          });
        }
        total--;
      }
    }

    while (positions.length) {
      const posA = positions.splice(getRandomInt(positions.length), 1)[0];
      const posB = positions.splice(getRandomInt(positions.length), 1)[0];
      const key = imageNames.splice(getRandomInt(imageNames.length), 1)[0];
      this.Cards.push(
        new Card({
          key,
          gameScene: this,
          ...posA,
          handler: this.cardClickHandler.bind(this),
        })
      );
      this.Cards.push(
        new Card({
          key,
          gameScene: this,
          ...posB,
          handler: this.cardClickHandler.bind(this),
        })
      );
    }
  }
}
