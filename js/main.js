import Board from './board.js';
import View from './view.js';
import Player from './player.js';
import GameController from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        boardElement: document.getElementById('gameBoard'),
        statusText: document.getElementById('status'),
        chooseXBtn: document.getElementById('chooseX'),
        chooseOBtn: document.getElementById('chooseO'),
        undoBtn: document.getElementById('undoBtn'),
        resetBtn: document.getElementById('resetBtn'),
        reduceBtn: document.getElementById('reduceBtn'),
        enlargeBtn: document.getElementById('enlargeBtn'),
    };  
    const game = new GameController(elements);
    game.startGame(); 
});






