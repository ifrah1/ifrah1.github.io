
//class to create player objects 
class Player {
    constructor(name, color, playerTurn, start, pieces) {
        this.name = name;
        //holds the color of the player
        this.color = color;
        //this lets us know which player turn it is
        //0 means not player turn and 1 means player turn
        this.playerTurn = playerTurn;
        //holds obj of arrays of pieces for player (four pieces for now)
        this.start = start;
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
        //-999 means the piece is at home and out of game
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
let startGameClicked = 0;
let currentTurn;

//player objects for now two
const playerOne = new Player("", 'red', 1, '20');
const playerTwo = new Player("", 'green', 0, '53');

const playersArray = [playerOne, playerTwo];

// console.log(playersArray);

// will generate random number between 1-6 for dice
const diceRoll = () => {
    //random between 1-6
    const randomNum = Math.floor(Math.random() * 6) + 1;
    //add the text to the div
    if (startGameClicked === 1) {
        $dice.text(randomNum);
    } else {
        alert("Please start game first!");
    }
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
const checkPlayerPieces = (obj) => {
    const pieces = obj.pieces;
    // console.log(pieces);

    let allOutPlay = true;

    pieces.forEach(obj => {
        if (obj.inPlayStatus === 1) {
            allOutPlay = false;
        }
    })
    return allOutPlay;
}

//returns whose turn it is 
const checkWhoseTurn = () => {
    for (let i in playersArray) {
        if (playersArray[i].playerTurn === 1) {
            return i;
        }
    }
}

//adds pieces when player rolls a 6 
const addPieces = (obj) => {
    const color = obj.color;
    const start = obj.start
    //need to make it dynamic next 
    $(`#${color}-inner-base`).on('click', evt => {
        // console.log(evt.target);
        // console.log(evt.target.id)
        if (evt.target.id === `${color}-inner-base`) {
            alert("click a piece");
        } else {
            $(`#${start}`).append(`<div class="piece ${color}-in play"></div>`);
            //removes the pieces once its in play
            evt.target.remove();
        }
    });

    for (let key in obj) {
        if (key === 'pieces') {
            for (let ele of obj[key]) {
                // console.log(ele);
                if (ele.inPlayStatus === 0 && ele.positionOnBoard === -1) {
                    ele.inPlayStatus = 1;
                    ele.positionOnBoard = obj.start;
                    break;
                }
            }
        }
    }
    // console.log(obj);
    return;
    // console.log(color, start);
}

const nextPlayerTurn = () => {
    // console.log(checkWhoseTurn());
    const turn = parseInt(checkWhoseTurn());
    if (turn === 0) {
        playerOne.playerTurn = 0;
        playerTwo.playerTurn = 1;
        currentTurn = 1;
        // console.log(currentTurn);
        $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
    } else if (turn === 1) {
        playerOne.playerTurn = 1;
        playerTwo.playerTurn = 0;
        currentTurn = 0;
        // console.log(currentTurn);
        $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
    }
    // console.log(currentTurn, playersArray[currentTurn].name);
}

const movePiece = (num, obj) => {
    let parentId;
    // const $pieceClass = `.piece ${obj.color}-in play`
    $('.play').on('click', evt => {
        // parentId = evt.target.parent().attr('id');
        const parentDiv = evt.target.parentNode;
        parentId = parentDiv.getAttribute('id');
        console.log(parentId);

        const newPos = findDivMovePosition(obj.color, parentId, num)
        console.log(newPos);
        addRemovePosition(parentId, newPos, obj.color);
    });

}

const addRemovePosition = (oldPos, newPos, color) => {
    newPos = newPos.toString();
    // console.log(newPos, oldPos);
    //removes the old spot
    $(`#${oldPos}`).empty();
    //adds to new spot
    $(`#${newPos}`).append(`<div class="piece ${color}-in play"></div>`)

}

const findDivMovePosition = (color, currentDivId, rollNum) => {
    console.log(color, currentDivId);
    currentDivId = parseInt(currentDivId);
    let newDivPosition;
    let currentIdx

    if (color === 'red') {
        // RED_PLAYER_PATH
        currentIdx = RED_PLAYER_PATH.indexOf(currentDivId);
        newDivPosition = currentIdx + rollNum;

        return (RED_PLAYER_PATH[newDivPosition]);

    } else if (color === 'green') {
        // RED_PLAYER_PATH
        currentIdx = GREEN_PLAYER_PATH.indexOf(currentDivId);
        newDivPosition = currentIdx + rollNum;
        return (GREEN_PLAYER_PATH[newDivPosition]);
    }

}

const submitHandler = evt => {
    evt.preventDefault();
    setUpPlayers(playerOne, playerTwo);
    startGameClicked = 1;
    // console.log(checkWhoseTurn());
    currentTurn = checkWhoseTurn();
    $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
}

const diceHandler = evt => {
    evt.preventDefault();

    const rolledNum = diceRoll();
    // console.log(playersArray[currentTurn]);
    const allOut = checkPlayerPieces(playersArray[currentTurn]);
    // console.log(allOut);
    // console.log("rolled num = ", rolledNum);
    // debugger;
    if (allOut && rolledNum === 6) {
        addPieces(playersArray[currentTurn]);
    } else if (allOut && rolledNum < 6) {
        nextPlayerTurn();
    } else {
        console.log("got here");
        movePiece(rolledNum, playersArray[currentTurn]);
    }
}

// start game will put whole game together 
const gameStart = () => {
    $startGame.on('submit', submitHandler);
    // console.log(playerOne, playerTwo);
    $dice.on('click', diceHandler);
}

gameStart();


