 export class Board{
    constructor(board){
        this.boardElement = board;
        this.allSizes = [3, 5, 7, 20, 50, 100];

        this.currentSizeIndex = 0;
        this.maxSize = 100;
        this.board = this.createBoard(this.currentSize); 
        
    }

    get currentSize(){
        return this.allSizes[this.currentSizeIndex];
    }

    createBoard(size){
        return Array.from({ length: size}, () => Array(size).fill(null));
    }


    drawBoard(){
        this.boardElement.innerHTML = '';

        this.boardElement.style.gridTemplateColumns = `repeat(${this.currentSize}, 1fr)`;
        this.boardElement.style.gridTemplateRow = `repeat(${this.currentSize}, 1fr)`;

        for(let row=0; row < this.currentSize; row++){
            for(let column=0; column < this.currentSize; column++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                
                cell.dataset.row = row;
                cell.dataset.column = column;
                cell.addEventListener('click', () => this.handleClick(row, column));  /*not clean*/
                this.boardElement.appendChild(cell);
            }
        }
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


    renderBoard(){
        this.checkBoardSize(); 
        this.drawBoard();      
    }



}

