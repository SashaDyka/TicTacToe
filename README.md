Tic Tac Toe


This is a classic game of tic-tac-toe implemented using the Model-View-Controller (MVC) pattern.


Technologies:

  -HTML: Structure of the game board and controls.
  
  -CSS: Styling of the game interface.
  
  -JavaScript (ES6 Modules): All game logic, divided into classes according to the MVC principle.
  


Launching the project:

Clone the repository. Open the index.html file in any modern browser.



Project structure:

The project is divided into three main classes, each of which performs its own role:

    
  Board.js (Model)
  
    -This class is responsible for storing and managing data about the game board.
    
    -It stores the current state of the board (a two-dimensional array).
    
    -It manages the history of moves.

    
    Player.js (Model)
    
    -Stores the current symbol.
    
    -Stores player wins.

    
  View.js (View)
  
    -This class is responsible for displaying the interface and interacting with the user.
    
    -It draws the game board based on data from Board.
    
    -Listens for clicks on cells and buttons.
    
    -Displays the game status.

    
  Game.js (Controller)
  
    -This class is the “brain” of the game and connects Board and View.
    
    -Contains game logic (checking for wins, changing players).
    
    -Creates instances of Board and View.
    
    -Controls the game flow by responding to user actions and updating the state.
    

 
Functionality:

  Playing “Tic-tac-toe” on a field of variable size.
  
  "+" and "-" buttons to change the size of the field.

  Buttons to select a symbol (X or O).
  
  “Restart” button to start a new game.
  
  "Cancel" button to start the game again.
  
  Input at the bottom to select the number of symbols for winning.
