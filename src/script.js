// const winResults = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,4,6],
//     [2,5,8],
//     [3,4,5],
//     [6,7,8]
// ];
// const symbols = {"player1": "X", "player2":"O"};

// var isPlayer1, board;
// var player1Status = [];
// var player2Status = [];
// var allSquares = document.getElementsByClassName("square");
// var startButton = document.getElementById("startButton");
// var clearButton = document.getElementById("clearButton");
// var infoP = document.getElementById("info");

// function clearGame(){
//     board = Array(9).fill("");
//     isPlayer1 = true;
//     player1Status = [];
//     player2Status = [];
//     //show winner message
//     infoP.innerText = "Player1: X Player2: O";
//     for (let i=0; i<allSquares.length;i++){
//         allSquares[i].style.backgroundColor = "white";
//         allSquares[i].classList.remove("player1");
//         allSquares[i].classList.remove("player2");
//     }
// }

// function startGame(){
//     clearGame();
//     for (let i=0; i<allSquares.length;i++){
//         allSquares[i].addEventListener("click",play,false);
//     }
//     startButton.style.visibility = "hidden";
//     clearButton.style.visibility = "visible";
// }

// function play(button){
//     let id = button.target.id;
//     let player = isPlayer1 ? "player1" : "player2";
//     if (board[id] != ""){
//         console.log("can't here");
//         return;
//     }
//     //complet status
//     board[id] = symbols[player];
//     if (isPlayer1){
//         player1Status.push(Number(id));
//     }
//     else{
//         player2Status.push(Number(id));
//     }
//     //update div with new class
//     button.target.classList.add(player);
    
//     if (player1Status.length >= 3 || player2Status.length >= 3){
//         let win = checkWinner();
//         if (win["result"]){
//             gameOver(win);
//             return;
//         }
//         if (!board.some( val => val == "")){
//             gameTie();
//             return;
//         }
//     }
//     //turn player
//     isPlayer1 = !isPlayer1;
//     player = isPlayer1 ? "player1" : "player2";
//     document.getElementById("info").innerText = symbols[player]+ " turn";
// }

// function checkWinner(){
//     let playStatus = player1Status;
//     if (!isPlayer1){
//         playStatus = player2Status;
//     }
//     for (const result of winResults){
//         let isWin = result.every(v=> playStatus.indexOf(v) > -1)
//         if (isWin) {
//             return {"result":true, "winner":isPlayer1, "line":result};
//         }
//     }
//     return {"result":false};
// }

// function removeEventListeners(){
//     //remove all listeners
//     for (let i=0; i<allSquares.length; i++){
//         allSquares[i].removeEventListener("click",play,false);
//     }
// }

// function gameOver(win){
//     //show line
//     for (let index of win["line"]){
//         document.getElementById(index).style.backgroundColor = "yellow";
//     }
//     //show winner message
//     let player = win["winner"] ? "player1" : "player2";
//     infoP.innerText = player + " Win!! click start button to continuer.";
//     removeEventListeners();
//     startButton.style.visibility = "visible";
//     clearButton.style.visibility = "hidden";
// }

// function gameTie(){
//     infoP.innerText = "Game Tie!! click start button to continuer.";
//     removeEventListeners();
//     startButton.style.visibility = "visible";
//     clearButton.style.visibility = "hidden";
// }