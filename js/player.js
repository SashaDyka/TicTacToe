export default class Player {
  constructor(symbol) {
    this.symbol = symbol;
    this.wins = this.loadWins();
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

  saveWins() {
    localStorage.setItem(`ticTacToeWins_${this.symbol}`, this.wins);
  }

  loadWins() {
    const wins = localStorage.getItem(`ticTacToeWins_${this.symbol}`);
    if (wins) {
      return parseInt(wins, 10);
    }else {
        return 0;
      }
    }


}
