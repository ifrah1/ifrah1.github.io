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

const BLUE_PLAYER_PATH = [
    6, 9, 12, 15, 18,
    25, 26, 27, 28, 29,
    30, 42, 54,
    53, 52, 51, 50, 49,
    57, 60, 63, 66, 69,
    72, 71, 70,
    67, 64, 61, 58, 55,
    48, 47, 46, 45, 44,
    43, 31, 19,
    20, 21, 22, 23, 24,
    16, 13, 10, 7, 4,
    1, 2,
    5, 8, 11, 14, 17,
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


const YELLOW_PLAYER_PATH = [
    67, 64, 61, 58, 55,
    48, 47, 46, 45, 44,
    43, 31, 19,
    20, 21, 22, 23, 24,
    16, 13, 10, 7, 4,
    1, 2, 3,
    6, 9, 12, 15, 18,
    25, 26, 27, 28, 29,
    30, 42, 54,
    53, 52, 51, 50, 49,
    57, 60, 63, 66, 69,
    72, 71,
    68, 65, 62, 59, 56,
    0
];

const SAFE_SPOTS = [
    5, 6, 8, 11, 14, 17,     // blue safe spots
    20, 32, 33, 34, 35, 36,  // red safe spots
    37, 38, 39, 40, 41, 53,  // green safe spots
    56, 59, 62, 65, 68, 67   // yellow safe spots
];

// Variables 
// *****************
let gameStarted = 0;  // 0 means game not started and 1 means 

let arrPlayerObj = [];

// jQuery variables 
// *****************
const $userMenu = $('#user-menu');
const $startGame = $('#start-btn');
const $diceBoardContainer = $('#dice-board-container');
const $gameBoardWrapper = $('#game-board-wrapper');
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
            const color = checkPlayerColor(obj.attr('id'));
            const player = new Player(obj.val(), color);
            player.start = addPlayerStartPos(color);
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

const addPlayerStartPos = color => {
    switch (color) {
        case 'red':
            return 20;
        case 'blue':
            return 6;
        case 'green':
            return 53;
        case 'yellow':
            return 67;
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

const displayNextPlayer = (name, rolledNum, currentIdx) => {
    displayPrevPlayer(name, rolledNum);
    nextPlayerTurn(currentIdx);
    displayWhoseTurn(arrPlayerObj[checkTurn()]);
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
    // return piecesArr.reduce((ele, accu) => {
    //     return ele + accu;
    // });
    for (let ele of piecesArr) {
        if (ele === 1) {
            return false;
        }
    }
    return true;
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
    adds a piece in play once player clicks it from their base
*/
const addPieceFromBase = (playerObj, evt) => {
    $(`#${playerObj.start}`).append(`<div class="piece ${playerObj.color}-in play"></div>`);
    //removes the pieces once its in play
    evt.target.remove();
    return;
}

/*
    update player pieces based on 
    - 0 = out of play 
    - 999 = player piece made home is done
    - 1 = in play and on board 
*/
const updatePlayerPiece = (playerObj, status) => {
    for (let idx in playerObj.pieces) {
        console.log(idx);
        if (playerObj.pieces[idx] === 0 && status === 1) {
            playerObj.pieces[idx] = 1;
            return;
        } else if (playerObj.pieces[idx] === 1 && status === 0) {
            playerObj.pieces[idx] = 0;
            return;
        } else if (playerObj.pieces[idx] === 1 && status === -999) {
            playerObj.pieces[idx] = -999;
            playerObj.remainPiecesInPlay -= 1;
            return;
        }
    }
}

/*
    check what the new position of the piece is 
*/
const findDivMovePosition = (color, currentDivId, rolledNum) => {
    currentDivId = parseInt(currentDivId);
    let newDivPosition;
    let currentIdx;

    if (color === 'red') {
        // RED_PLAYER_PATH
        currentIdx = RED_PLAYER_PATH.indexOf(currentDivId);

        //logic to make sure div can reach home
        newDivPosition = pieceHomeCheck(currentIdx, rolledNum);

        if (newDivPosition === -1) {
            return -1
        } else {
            return (RED_PLAYER_PATH[newDivPosition]);
        }
    } else if (color === 'blue') {
        // GREEN_PLAYER_PATH
        currentIdx = BLUE_PLAYER_PATH.indexOf(currentDivId);

        // logic to make sure div can reach home
        newDivPosition = pieceHomeCheck(currentIdx, rolledNum);

        if (newDivPosition === -1) {
            return -1
        } else {
            return (BLUE_PLAYER_PATH[newDivPosition]);
        }
    } else if (color === 'green') {
        // GREEN_PLAYER_PATH
        currentIdx = GREEN_PLAYER_PATH.indexOf(currentDivId);

        // logic to make sure div can reach home
        newDivPosition = pieceHomeCheck(currentIdx, rolledNum);

        if (newDivPosition === -1) {
            return -1
        } else {
            return (GREEN_PLAYER_PATH[newDivPosition]);
        }
    } else if (color === 'yellow') {
        // GREEN_PLAYER_PATH
        currentIdx = YELLOW_PLAYER_PATH.indexOf(currentDivId);

        // logic to make sure div can reach home
        newDivPosition = pieceHomeCheck(currentIdx, rolledNum);

        if (newDivPosition === -1) {
            return -1
        } else {
            return (YELLOW_PLAYER_PATH[newDivPosition]);
        }
    }

}

const pieceHomeCheck = (idxPos, rolledNum) => {
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

/*
    check if any pieces are in new position for clicked piece to move to
*/
const checkNewPos = (newPos, currentPlayerObj) => {
    if ($(`#${newPos}`).children().length > 0
        && !SAFE_SPOTS.includes(newPos)) {
        const piecePosParentClass = $(`#${newPos}`).find('.play').attr('class');
        //use substring to grab just the color of the kill piece 
        const colorOfExistingPiece = piecePosParentClass.substring(6, piecePosParentClass.indexOf('-'));
        console.log(colorOfExistingPiece);

        return (colorOfExistingPiece === currentPlayerObj.color) ? true : false;
    } else {
        return false;
    }
}

/*
    moves current piece 
*/
const movePiece = (oldPos, newPos, playerObj) => {
    if (newPos === 0) {
        $(`#${oldPos}`).find('div:first').remove();
        //updates player pieces info of how many left to get to home
        updatePlayerPiece(playerObj, -999);
        console.log("made it home", playerObj);
        //check if player has no more pieces remaining 
        //did arrays check length since only two plyers 
        //in future when more players will be added then we want game to keep going till one player left who is loser
        if (arrPlayerObj.length === 2) {
            if (playerObj.remainPiecesInPlay === 0) {
                displayWinner(playerObj);
            }
        } else if (playerObj.remainPiecesInPlay === 0) {
            playerObj.playerTurn = -999 //meaning they are done
        }
    } else {
        // check to see if another player piece is in the new spot
        // if so run kill function to send it back to its base
        if (($(`#${newPos}`).children().length > 0)
            && !SAFE_SPOTS.includes(newPos)) {
            // console.log("call kill function");
            killOtherPiece(newPos);
        }
        newPos = newPos.toString();

        /* below statement finds the first div with given combined  
        class name (multi class selector)
        then grabs the first one and then removes it
        */
        $(`#${oldPos}`).find(`div.${playerObj.color}-in.play`).first().remove();
        // adds to new spot
        $(`#${newPos}`).append(`<div class="piece ${playerObj.color}-in play"></div>`)
    }

    return;
}

/*
    kill function to send a piece back home 
*/
const killOtherPiece = newPos => {
    //grab the class of the kill piece
    const killPieceClass = $(`#${newPos}`).find('.play').attr('class');

    //use substring to grab just the color of the kill piece 
    const killPieceColor = killPieceClass.substring(6, killPieceClass.indexOf('-'));
    //remove the other player piece
    $(`#${newPos}`).find(`div.${killPieceColor}-in.play`).first().remove();

    //update the otherPlayer pieces info for that player obj
    returnPlayerPiece(killPieceColor);

    return;
}

/*
    returns the killed piece back to player base 
*/
const returnPlayerPiece = color => {
    // let idx;
    //grab the player obj position of the color being killed 
    for (let i in arrPlayerObj) {
        if (arrPlayerObj[i].color === color) {
            updatePlayerPiece(arrPlayerObj[i], 0)
            break;
        }
    }

    $(`#${color}-inner-base`).append(`<div class="piece ${color}-in"></div>`);

    return;
}

//checks how many more pieces are left that have not reached home
const numPieceInBoard = arrPieces => {
    let count = 0;

    arrPieces.forEach(ele => {
        if (ele !== -999) {
            count += ele;
        }
    });
    return count;
}

const displayWinner = playerObj => {
    const playerWin = `${playerObj.name} has WON!!!!`

    alert(playerWin)
    $prevPlayerRoll.text(playerWin);
    $playerTurn.text(playerWin);
    $dice.text("Game Over!");
}

/*
    event handler function to handle start game 
*/
const startGameHandler = evt => {
    evt.preventDefault();

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
    if (ranNum < 6 && allOut) {
        // displayPrevPlayer(currName, ranNum);
        // nextPlayerTurn(currentIdx);
        // displayWhoseTurn(arrPlayerObj[checkTurn()]);
        displayNextPlayer(currName, ranNum, currentIdx);
        return;
    } else {
        console.log(ranNum);
        displayDiceNum(currColor, ranNum);
        return;
    }

}

const gameBoardHandler = evt => {
    evt.preventDefault();

    const evtClass = evt.target.getAttribute("class");
    // check rolled number
    const rolledNum = parseInt($dice.text());
    //check which player turn it is
    const currentIdx = checkTurn();
    const playerObj = arrPlayerObj[currentIdx];

    //exit if player has not rolled dice yet and clicks on piece 
    if (isNaN(rolledNum)) {
        return alert("please roll dice");
    }
    //exit if player does not click their color piece 
    if (evtClass !== `piece ${playerObj.color}-in`
        && evtClass !== `piece ${playerObj.color}-in play`) {
        return;
    }

    //add piece if player rolled a six 
    if (rolledNum === 6 && evtClass === `piece ${playerObj.color}-in`) {
        addPieceFromBase(playerObj, evt);
        updatePlayerPiece(playerObj, 1);
        //display current player turn since rolled a 6 
        displayPrevPlayer(playerObj.name, rolledNum);
        displayWhoseTurn(arrPlayerObj[checkTurn()]);
        return;
    }

    //move a clicked piece 
    if (evtClass === `piece ${playerObj.color}-in play`) {
        const currPos = evt.target.parentNode.getAttribute('id');
        const pieceNewPos = findDivMovePosition(playerObj.color, currPos, rolledNum);
        console.log(pieceNewPos);

        //check if existing piece is in new position 
        const check = checkNewPos(pieceNewPos, playerObj);
        if (check) {
            return alert("Player piece in existing spot. Please pick another piece")
        }

        if (pieceNewPos !== -1 && rolledNum === 6) {
            movePiece(currPos, pieceNewPos, playerObj);
            //display current player turn since rolled a 6 
            displayPrevPlayer(playerObj.name, rolledNum);
            displayWhoseTurn(arrPlayerObj[checkTurn()]);
            return;
        } else if (pieceNewPos === -1) {
            console.log(numPieceInBoard(playerObj.pieces));
            const numInBoard = numPieceInBoard(playerObj.pieces);
            console.log("numINboard: ", numInBoard);

            if (numInBoard === 1) {
                if (numInBoard === 1 && rolledNum == 6 && playerObj.remainPiecesInPlay > 1) {
                    alert("Cannot move that piece but you can put a piece in play! ")
                } else {
                    alert("Cannot move that piece and no other piece to move, NEXT PLAYER TURN");
                    displayNextPlayer(playerObj.name, rolledNum, currentIdx);
                }
            } else if (numInBoard > 1) {
                //need to add logic if all pieces are inside then cannot make a move if number to big
                //check to see all position of pieces 
                //if no piece can make move then next player turn

                //will add below into its own function later: ------
                /*-------------------------------------------------*/
                // const $allPieces = $(`.play`)
                const $allPieces = $(`.${playerObj.color}-in.play`)
                const currentPlayerPieces = [];


                $allPieces.each(function (idx) {
                    currentPlayerPieces.push(findDivMovePosition(playerObj.color, this.parentNode.getAttribute('id'), rolledNum));

                });

                //checks through the array to see if the position returned is greater than zero which means another piece can be moved instead of the chosen one
                //reference google .some vs .every
                //used some cause just need one number to be greater than or equal to zero
                //where .every makes sure all numbers are
                const hasMove = currentPlayerPieces.some(ele => ele >= 0);

                if (!hasMove) {
                    const sum = currentPlayerPieces.reduce((curr, next) => curr + next);

                    if (rolledNum === 6 && playerObj.remainPiecesInPlay > 1 && sum > 0) {
                        alert("No pieces to move but you can bring a piece in play from base")

                    } else {
                        alert("No pieces to move, next player turn");
                        displayNextPlayer(playerObj.name, rolledNum, currentIdx);
                        return;
                    }
                } else if (hasMove) {
                    alert("Please pick another piece that can be moved");
                    return;
                } else {
                    movePiece(currPos, pieceNewPos, playerObj);
                    displayNextPlayer(playerObj.name, rolledNum, currentIdx);
                    return;
                }
                /*-----------------move later-----------------------*/

            } else {
                alert("Please pick another piece on board to move");
            }

        } else {
            movePiece(currPos, pieceNewPos, playerObj);
            //next player turn 
            displayNextPlayer(playerObj.name, rolledNum, currentIdx);
            return;
        }

    }
}

$startGame.on('click', startGameHandler);
$dice.on('click', diceHandler);
$gameBoardWrapper.on('click', gameBoardHandler);