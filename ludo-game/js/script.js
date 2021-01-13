// //class to create player objects
// class Player {
//     constructor(name, color, playerTurn, start, pieces) {
//         //players name that was entered
//         this.name = name;
//         //holds the color of the player
//         this.color = color;
//         //this lets us know which player turn it is
//         //0 means not player turn and 1 means player turn
//         this.playerTurn = playerTurn;
//         //holds obj of arrays of pieces for player (four pieces for now)
//         this.start = start;
//         this.pieces = pieces || [];
//         this.remainPiecesInPlay = 4;
//         //play status = 0 meaning player needs to roll a 6 
//         //player status = 1 meaning piece is in play
//         this.newPieces = [0, 0, 0, 0];  //change variable later

//     }

//     addPieces(obj) {
//         this.pieces.push(obj);
//     }

//     updateRemainPieces(num) {
//         this.remainPiecesInPlay -= num;
//     }
// }

// class PlayerPieces {
//     constructor(inPlayStatus, positionOnBoard, color) {
//         //play status = 0 meaning player needs to roll a 6 
//         //player status = 1 meaning piece is in play 
//         this.inPlayStatus = inPlayStatus || 0;
//         //position on board is the div the piece is at
//         //by default it is -1 meaning the piece is not in play 
//         //-999 means the piece is at home and out of game
//         this.positionOnBoard = positionOnBoard;
//         this.color = color;
//     }
// }

// // CONSTANT Variables 
// const RED_PLAYER_PATH = [
//     20, 21, 22, 23, 24,
//     16, 13, 10, 7, 4,
//     1, 2, 3,
//     6, 9, 12, 15, 18,
//     25, 26, 27, 28, 29,
//     30, 42, 54,
//     53, 52, 51, 50, 49,
//     57, 60, 63, 66, 69,
//     72, 71, 70,
//     67, 64, 61, 58, 55,
//     48, 47, 46, 45, 44,
//     43, 31,
//     32, 33, 34, 35, 36,
//     0
// ];

// const BLUE_PLAYER_PATH = [
//     6, 9, 12, 15, 18,
//     25, 26, 27, 28, 29,
//     30, 42, 54,
//     53, 52, 51, 50, 49,
//     57, 60, 63, 66, 69,
//     72, 71, 70,
//     67, 64, 61, 58, 55,
//     48, 47, 46, 45, 44,
//     43, 31, 19,
//     20, 21, 22, 23, 24,
//     16, 13, 10, 7, 4,
//     1, 2,
//     5, 8, 11, 14, 17,
//     0
// ];

// const GREEN_PLAYER_PATH = [
//     53, 52, 51, 50, 49,
//     57, 60, 63, 66, 69,
//     72, 71, 70,
//     67, 64, 61, 58, 55,
//     48, 47, 46, 45, 44,
//     43, 31, 19,
//     20, 21, 22, 23, 24,
//     16, 13, 10, 7, 4,
//     1, 2, 3,
//     6, 9, 12, 15, 18,
//     25, 26, 27, 28, 29,
//     30, 42,
//     41, 40, 39, 38, 37,
//     0
// ];


// const YELLOW_PLAYER_PATH = [
//     67, 64, 61, 58, 55,
//     48, 47, 46, 45, 44,
//     43, 31, 19,
//     20, 21, 22, 23, 24,
//     16, 13, 10, 7, 4,
//     1, 2, 3,
//     6, 9, 12, 15, 18,
//     25, 26, 27, 28, 29,
//     30, 42, 54,
//     53, 52, 51, 50, 49,
//     57, 60, 63, 66, 69,
//     72, 71,
//     68, 65, 62, 59, 56,
//     0
// ];

// // Future enhancement notes: 
// // will add other player paths when adding more than two players

// const SAFE_SPOTS = [
//     5, 6, 8, 11, 14, 17,     // blue safe spots
//     20, 32, 33, 34, 35, 36,  // red safe spots
//     37, 38, 39, 40, 41, 53,  // green safe spots
//     56, 59, 62, 65, 68, 67   // yellow safe spots
// ];

// // variables 
// const $main = $('.main');
// const $startGame = $('form');

// const $dice = $('#dice');
// const $prevPlayerRoll = $('#prev-player-roll');

// const $playerTurn = $('#player-turn');
// const $playerOneName = $('#player-one');
// const $playerTwoName = $('#player-two');

// let numPieces = 4;                      //how many pieces for each player, we can change this in future for more pieces for longer game

// //flag to end game, 0 means game is not over and 1 means over
// let gameFinished = 0;
// //flag to make sure user clicked start game, 1 means game started, 0 means game has not started 
// let startGameClicked = 0;

// let currentTurn;
// let rolledNum = null;

// //player objects for now two
// const playerOne = new Player("", 'red', 1, '20');
// // const playerTwo = new Player("", 'blue', 0, '6');
// const playerTwo = new Player("", 'green', 0, '53');
// // const playerThree = new Player("", 'green', 0, '53');
// // const playerFour = new Player("", 'yellow', 0, '67');

// const playersArray = [playerOne, playerTwo];
// // const playersArray = [playerOne, playerTwo,playerThree,playerFour];


// const setUpPlayers = (playerOneObj, playerTwoObj) => {
//     //add input names to player objects 
//     playerOneObj.name = $playerOneName.val();
//     playerTwoObj.name = $playerTwoName.val();
//     //create the pieces 
//     createPieces(playerOneObj);
//     createPieces(playerTwoObj);

// }

// //creates the four pieces for the players 
// const createPieces = playerObj => {
//     for (let i = 0; i < numPieces; i++) {
//         const piece = new PlayerPieces(0, -1, playerObj.color);
//         playerObj.addPieces(piece);
//     }
// }


// // will generate random number between 1-6 for dice
// const diceRoll = () => {
//     //random between 1-6
//     const randomNum = Math.floor(Math.random() * 6) + 1;
//     $dice.text(randomNum);

//     return randomNum;
// }

// // check to see if all current player has any piece on board
// // will return true if no piece on board and all piece is out of play
// const checkPlayerPieces = (obj) => {
//     const pieces = obj.pieces;

//     let allOutPlay = true;

//     pieces.forEach(obj => {
//         if (obj.inPlayStatus === 1) {
//             allOutPlay = false;
//         }
//     })

//     return allOutPlay;
// }

// //returns whose turn it is 
// const checkWhoseTurn = () => {
//     for (let i in playersArray) {
//         if (playersArray[i].playerTurn === 1) {
//             return parseInt(i);
//         }
//     }
// }

// // this function switches to the next player
// // future enhancement notes: change logic to handle for more than two players  
// const nextPlayerTurn = (prevNum) => {
//     const turn = parseInt(checkWhoseTurn());
//     if (turn === 0) {
//         playerOne.playerTurn = 0;
//         playerTwo.playerTurn = 1;
//         $prevPlayerRoll.text(`${playersArray[currentTurn].name} rolled a ${prevNum}!`);

//         currentTurn = 1;

//         $playerTurn.text(`${playersArray[currentTurn].name}'s turn!`);
//         $dice.text("click here to roll")
//             .css('color', `${playersArray[currentTurn].color}`);;
//     } else if (turn === 1) {
//         playerOne.playerTurn = 1;
//         playerTwo.playerTurn = 0;
//         $prevPlayerRoll.text(`${playersArray[currentTurn].name} rolled a ${prevNum}!`);

//         currentTurn = 0;

//         $playerTurn.text(`${playersArray[currentTurn].name}'s turn!`);
//         $dice.text("click here to roll")
//             .css('color', `${playersArray[currentTurn].color}`);
//     }
//     // later use when adding more players 
//     // else if (turn === 2) {
//     //     playerThree.playerTurn = 0;
//     //     playerFour.playerTurn = 1;
//     //     $prevPlayerRoll.text(`${playersArray[currentTurn].name} rolled a ${prevNum}!`);

//     //     currentTurn = 3;

//     //     $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
//     //     $dice.text("click here to roll");
//     // }else if (turn === 3) {
//     //     playerFour.playerTurn = 0;
//     //     playerOne.playerTurn = 1;
//     //     $prevPlayerRoll.text(`${playersArray[currentTurn].name} rolled a ${prevNum}!`);

//     //     currentTurn = 0;

//     //     $playerTurn.text(`${playersArray[currentTurn].name} turn!`);
//     //     $dice.text("click here to roll");
//     // }

//     //reset num to null so next player can roll with no prev num
//     rolledNum = null;

//     return;
// }

// const movePiece = (num, obj, evt) => {
//     let parentId;
//     let parentClass;
//     const parentDiv = evt.target.parentNode;
//     const color = obj.color;

//     parentId = parentDiv.getAttribute('id');

//     const newPos = findDivMovePosition(color, parentId, num)

//     addRemovePosition(parentId, newPos, color);
// }

// const findDivMovePosition = (color, currentDivId, rollNum) => {
//     currentDivId = parseInt(currentDivId);
//     let newDivPosition;
//     let currentIdx

//     if (color === 'red') {
//         // RED_PLAYER_PATH
//         currentIdx = RED_PLAYER_PATH.indexOf(currentDivId);

//         //add logic to make sure div can reach home
//         newDivPosition = pieceHomeCheck(currentIdx);

//         if (newDivPosition === -1) {
//             return -1
//         } else {
//             return (RED_PLAYER_PATH[newDivPosition]);
//         }
//     } else if (color === 'green') {
//         // GREEN_PLAYER_PATH
//         currentIdx = GREEN_PLAYER_PATH.indexOf(currentDivId);

//         //add logic to make sure div can reach home
//         newDivPosition = pieceHomeCheck(currentIdx);

//         if (newDivPosition === -1) {
//             return -1
//         } else {
//             return (GREEN_PLAYER_PATH[newDivPosition]);
//         }
//     }

// }

// const addRemovePosition = (oldPos, newPos, color) => {
//     if (newPos === 0) {
//         const currentPlayerObj = playersArray[checkWhoseTurn()];
//         $(`#${oldPos}`).find('div:first').remove();
//         //updates player pieces info of how many left to get to home
//         currentPlayerObj.updateRemainPieces(1)
//         //check if player has no more pieces remaining 
//         //did arrays check length since only two plyers 
//         //in future when more players will be added then we want game to keep going till one player left who is loser
//         if (playersArray.length === 2) {
//             if (currentPlayerObj.remainPiecesInPlay === 0) {
//                 displayWinner(currentPlayerObj);
//             }
//         }
//         //updates the pieces to -999 meaning it has reached home
//         removePlayerPieces(currentPlayerObj.pieces);
//         console.log(currentPlayerObj.remainPiecesInPlay);
//     } else {
//         // check to see if another player piece is in the new spot
//         // if so run kill function to send it back to its base
//         if (($(`#${newPos}`).children().length > 0)
//             && !SAFE_SPOTS.includes(newPos)) {
//             // console.log("call kill function");
//             killOtherPiece(newPos);
//         }
//         newPos = newPos.toString();

//         /* below statement finds the first div with given combined  
//         class name (multi class selector)
//         then grabs the first one and then removes it
//         */
//         $(`#${oldPos}`).find(`div.${color}-in.play`).first().remove();
//         // adds to new spot
//         $(`#${newPos}`).append(`<div class="piece ${color}-in play"></div>`)
//     }
// }

// const killOtherPiece = newPos => {
//     //grab the class of the kill piece
//     const killPieceClass = $(`#${newPos}`).find('.play').attr('class');

//     //use substring to grab just the color of the kill piece 
//     const killPieceColor = killPieceClass.substring(6, killPieceClass.indexOf('-'));
//     //remove the other player piece
//     $(`#${newPos}`).find(`div.${killPieceColor}-in.play`).first().remove();

//     //update the otherPlayer pieces info for that player obj
//     if (killPieceColor === 'red') {
//         returnPlayerPiece(playerOne);
//     } else if (killPieceColor === 'green') {
//         returnPlayerPiece(playerTwo);
//     }//will add other players later

//     return;
// }

// const returnPlayerPiece = playerObj => {
//     //loop through to find a piece that is in play and put first one found out of play
//     for (let key in playerObj) {
//         if (key === 'pieces') {
//             for (let ele of playerObj[key]) {
//                 if (ele.inPlayStatus === 1
//                     && ele.positionOnBoard === playerObj.start) {
//                     ele.inPlayStatus = 0;
//                     ele.positionOnBoard = -1;
//                     break;
//                 }
//             }
//         }
//     }
//     //next return that piece to the player base and show up
//     $(`#${playerObj.color}-inner-base`).append(`<div class="piece ${playerObj.color}-in"></div>`);

//     return;
// }

// const pieceHomeCheck = idxPos => {
//     if (idxPos >= 50) {
//         const newPos = idxPos + rolledNum
//         if (newPos > 56) {
//             return -1;
//         } else {
//             return newPos;
//         }
//     } else {
//         return idxPos + rolledNum;
//     }
// }

// const removePlayerPieces = (arrPieces) => {
//     for (let obj of arrPieces) {
//         if (obj.inPlayStatus === 1) {
//             obj.inPlayStatus = -999;
//             obj.positionOnBoard = -999;
//             return;
//         }
//     }
// }

// const addPieceFromBase = (playerObj, evt) => {
//     if (evt.target.id === `${playerObj.color}-inner-base`) {
//         return alert("click a piece");
//     } else {
//         $(`#${playerObj.start}`).append(`<div class="piece ${playerObj.color}-in play"></div>`);
//         //removes the pieces once its in play
//         evt.target.remove();
//     }
//     updatePlayerPiece(playerObj);
//     $prevPlayerRoll.text(`${playerObj.name} rolled a ${rolledNum}!`)
//     rolledNum = null;
//     $dice.text("click here to roll");
//     return;
// }

// //function to update player object to show piece is in play
// const updatePlayerPiece = playerObj => {
//     for (let key in playerObj) {
//         if (key === 'pieces') {
//             for (let ele of playerObj[key]) {
//                 if (ele.inPlayStatus === 0
//                     && ele.positionOnBoard === -1) {
//                     ele.inPlayStatus = 1;
//                     ele.positionOnBoard = playerObj.start;
//                     // console.log(playerObj);
//                     return;
//                 }
//             }
//         }
//     }
// }

// //checks how many more pieces are left that have not reached home
// const numPieceInBoard = arrPiecesObj => {
//     let count = 0;

//     arrPiecesObj.forEach(obj => {
//         if (obj.inPlayStatus !== -999) {
//             count += obj.inPlayStatus;
//         }
//     });
//     return count;
// }

// const displayWinner = playerObj => {
//     const playerWin = `${playerObj.name} has WON!!!!`
//     gameFinished = 1;

//     alert(playerWin)
//     $prevPlayerRoll.text(playerWin);
//     $playerTurn.text(playerWin);
//     $dice.text("Game Over!");
// }

// const mainHandler = evt => {
//     evt.preventDefault();
//     //grabs current player object
//     const currentPlayerObj = playersArray[checkWhoseTurn()];

//     //create a variable called evtAttribute
//     // const evtAttributeClass = evt.target.getAttribute('class')
//     // const evtAttributeId = evt.target.getAttribute('id')
//     // const evtAttributeType = evt.target.getAttribute('class')

//     //send to a function called invalidClick thats takes evt object and player obj and returns true or false
//     //if false exit event handler (return) else keep going
//     //does nothing if user does not click on the clickable divs
//     if (evt.target.getAttribute("type") !== "submit"
//         // && evt.target.getAttribute("type") !== "text"
//         && evt.target.getAttribute("id") !== "dice"
//         && evt.target.getAttribute("class") !== `piece ${currentPlayerObj.color}-in`
//         && evt.target.getAttribute("class") !== `piece ${currentPlayerObj.color}-in play`) {
//         // alert("wrong spot clicked");
//         // console.log(evt.target.getAttribute('id'));
//         if (gameFinished === 1) {

//             displayWinner(currentPlayerObj);
//             return
//         }
//         return;
//     }

//     //create function that will set up the pieces and players when start game submit button is clicked 
//     //if submit hit then will add the players name
//     if (evt.target.getAttribute("type") === "submit") {
//         if ($playerOneName.val() === ""
//             || $playerTwoName.val() === "") {
//             alert('Please enter red and green player names');
//             return;
//         }
//         setUpPlayers(playerOne, playerTwo);
//         startGameClicked = 1;

//         currentTurn = checkWhoseTurn();
//         $playerTurn.text(`${playersArray[currentTurn].name}'s turn!`);

//         return;
//     }

//     //create function that will roll dice
//     if (evt.target.getAttribute("id") === "dice") {
//         if (gameFinished === 1) {
//             return alert("Game Over");
//         }

//         if (startGameClicked === 1) {
//             if (rolledNum === null) {
//                 rolledNum = diceRoll();
//             } else {
//                 return alert("Already rolled, Please click a piece to move or end turn");
//             }
//         } else {
//             return alert("Please start game first");
//         }
//     }

//     //check to see if all pieces for current player is out
//     const allOut = checkPlayerPieces(currentPlayerObj);

//     if (rolledNum === null) {
//         alert("Please roll (click) dice!");
//         return;
//     }

//     //if player has all pieces out and does not roll six then switch player
//     if (allOut && rolledNum < 6) {
//         nextPlayerTurn(rolledNum);
//         return;
//     }

//     //add piece when player hits 6 and they click on add piece 
//     if (evt.target.getAttribute("class") === `piece ${currentPlayerObj.color}-in`) {
//         if (allOut && rolledNum === 6) {
//             addPieceFromBase(currentPlayerObj, evt);
//         } else if (rolledNum === 6) {
//             addPieceFromBase(currentPlayerObj, evt);
//         }
//     }

//     if (evt.target.getAttribute("class") === `piece ${currentPlayerObj.color}-in play`) {
//         //check the position of the clicked piece by getting the evt.target parent node id
//         const piecePos = findDivMovePosition(currentPlayerObj.color, evt.target.parentNode.getAttribute('id'), rolledNum);

//         //need to move to own function 
//         //below will check to see if player piece is in existing spot, if so then they cannot move to that spot and must pick another piece 
//         if ($(`#${piecePos}`).children().length > 0
//             && !SAFE_SPOTS.includes(piecePos)) {
//             const piecePosParentClass = $(`#${piecePos}`).find('.play').attr('class');
//             //use substring to grab just the color of the kill piece 
//             const colorOfExistingPiece = piecePosParentClass.substring(6, piecePosParentClass.indexOf('-'));
//             console.log(colorOfExistingPiece);

//             if (colorOfExistingPiece === currentPlayerObj.color) {
//                 alert("Player piece in existing spot. Please pick another piece");
//                 return;
//             }

//         }

//         if (rolledNum === 6 && piecePos !== -1) {
//             movePiece(rolledNum, currentPlayerObj, evt);
//             $prevPlayerRoll.text(`${currentPlayerObj.name} rolled a ${rolledNum}!`)
//             rolledNum = null;
//             $dice.text("click here to roll");
//             return;
//         } else if (piecePos === -1) {
//             const numInBoard = numPieceInBoard(currentPlayerObj.pieces);

//             if (allOut || numInBoard === 1) {
//                 if (numInBoard === 1 && rolledNum == 6 && currentPlayerObj.remainPiecesInPlay > 1) {
//                     alert("Cannot move that piece but you can put a piece in play! ")
//                 } else {
//                     alert("Cannot move that piece and no other piece to move, NEXT PLAYER TURN");
//                     nextPlayerTurn(rolledNum);
//                 }
//             } else if (numInBoard > 1) {
//                 //need to add logic if all pieces are inside then cannot make a move if number to big
//                 //check to see all position of pieces 
//                 //if no piece can make move then next player turn

//                 //will add below into its own function later: ------
//                 /*-------------------------------------------------*/
//                 // const $allPieces = $(`.play`)
//                 const $allPieces = $(`.${currentPlayerObj.color}-in.play`)
//                 const currentPlayerPieces = [];


//                 $allPieces.each(function (idx) {
//                     currentPlayerPieces.push(findDivMovePosition(currentPlayerObj.color, this.parentNode.getAttribute('id'), rolledNum));

//                 });

//                 //checks through the array to see if the position returned is greater than zero which means another piece can be moved instead of the chosen one
//                 //reference google .some vs .every
//                 //used some cause just need one number to be greater than or equal to zero
//                 //where .every makes sure all numbers are
//                 const hasMove = currentPlayerPieces.some(ele => ele >= 0);
//                 console.log(hasMove);

//                 if (!hasMove) {
//                     const sum = currentPlayerPieces.reduce((curr, next) => curr + next);

//                     if (rolledNum === 6 && currentPlayerObj.remainPiecesInPlay > 1 && sum > 0) {
//                         alert("No pieces to move but you can bring a piece in play from base")

//                     } else {
//                         alert("No pieces to move, next player turn");
//                         nextPlayerTurn(rolledNum);
//                         return;
//                     }
//                 } else if (hasMove) {
//                     alert("Please pick another piece that can be moved");
//                     return;
//                 } else {
//                     movePiece(rolledNum, currentPlayerObj, evt);
//                     nextPlayerTurn(rolledNum);
//                     return;
//                 }
//                 /*-----------------move later-----------------------*/

//             } else {
//                 alert("Please pick another piece on board to move");
//             }
//         } else {
//             movePiece(rolledNum, currentPlayerObj, evt);
//             if (gameFinished === 0) {
//                 nextPlayerTurn(rolledNum);
//             }
//             return;
//         }

//     }

// }

// $main.on('click', mainHandler);


// new code -------------------------------------------------------
//class to for player objects
class Player {
    constructor(name, color) {
        //players name that was entered
        this.name = name;
        //holds the color of the player
        this.color = color;
        /*this lets us know which player turn it is
        0 means not player turn and 1 means player turn
        */
        this.playerTurn = 0;
        //holds obj of arrays of pieces for player (four pieces for now)
        this.start = 0;
        //how many pieces the player has left in play
        this.remainPiecesInPlay = 4;
        /*  0 means piece is out of play and needs a 6 to be in play
            1 meaning piece is in play
            -999 means pieces got to home and is done
        */
        this.pieces = [0, 0, 0, 0];  //change variable later

    }
}

// CONSTANT VARIABLES 
// *****************

// Variables 
// *****************
let gameStarted = 0;  // 0 means game not started and 1 means 

let arrPlayerObj = [];

// jQuery variables 
// *****************
const $userMenu = $('#user-menu');
const $startGame = $('#start-btn');
const $diceBoardContainer = $('#dice-board-container');
const $dice = $('#dice');
const $outPieces = $('.piece');
const $playerTurn = $('#player-turn');
const $prevPlayerRoll = $('#prev-player-roll');
//get input tags 
const $playerNames = [
    $('#player-one'),
    $('#player-two'),
    $('#player-three'),
    $('#player-four')
];

/* 
    make sure user entered two or more players for playing
    also updates the players array to see which players are active:
    sets it to 1 for active and leaves it zero if not
    - return number of player input entered
 */
const numNamesInputted = () => {
    let count = 0;

    $playerNames.forEach((obj, idx) => {
        if (obj.val() !== "") {
            count += 1;
        }
    });
    return count;
}

/*
    creates all the player objects 
*/
const createPlayers = () => {
    for (let obj of $playerNames) {
        if (obj.val() !== '') {
            const name = obj.val();
            const color = checkPlayerColor(obj.attr('id'));
            const player = new Player(obj.val(), color);
            arrPlayerObj.push(player);
        }
    }
    return;
}

/*
    takes the player id and checks what player name was entered 
    -returns the player color 
*/
const checkPlayerColor = playerId => {
    switch (playerId) {
        case 'player-one':
            return 'red';
        case 'player-two':
            return 'blue';
        case 'player-three':
            return 'green';
        case 'player-four':
            return 'yellow';
    }
}

/*
    disappears the menu and brings the board to front 
*/
const bringBoard = () => {
    $userMenu.fadeOut(800, () => {
        $diceBoardContainer.fadeIn(800)
            .css('display', 'flex');
    });
    return;
}

/*
display for dice and player turn info 
*/
const displayWhoseTurn = (obj) => {
    $playerTurn.text(`${obj.name}'s turn!`);

    $dice.text('click here to roll')
        .css('color', `var(--${obj.color}-pieces)`);

    return;
}
const displayDiceNum = (color, rolledNum) => {
    $dice.text(rolledNum)
        .css('color', `var(--${color}-pieces)`);
    return;
}
const displayPrevPlayer = (name, rolledNum) => {
    $prevPlayerRoll.text(`${name} rolled a ${rolledNum}!`);
    return;

}

/*
    generate random number between 1-6
*/
const generateRanNum = () => {
    return Math.floor(Math.random() * 6) + 1
}

/*
    loop through the players object array and see whose turn it is
*/
const checkTurn = () => {
    for (let i in arrPlayerObj) {
        if (arrPlayerObj[i].playerTurn === 1) {
            return parseInt(i);
        }
    }
}
/*
    check if player has all pieces out of play
*/
const checkAllOut = piecesArr => {
    return piecesArr.reduce((ele, accu) => {
        return ele + accu;
    });
}

/*
    switches to next player 
*/
const nextPlayerTurn = (currentIdx) => {
    //change current player turn to 0 
    arrPlayerObj[currentIdx].playerTurn = 0;
    //check if current player is last player 
    if (currentIdx === (arrPlayerObj.length - 1)) {
        arrPlayerObj[0].playerTurn = 1;
        return;
    } else { //if not last player then just go one up the array
        arrPlayerObj[currentIdx + 1].playerTurn = 1;
        return;
    }
}

/*
    event handler function to handle start game 
*/
const startGameHandler = evt => {
    evt.preventDefault();
    console.log("start game handler hit");

    const numNames = numNamesInputted();

    if (numNames > 1) {
        //creates the player objects 
        createPlayers();
        //sets the first player turn to 1
        arrPlayerObj[0].playerTurn = 1;
        //game has started and set up of objs done
        gameStarted = 1;
        //display whose turn
        displayWhoseTurn(arrPlayerObj[0]);
        //hid the user menu and bring the board to front 
        bringBoard();
        return;
    } else {
        return alert("Please enter at lease two players");
    }
    //testing to make sure event handler does not hit here
    console.log("end of start game handler");
}

const diceHandler = evt => {
    evt.preventDefault();
    console.log("hit dice handler");
    const prevRolledNum = parseInt(evt.target.innerHTML);

    //check which player turn it is
    const currentIdx = checkTurn();
    const playerObj = arrPlayerObj[currentIdx];
    const currName = playerObj.name;
    const currColor = playerObj.color;
    //grab to see if player has all pieces out of play
    const allOut = checkAllOut(playerObj.pieces);
    let ranNum;

    //get a random number for user if they did not roll
    //if they did then keep the prevNum
    if (isNaN(prevRolledNum)) {
        ranNum = generateRanNum();
    } else if (prevRolledNum === 6) {
        return alert("already rolled");
    } else {
        ranNum = prevRolledNum;
    }

    //check to make sure user rolls 

    //display what the player rolled is
    // displayDiceRoll(ranNum, playerObj.color, playerObj.name);
    console.log(arrPlayerObj, playerObj);
    console.log(ranNum);

    //statement to check new number
    //if user rolls less than 6 and all pieces are out then next player turn
    if (ranNum < 6 && allOut <= 0) {
        displayPrevPlayer(currName, ranNum);
        nextPlayerTurn(currentIdx);
        displayWhoseTurn(arrPlayerObj[checkTurn()]);
        return;
    } else {
        console.log(ranNum);
        displayDiceNum(currColor, ranNum);
        return;
    }

    console.log("end of dice handler");

}

$startGame.on('click', startGameHandler);

$dice.on('click', diceHandler);
//will add later
//handler so user can press space to roll the dice also
// $('body').keypress(evt => {
//     console.log("pressed space", evt);
//     if (evt.which === 32 && gameStarted === 1) {
//         diceHandler(evt);
//         return;
//     }
// });




