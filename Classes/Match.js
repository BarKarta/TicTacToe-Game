import { Player } from "./Player.js";

export class Match {
  constructor(playerID, matchID) {
    this.matchID = matchID;
    this.playerCross = new Player(playerID);
    this.playerCircle;
    this.board = Array(10).fill(null);
    this.playerTurn = playerID;
    console.log(
      `
      New Match Start ID: ${matchID}, Waiting for another player to join
      `
    );
  }
  startGame(playerID) {
    this.drawBoard();
    console.log(`Player ${this.playerCross.playerID} Turn!`);
  }

  playGame(playerID, location) {
    // Checks if the input is Valid and if the tile is empty
    if (!this.isInputValid(location)) return false;
    if (this.playerTurn !== playerID) return false;

    this.updateBoard(location);
    this.drawBoard();

    // checks if there a winner
    if (this.isWinner()) {
      return this.playerTurn;
    }

    // checks if there is a tie
    if (this.checkIsTie()) {
      console.log(" Game is Tie! Restarting Game!");
      this.resetBoard();
      return "Tie";
    }

    // Swap the state of the turns
    if (this.playerTurn === this.playerCross.playerID) {
      this.playerTurn = this.playerCircle.playerID;
    } else {
      this.playerTurn = this.playerCross.playerID;
    }
    console.log(`Player ${this.playerTurn} turn!`);

    return true;
  }

  updateBoard(location) {
    if (this.playerCircle.playerID == this.playerTurn) {
      this.board[location] = "0";
    } else {
      this.board[location] = "X";
    }
  }

  addPlayerCircle(player) {
    if (!this.playerCircle && this.playerCross) {
      this.playerCircle = player;
      console.log(
        `
        Player ${player.playerID} joined!
        `
      );
      this.startGame(player.playerID);
    }
  }
  drawBoard() {
    console.log(" ");
    console.log(
      " " +
        (this.board["7"] || "  ") +
        " | " +
        (this.board["8"] || "  ") +
        " | " +
        (this.board["9"] || "  ")
    );
    console.log("---------------");
    console.log(
      " " +
        (this.board["4"] || "  ") +
        " | " +
        (this.board["5"] || "  ") +
        " | " +
        (this.board["6"] || "  ")
    );
    console.log("---------------");
    console.log(
      " " +
        (this.board["1"] || " ") +
        " | " +
        (this.board["2"] || "  ") +
        " | " +
        (this.board["3"] || "  ")
    );
    console.log(" ");
    console.groupEnd();
  }
  checkWin() {
    if (
      (this.board[1] == this.board[2] &&
        this.board[1] == this.board[3] &&
        this.board[1] != null) ||
      (this.board[4] == this.board[5] &&
        this.board[4] == this.board[6] &&
        this.board[4] != null) ||
      (this.board[7] == this.board[8] &&
        this.board[7] == this.board[9] &&
        this.board[7] != null) ||
      (this.board[1] == this.board[4] &&
        this.board[1] == this.board[7] &&
        this.board[1] != null) ||
      (this.board[2] == this.board[5] &&
        this.board[2] == this.board[8] &&
        this.board[2] != null) ||
      (this.board[3] == this.board[6] &&
        this.board[3] == this.board[9] &&
        this.board[3] != null) ||
      (this.board[1] == this.board[5] &&
        this.board[1] == this.board[9] &&
        this.board[1] != null) ||
      (this.board[3] == this.board[5] &&
        this.board[3] == this.board[7] &&
        this.board[3] != null)
    )
      return true;

    return null;
  }

  checkIsTie() {
    return this.board.filter((item) => item).length === 9;
  }
  resetBoard() {
    this.board.fill(null);
    this.drawBoard();
  }
  isInputValid(location) {
    if (location > 9 || location < 0) {
      return false;
    }
    if (this.board[location]) return false;
    return true;
  }

  isWinner() {
    const winner = this.checkWin();
    if (winner) {
      console.log(`${this.playerTurn} Won the Game!`);
      console.log("Resetting Game! the player who won starts!!!");
      this.resetBoard();
      return true;
    }
    return false;
  }
}
