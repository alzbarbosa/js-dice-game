//Name: Andre Luiz da Silva Barbosa

//Player template
function Player(name) {
  this.name = name;
  this.die1 = 1;
  this.die2 = 1;
  this.rolledDiceScore = 0;
  this.totalScore = 0;

  this.rollDice = function () {
    this.die1 = Math.floor(Math.random() * 6) + 1;
    this.die2 = Math.floor(Math.random() * 6) + 1;
  };

  this.calculateRolledDiceScore = function () {
    if (this.die1 === 1 || this.die2 === 1) {
      this.rolledDiceScore = 0;
    } else if (this.die1 === this.die2) {
      this.rolledDiceScore = (this.die1 + this.die2) * 2;
    } else {
      this.rolledDiceScore = this.die1 + this.die2;
    }
  };

  this.updateTotalScore = function () {
    this.totalScore += this.rolledDiceScore;
  };

  this.reset = function () {
    this.die1 = 1;
    this.die2 = 1;
    this.rolledDiceScore = 0;
    this.totalScore = 0;
  };
}

// Creating Players
const player1 = new Player("User");
const player2 = new Player("Computer");

// Game
let numberRounds = 0;
const MAX_ROUNDS = 3;

const $playerDie1Element = $("#player-die-1");
const $playerDie2Element = $("#player-die-2");
const $computerDie1Element = $("#computer-die-1");
const $computerDie2Element = $("#computer-die-2");
const $playerTotalScoreElement = $("#player-total-score");
const $computerTotalScoreElement = $("#computer-total-score");
const $playerRoundScoreElement = $("#player-round-score");
const $computerRoundScoreElement = $("#computer-round-score");
const $buttonRollDice = $("#roll-dice");
const $buttonStartNewGame = $("#start-new-game");
const $roundsElement = $("#rounds");

const $popupElement = $("#pop-up");
const $closeButtonElement = $("#close-pop-up");
const $winnerNameElement = $("#winner-name");
const $winnerPointsElement = $("#winner-points");

function updateDiceImages(player, die1Element, die2Element) {
  die1Element.attr("src", `images/dice-images/dice-${player.die1}.png`);

  die2Element.attr("src", `images/dice-images/dice-${player.die2}.png`);
}

function displayWinner() {
  if (player1.totalScore > player2.totalScore) {
    $winnerNameElement.text(`${player1.name} wins!`);
    $winnerPointsElement.text(`The total score was ${player1.totalScore}!`);
  } else if (player1.totalScore < player2.totalScore) {
    $winnerNameElement.text(`${player2.name} wins!`);
    $winnerPointsElement.text(`The total score was ${player2.totalScore}!`);
  } else {
    $winnerNameElement.text(`No one wins!`);
    $winnerPointsElement.text(`Both players' score was ${player1.totalScore}!`);
  }

  $popupElement.addClass("show");
}

$buttonRollDice.on("click", function () {
  numberRounds += 1;
  player1.rollDice();
  player2.rollDice();

  player1.calculateRolledDiceScore();
  player2.calculateRolledDiceScore();

  player1.updateTotalScore();
  player2.updateTotalScore();

  updateDiceImages(player1, $playerDie1Element, $playerDie2Element);
  updateDiceImages(player2, $computerDie1Element, $computerDie2Element);

  $playerTotalScoreElement.text(player1.totalScore);
  $computerTotalScoreElement.text(player2.totalScore);

  $playerRoundScoreElement.text(player1.rolledDiceScore);
  $computerRoundScoreElement.text(player2.rolledDiceScore);

  $roundsElement.text(`Round ${numberRounds}`);

  if (numberRounds === MAX_ROUNDS) {
    $buttonRollDice.prop("disabled", true);
    displayWinner();
  }
});

$buttonStartNewGame.on("click", function () {
  $buttonRollDice.prop("disabled", false);

  numberRounds = 0;
  $roundsElement.text(`Round 1`);

  player1.reset();
  player2.reset();

  updateDiceImages(player1, $playerDie1Element, $playerDie2Element);
  updateDiceImages(player2, $computerDie1Element, $computerDie2Element);

  $playerTotalScoreElement.text(player1.totalScore);
  $computerTotalScoreElement.text(player2.totalScore);

  $playerRoundScoreElement.text(player1.rolledDiceScore);
  $computerRoundScoreElement.text(player2.rolledDiceScore);

  $popupElement.removeClass("show");
});

$closeButtonElement.on("click", function () {
  $popupElement.removeClass("show");
});
