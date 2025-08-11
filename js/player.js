export default class Player {
  constructor(symbol) {
    this.symbol = symbol;
    this.wins = 0;
  }

  getSymbol() {
    return this.symbol;
  }

  getWins() {
    return this.wins;
    }

  addWin() {
    this.wins++;
  }

  resetWins() {
    this.wins = 0;
  }
}
