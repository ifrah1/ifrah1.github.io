
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
        this.remainPiecesInPlay = 4;
    }

    addPieces(obj) {
        this.pieces.push(obj);
    }

    updateRemainPieces(num) {
        this.remainPiecesInPlay -= num;
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
console.log(RED_PLAYER_PATH.indexOf(32), RED_PLAYER_PATH.indexOf(0));

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
console.log(GREEN_PLAYER_PATH.indexOf(41), GREEN_PLAYER_PATH.indexOf(0));

// Future enhancement notes: 
// will add other player paths when adding more than two players

const SAFE_SPOTS = [
    6, 20, 53, 67
];

// variables 
const $main = $('.main');
const $startGame = $('form');
const $dice = $('#dice');
const $playerTurn = $('#player-turn');
const $prevPlayerRoll = $('#prev-player-roll');
const $playerOneName = $('#player-one');
const $playerTwoName = $('#player-two');
const $homeTag = $('#home');


let numPieces = 4;                      //how many pieces for each player, we can change this in future for more pieces for longer game

let gameFinished = 0;
let startGameClicked = 0;
let currentTurn;
let rolledNum;

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
    playerOneObj.name = $playerOneName.val();
    playerTwoObj.name = $playerTwoName.val();
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
    console.log(pieces);
    return allOutPlay;
}

//returns whose turn it is 
const checkWhoseTurn = () => {
    for (let i in playersArray) {
        if (playersArray[i].playerTurn === 1) {
            return parseInt(i);
        }
    }
}


const nextPlayerTurn = (prevNum) => {
    // console.log(checkWhoseTurn());
    const turn = parseInt(checkWhoseTurn());
    if (turn === 0) {
        playerOne.playerTurn = 0;
        playerTwo.playerTurn = 1;
        $prevPlayerRoll.text(`${playersArray[currentTurn].name} rolled a ${prevNum}!`);
        currentTurn = 1;
        // console.log(currentTurn);
        $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
        $dice.text("click here to roll");
    } else if (turn === 1) {
        playerOne.playerTurn = 1;
        playerTwo.playerTurn = 0;
        $prevPlayerRoll.text(`${playersArray[currentTurn].name} rolled a ${prevNum}!`);
        currentTurn = 0;
        // console.log(currentTurn);
        $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
        $dice.text("click here to roll");
    }
    // console.log(currentTurn, playersArray[currentTurn].name);
}

const movePiece = (num, obj, evt) => {
    let parentId;
    let parentClass;
    const parentDiv = evt.target.parentNode;
    const color = obj.color;

    parentId = parentDiv.getAttribute('id');

    const newPos = findDivMovePosition(color, parentId, num)
    // console.log(newPos);
    // if (newPos === -1) {
    //     //need to add logic to see if player has any other piece in play if not then next player turn, if they do then they can move that piece instead of the one in home spaces 
    //     alert("pick another piece to move")
    //     // nextPlayerTurn(rolledNum);
    // } else {
    addRemovePosition(parentId, newPos, color);
    // }
}

const addRemovePosition = (oldPos, newPos, color) => {
    if (newPos === 0) {
        const currentPlayerObj = playersArray[checkWhoseTurn()];
        $(`#${oldPos}`).find('div:first').remove();
        //updates player pieces info of how many left to get to home
        currentPlayerObj.updateRemainPieces(1)
        //updates the pieces to -999 meaning it has reached home
        removePlayerPieces(currentPlayerObj.pieces);
        console.log(currentPlayerObj.remainPiecesInPlay);
    } else {
        newPos = newPos.toString();
        // console.log(newPos, oldPos);
        //removes the old spot
        // $(`#${oldPos}`).empty();
        $(`#${oldPos}`).find('div:first').remove();
        //adds to new spot
        $(`#${newPos}`).append(`<div class="piece ${color}-in play"></div>`)
    }

}

const findDivMovePosition = (color, currentDivId, rollNum) => {
    console.log(color, currentDivId);
    currentDivId = parseInt(currentDivId);
    let newDivPosition;
    let currentIdx

    if (color === 'red') {
        // RED_PLAYER_PATH
        currentIdx = RED_PLAYER_PATH.indexOf(currentDivId);
        // newDivPosition = currentIdx + rollNum;

        //add logic to make sure div can reach home
        newDivPosition = pieceHomeCheck(currentIdx);

        if (newDivPosition === -1) {
            return -1
        } else {
            return (RED_PLAYER_PATH[newDivPosition]);
        }
    } else if (color === 'green') {
        // RED_PLAYER_PATH
        currentIdx = GREEN_PLAYER_PATH.indexOf(currentDivId);
        // newDivPosition = currentIdx + rollNum;
        //add logic to make sure div can reach home
        newDivPosition = pieceHomeCheck(currentIdx);

        if (newDivPosition === -1) {
            return -1
        } else {
            return (GREEN_PLAYER_PATH[newDivPosition]);
        }
    }

}

const pieceHomeCheck = idxPos => {
    if (idxPos >= 50) {
        const newPos = idxPos + rolledNum
        if (newPos > 56) {
            return -1;
        } else {
            return newPos;
        }
    } else {
        return idxPos + rolledNum;
    }
}

const removePlayerPieces = (arrPieces) => {
    for (let obj of arrPieces) {
        if (obj.inPlayStatus === 1) {
            obj.inPlayStatus = -999;
            obj.positionOnBoard = -999;
            // console.log(playerObj);
            return;
        }
    }
}


const addPieceFromBase = (playerObj, evt) => {
    // console.log("made to addPiece");
    if (evt.target.id === `${playerObj.color}-inner-base`) {
        alert("click a piece");
    } else {
        $(`#${playerObj.start}`).append(`<div class="piece ${playerObj.color}-in play"></div>`);
        //removes the pieces once its in play
        evt.target.remove();
    }
    updatePlayerPiece(playerObj);
    return;
}

//function to update player object to show piece is in play
const updatePlayerPiece = playerObj => {
    for (let key in playerObj) {
        if (key === 'pieces') {
            for (let ele of playerObj[key]) {
                if (ele.inPlayStatus === 0
                    && ele.positionOnBoard === -1) {
                    ele.inPlayStatus = 1;
                    ele.positionOnBoard = playerObj.start;
                    // console.log(playerObj);
                    return;
                }
            }
        }
    }
}

const numPieceInBoard = arrPiecesObj => {
    let count = 0;

    arrPiecesObj.forEach(obj => {
        if (obj.inPlayStatus !== -999) {
            count += obj.inPlayStatus;
        }
    });
    return count;
}


const mainHandler = evt => {
    evt.preventDefault();
    // console.log(evt.target.getAttribute("class"))
    const currentPlayerObj = playersArray[checkWhoseTurn()];

    //does nothing if user does not click on the cilckable divs
    if (evt.target.getAttribute("type") !== "submit"
        && evt.target.getAttribute("type") !== "text"
        && evt.target.getAttribute("id") !== "dice"
        && evt.target.getAttribute("class") !== `piece ${currentPlayerObj.color}-in`
        && evt.target.getAttribute("class") !== `piece ${currentPlayerObj.color}-in play`) {
        // alert("wrong spot clicked");
        // console.log(evt.target.getAttribute('id'));
        return;
    }

    //if submit hit then will add the players name
    if (evt.target.getAttribute("type") === "submit"
        && playersArray[0].name === ""
        && playersArray[1].name === "") {
        // console.log(evt.target.getAttribute("type"));
        // console.log(playersArray[0].name, playersArray[1].name)
        setUpPlayers(playerOne, playerTwo);
        startGameClicked = 1;
        currentTurn = checkWhoseTurn();
        $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
        // console.log(playersArray[0].name, playersArray[1].name)
    }

    if (evt.target.getAttribute("id") === "dice") {
        // console.log("clicked dice");
        rolledNum = diceRoll();
    }

    //check to see if all pieces for current player is out
    //note to self: think I do not need this anymore, comback
    const allOut = checkPlayerPieces(currentPlayerObj);

    //if player has all pieces out and does not roll six then switch player
    if (allOut && rolledNum < 6) {
        nextPlayerTurn(rolledNum);
    }
    console.log(allOut);
    //add piece when player hits 6 and they click on add piece 
    if (evt.target.getAttribute("class") === `piece ${currentPlayerObj.color}-in`) {
        // console.log(evt.target.getAttribute("class"))
        if (allOut && rolledNum === 6) {
            addPieceFromBase(currentPlayerObj, evt);
        } else if (rolledNum === 6) {
            addPieceFromBase(currentPlayerObj, evt);
        }
    }

    if (evt.target.getAttribute("class") === `piece ${currentPlayerObj.color}-in play`) {
        // console.log(evt.target.getAttribute("class"));
        // let test = findDivMovePosition(currentPlayerObj.color, evt.target.parentNode.getAttribute('id'), rolledNum);
        // console.log(test);
        const piecePos = findDivMovePosition(currentPlayerObj.color, evt.target.parentNode.getAttribute('id'), rolledNum);

        if (rolledNum === 6 && piecePos !== -1) {
            movePiece(rolledNum, currentPlayerObj, evt);
        } else if (piecePos === -1) {
            const numInBoard = numPieceInBoard(currentPlayerObj.pieces);
            // console.log(numInBoard);
            if (allOut || numInBoard === 1) {
                alert("Cannot move that piece and no other piece to move, NEXT PLAYER TURN");
                nextPlayerTurn(rolledNum);
            } else if (numInBoard > 1) {
                //need to add logic if all pieces are inside then cannot make a move if number to big
                //check to see all position of pieces 
                //if no piece can make move then next player turn

                //will add below into its own function later: ------
                /*-------------------------------------------------*/
                const $allPieces = $(`.play`)
                const currentPlayerPieces = [];

                $allPieces.each(function (idx) {
                    console.log(this.getAttribute('class'));
                    console.log(this.parentNode.getAttribute('id'));
                    if (this.getAttribute('class') === `piece ${currentPlayerObj.color}-in play`) {
                        currentPlayerPieces.push(findDivMovePosition(currentPlayerObj.color, this.parentNode.getAttribute('id'), rolledNum));

                        // total += (findDivMovePosition(currentPlayerObj.color, this.parentNode.getAttribute('id'), rolledNum));
                    }
                });
                console.log(currentPlayerPieces);
                // console.log(total);
                //checks through the array to see if the position returned is greater than zero which means another piece can be moved instead of the chosen one
                //reference google .some vs .every
                //used some cause just need one number to be greater than or equal to zero
                //where .every makes sure all numbers are
                const hasMove = currentPlayerPieces.some(ele => ele >= 0);
                console.log(hasMove);

                if (!hasMove) {
                    alert("no pieces to move, next player turn");
                    nextPlayerTurn(rolledNum);
                } else if (hasMove) {
                    alert("please pick another piece that can be moved");
                } else {
                    movePiece(rolledNum, currentPlayerObj, evt);
                    nextPlayerTurn(rolledNum);
                }
                /*-----------------move later-----------------------*/

            } else {
                alert("Please pick another piece on board to move");
            }
        } else {
            movePiece(rolledNum, currentPlayerObj, evt);
            nextPlayerTurn(rolledNum);
        }

    }


    // console.log(evt.target.getAttribute("class"));
}

const gameStart = () => {
    $main.on('click', mainHandler);
}
gameStart();


