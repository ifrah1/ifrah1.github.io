console.log("test");

//class to create player objects 
class Player {
    constructor(name, color, playerTurn, pieces) {
        this.name = name;
        //holds the color of the player
        this.color = color;
        //this lets us know which player turn it is
        //0 means not player turn and 1 means player turn
        this.playerTurn = playerTurn;
        //holds obj of arrays of pieces for player (four pieces for now)
        this.pieces = pieces || [];
    }

    addPieces(obj) {
        this.pieces.push(obj);
    }
}

class PlayerPieces {
    constructor(inPlayStatus, positionOnBoard, color) {
        //play status = 0 meaning player needs to roll a 6 
        //player status = 1 meaning piece is in play 
        this.inPlayStatus = inPlayStatus || 0;
        //position on board is the div the piece is at
        //by default it is -1 meaning the piece is not in play 
        this.positionOnBoard = positionOnBoard;
        this.color = color;
    }
}

// CONSTANT Variables 
const RED_PLAYER_PATH = [
    20, 21, 22, 23, 24,
    16, 13, 10, 7, 4,
    1, 2, 3,
    6, 9, 12, 15, 18,
    25, 26, 27, 28, 29,
    30, 42, 54,
    53, 52, 51, 50, 49,
    57, 60, 63, 66, 69,
    72, 71, 70,
    67, 64, 61, 58, 55,
    48, 47, 46, 45, 44,
    43, 31,
    32, 33, 34, 35, 36,
    0
];

const GREEN_PLAYER_PATH = [
    53, 52, 51, 50, 49,
    57, 60, 63, 66, 69,
    72, 71, 70,
    67, 64, 61, 58, 55,
    48, 47, 46, 45, 44,
    43, 31, 19,
    20, 21, 22, 23, 24,
    16, 13, 10, 7, 4,
    1, 2, 3,
    6, 9, 12, 15, 18,
    25, 26, 27, 28, 29,
    30, 42,
    41, 40, 39, 38, 37,
    0
];
// Future enhancement notes: 
// will add other player paths when adding more than two players

const SAFE_SPOTS = [
    6, 20, 53, 67
];

// variables 
const $startGame = $('form');
const $dice = $('#dice');
const $playerTurn = $('#player-turn')

let numPieces = 4;                      //how many pieces for each player, we can change this in future for more pieces for longer game

let gameFinished = 0;

//player objects for now two
const playerOne = new Player("", 'red', 1);
const playerTwo = new Player("", 'green', 0);


// will generate random number between 1-6 for dice
const diceRoll = () => {
    //random between 1-6
    const randomNum = Math.floor(Math.random() * 6) + 1;
    //add the text to the div
    $dice.text(randomNum);
    return randomNum;
}

//creates the four pieces for the players 
const createPieces = playerObj => {
    for (let i = 0; i < numPieces; i++) {
        const piece = new PlayerPieces(0, -1, playerObj.color);
        playerObj.addPieces(piece);
    }
}
//testing for createPieces
// createPieces(playerOne);
// createPieces(playerTwo);
// console.log(playerOne);
// console.log(playerTwo);

const setUpPlayers = (playerOneObj, playerTwoObj) => {
    //add input names to player objects 
    playerOneObj.name = $('#player-one').val();
    playerTwoObj.name = $('#player-two').val();
    //create the pieces 
    createPieces(playerOneObj);
    createPieces(playerTwoObj);
    //make sure name are added
    // console.log(playerOne.name, playerTwo.name);
}

// const setPlayerPiece = (num, playerObj) => {
//     if (num === 6) {
//         playerObj.pi
//     }
// }

const submitHandler = evt => {
    evt.preventDefault();
    setUpPlayers(playerOne, playerTwo);
    $playerTurn.text(`${playerOne.name} turn!`);
}

const diceHandler = evt => {
    evt.preventDefault();
    const rolledNum = diceRoll();
}

// start game will put whole game together 
const gameStart = () => {
    $startGame.on('submit', submitHandler);
    console.log(playerOne, playerTwo);
    $dice.on('click', diceHandler);
}

gameStart();


