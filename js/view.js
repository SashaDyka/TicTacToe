class boardView{
    constructor(elements){
        this.boardElement = boardElement;
        this.statusText = statusText;
        this.chooseXBtn = chooseXBtn;
        this.chooseOBtn = chooseOBtn;
        this.undoBtn = undoBtn;
        this.resetBtn = resetBtn;
        this.reduceBtn = reduceBtn;
        this.enlargeBtn = enlargeBtn; 
              
    }

    drawBoard(size){
        this.currentSize = size;
        this.boardElement.innerHTML = '';

        this.boardElement.style.gridTemplateColumns = `repeat(${this.currentSize}, 1fr)`;
        this.boardElement.style.gridTemplateRow = `repeat(${this.currentSize}, 1fr)`;

        for(let row=0; row < this.currentSize; row++){
            for(let column=0; column < this.currentSize; column++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                
                cell.dataset.row = row;
                cell.dataset.column = column;
                cell.addEventListener('click', () => this.handleClick(row, column));  /*move to game class*/
                this.boardElement.appendChild(cell);
            }
        }
    }

    handleClick(row, column) {
        if (!this.gameActive || this.board[row][column]) {
            return;
        }

        const currentSymbol = this.currentPlayer;
        this.history.push({ row, column, symbol: currentSymbol });

        this.board[row][column] = currentSymbol;
        const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        cell.textContent = currentSymbol;

        const winner = this.checkWinner();
        if (winner) {
            statusText.textContent = `Player ${winner} won!`;
            this.gameActive = false;
            return;
        }

        if (this.checkTie()) {
            statusText.textContent = `Tie!`;
            this.gameActive = false;
            return;
        }

        this.currentPlayer = currentSymbol === crossSymbol ? zeroSymbol : crossSymbol;
        statusText.textContent = `Player ${this.currentPlayer} turn`;
    }

    checkBoardSize(){
        if(this.currentSize <= 7){
            this.boardElement.classList.add('fixed-size');
            this.boardElement.classList.remove('fullscreen');            
        }else {
            this.boardElement.classList.add('fullscreen');
            this.boardElement.classList.remove('fixed-size');
        }
    }

    clearBoard(){
        this.boardElement.innerHTML = '';
    }

    clearCell(row, col) {
        const cell = this.boardElement.querySelector(`[data-row="${row}"][data-column="${col}"]`);
        if (cell) {
            cell.textContent = '';
        }
    }
    
    enlargeBoardSize() {
        if (this.currentSizeIndex < this.ollSizes.length - 1) {
            this.currentSizeIndex++;
            this.drawBoard();
        }
    }

    reduceBoardSize(){
        if(this.currentSizeIndex > 0) {
        this.currentSizeIndex--;
        this.drawBoard();
        }
    }


}
