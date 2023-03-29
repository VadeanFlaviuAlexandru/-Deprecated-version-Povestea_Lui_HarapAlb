import timebar from "./timebar.png";
import buttons from "./buttons.png";

export class QuickMath extends Phaser.Scene {
  constructor() {
    super("QuickMath");
    this.cursors = null;
    this.gameOptions = {
      // maximum length of the sum
      maxSumLen: 5,

      // local storage name used to save high score
      localStorageName: "oneplustwo",

      // time allowed to answer a question, in milliseconds
      timeToAnswer: 3000,

      // score needed to increase difficulty
      nextLevel: 400,
    };
  }
  // when the scene preloads...
  preload() {
    // preloading images
    this.load.image("timebar", timebar);

    // preloading a spritesheet where each sprite is 400x50 pixels
    this.load.spritesheet("buttons", buttons, {
      frameWidth: 400,
      frameHeight: 50,
    });
  }
  // when the sceen has been created...
  create() {
    //tutorial
    this.cursors = this.input.keyboard.createCursorKeys();
    this.Dialog.setText(
      "Pentru ca fiul craiului sa scape, trebuie sa aiba un scor mai mare de 2000. Pentru a obtine un scor mare, raspunde corect la intrebari!"
    );

    // it's not game over yet...
    this.isGameOver = false;

    // current score is set to zero
    this.score = 0;

    // we'll also keep track of correct answers
    this.correctAnswers = 0;

    // topScore gets the previously saved value in local storage if any, zero otherwise
    this.topScore =
      localStorage.getItem(this.localStorageName) == null
        ? 0
        : localStorage.getItem(this.gameOptions.localStorageName);

    // sumsArray is the array with all possible questions
    this.sumsArray = [];

    // rather than tossing a random question each time, I found easier
    // to store all possible questions in an array then draw a random question
    // each time. I just need an algorithm to generate all possible questions.

    // let's start building all possible questions with this loop
    // ranging from 1 (only one operator, like 1+1) to maxSumLen
    // (in this case 5, like 1+1+1+1-1-1)
    for (var i = 1; i < this.gameOptions.maxSumLen; i++) {
      // defining sumsArray[i] as an array of three empty arrays
      this.sumsArray[i] = [[], [], []];

      // looping from 1 to 3, which are the possible results of each sum
      for (var j = 1; j <= 3; j++) {
        // buildTrees is the core of the script, see it explained
        // some lines below
        this.buildThrees(j, 1, i, j);
      }
    }

    // try this! You will see all possible combinations
    console.log(this.sumsArray);

    // questionText is the text object which will display the question
    this.questionText = this.add.text(250, 160, "-", {
      font: "bold 72px Arial",
    });

    // setting questionText registration point to its center
    this.questionText.setOrigin(0.5);
    this.questionText.setPosition(
      this.game.config.width / 2,
      this.game.config.height / 3.7
    );

    // scoreText will keep the current score
    this.scoreText = this.add.text(10, 10, "-", {
      font: "bold 24px Arial",
    });

    // loop to create the three answer buttons
    for (i = 0; i < 3; i++) {
      // creation of the answer button
      var numberButton = this.add.sprite(
        this.game.config.width / 2,
        250 + i * 75,
        "buttons"
      );

      // showing the i-th frame
      numberButton.setFrame(i);

      // setting numberButton interactive
      numberButton.setInteractive();

      // calling checkAnswer method if clicked/tapped
      numberButton.on("pointerdown", this.checkAnswer);
    }

    // adding the time bar
    var numberTimer = this.add.sprite(
      this.game.config.width / 2,
      325,
      "timebar"
    );

    // the same image will also be used as a mask
    this.buttonMask = this.add.sprite(
      this.game.config.width / 2,
      numberTimer.y,
      "timebar"
    );

    // we do not need to show the mask image
    this.buttonMask.setVisible(false);

    // creation of the mask itself
    var mask = this.buttonMask.createBitmapMask();

    // applying mask to number timer
    numberTimer.setMask(mask);

    // method to ask next question
    this.nextNumber();
  }
  update() {
    if (this.Dialog.visible) {
      if (this.cursors.space.isDown) {
        this.Dialog.display(false);
      }
      return false;
    }
  }
  // buildThrees method, it will find all possible sums
  // arguments:
  // initialNumber: the first number. Each question always start with a positive number
  // currentIndex: it's the amount of operands already placed in the sum
  // limit: the max amount of operands allowed in the question
  // currentString: the string generated so far
  buildThrees(initialNummber, currentIndex, limit, currentString) {
    // the possible operands, from -3 to 3, excluding the zero
    var numbersArray = [-3, -2, -1, 1, 2, 3];

    // looping from 0 to numbersArray's length
    for (var i = 0; i < numbersArray.length; i++) {
      // "sum" is the sum between the first number and current numberArray item
      var sum = initialNummber + numbersArray[i];

      // output string is generated by the concatenation of current string with
      // current numbersArray item. I am adding a "+" if the item is greater than zero,
      // otherwise it already has its "-"
      var outputString =
        currentString + (numbersArray[i] < 0 ? "" : "+") + numbersArray[i];

      // if sum is between 1 and 3 and we reached the limit of operands we want...
      if (sum > 0 && sum < 4 && currentIndex == limit) {
        // then push the output string into sumsArray[amount of operands][result]
        this.sumsArray[limit][sum - 1].push(outputString);
      }

      // if the amount of operands is still below the amount we want...
      if (currentIndex < limit) {
        // recursively calling buildThrees, passing as arguments:
        // the current sum
        // the new amount of operands
        // the amount of operands we want
        // the current output string
        this.buildThrees(sum, currentIndex + 1, limit, outputString);
      }
    }
  }
  // this method asks next question
  nextNumber() {
    // updating score text
    this.scoreText.setText(
      "Score: " +
        this.score.toString() +
        "\nBest Score: " +
        this.topScore.toString()
    );

    // if we already answered more than one question...
    if (this.correctAnswers > 1) {
      // stopping time tween
      this.timeTween.stop();

      // resetting mask horizontal position
      this.buttonMask.x = this.game.config.width / 2;
    }

    // if we already answered at least one question...
    if (this.correctAnswers > 0) {
      // tween to slide out the mask, unvealing what's behind it
      this.timeTween = this.tweens.add({
        targets: this.buttonMask,
        x: -150,
        duration: this.gameOptions.timeToAnswer,
        callbackScope: this,
        onComplete: function () {
          // calling "gameOver" method. "?" is the string to display
          this.gameOver("?");
        },
      });
    }

    // drawing a random result between 0 and 2 (it will be from 1 to 3)
    this.randomSum = Phaser.Math.Between(0, 2);

    // choosing question length according to current score
    var questionLength = Math.min(
      Math.floor(this.score / this.gameOptions.nextLevel) + 1,
      4
    );

    // updating question text
    this.questionText.setText(
      this.sumsArray[questionLength][this.randomSum][
        Phaser.Math.Between(
          0,
          this.sumsArray[questionLength][this.randomSum].length - 1
        )
      ]
    );
  }
  // method to check the answer, the argument is the button pressed
  checkAnswer() {
    // we check the answer only if it's not game over yet
    if (!this.scene.isGameOver) {
      // button frame is equal to randomSum means the answer is correct
      if (this.frame.name == this.scene.randomSum) {
        // score is increased according to the time spent to answer
        this.scene.score += Math.floor((this.scene.buttonMask.x + 350) / 4);

        // one more correct answer
        this.scene.correctAnswers++;

        // moving on to next question
        this.scene.nextNumber();
      }

      // wrong answer
      else {
        // if it's not the first question...
        if (this.scene.correctAnswers > 1) {
          // stop the tween
          this.scene.timeTween.stop();
        }

        // calling "gameOver" method. "this.frame.name + 1" is the string to display
        this.scene.gameOver(this.frame.name + 1);
      }
    }
  }
  // method to end the game. The argument is the string to write
  gameOver(gameOverString) {
    // changing background color
    this.cameras.main.setBackgroundColor("#ff0000");

    // displaying game over text
    this.questionText.setText(this.questionText.text + " = " + gameOverString);

    // now it's game over
    this.isGameOver = true;

    // updating top score in local storage
    localStorage.setItem(
      this.gameOptions.localStorageName,
      Math.max(this.score, this.topScore)
    );
    if(this.score>2000){
      this.scene.start("Cutscene10")
    }

    // restart the game after two seconds
    this.time.addEvent({
      delay: 3000,
      callback: function () {
        this.scene.start("QuickMath");
      },
      callbackScope: this,
    });
  }
}
