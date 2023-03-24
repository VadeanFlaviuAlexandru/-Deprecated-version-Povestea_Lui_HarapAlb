import Card from "./Card";
import { images } from "./imageUtils.js";
import { getRandomInt } from "../../../utilities/Random";

export class Board extends Phaser.Scene {
  constructor() {
    super("Board");
    this.Cards = [];
    this.selectedCards = [];
    this.attempts = 0;
    this.waitForNewRound = false;
    this.score;
  }
  preload() {
    this.loadCards();
    this.newRound();
  }
  create() {
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
  update() { }
  //    functions
  loadCards() {
    Object.keys(images).map((name) => {
      this.load.image(name, images[name]);
    });
  }
  cardClickHandler(card) {
    if (this.waitForNewRound || card.out) {
      return;
    }
    card.faceUp();
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this.newRound();
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

    this.score.text = `
      Attempts:${this.attempts}
      Matches: ${this.matchedCards()}
      Efficiency: ${efficiency}%
    `;
    if (this.matchedCards() === 4) {
      setTimeout(() => {
        this.scene.start('Cutscene6', { x: 3220, y: 1444 });
        this.scene.get("Cutscene6").events.once('start', () => {
          this.scene.shutdown();
        });
      }, 2500);
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
}