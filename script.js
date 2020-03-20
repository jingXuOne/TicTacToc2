const winResults = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]
const symbols = {"player1": "X", "player2":"O"};

var isPlayer1, board
var player1Status = []
var player2Status = []
var allSquares = document.getElementsByClassName("square")

function startGame(){
    board = Array(9).fill("");
    isPlayer1 = true
    player1Status = []
    player2Status = []
    //show winner message
    document.getElementById("info").innerText = "Player1: X Player2: O"
    
    for (var i=0; i<allSquares.length;i++){
        allSquares[i].addEventListener("click",play,false);
        allSquares[i].style.backgroundColor = "white";
        allSquares[i].classList.remove("player1");
        allSquares[i].classList.remove("player2");
    }
}

function play(button){
    let id = button.target.id;
    var element = document.getElementById(id);
    let player = isPlayer1 ? "player1" : "player2";
    if (board[id] != ""){
        console.log("can't here");
        return;
    }
    //complet status
    board[id] = symbols[player]
    if (isPlayer1){
        player1Status.push(Number(id))
    }
    else{
        player2Status.push(Number(id))
    }
    //update div with new class
    element.classList.add(player);
    
    if (player1Status.length >= 3 || player2Status.length >= 3){
        let win = checkWinner()
        if (win["result"]){
            gameOver(win);
            return;
        }
        if (!board.some( val => val == "")){
            gameTie()
            return;
        }
    }
    //turn player
    isPlayer1 = !isPlayer1;
    player = isPlayer1 ? "player1" : "player2";
    document.getElementById("info").innerText = symbols[player]+ " turn"
}

function checkWinner(){
    var playStatus = player1Status;
    if (!isPlayer1){
        playStatus = player2Status;
    }
    for (let [index, elem] of winResults.entries()){
        var isWin = elem.every(v=> playStatus.indexOf(v) > -1)
        if (isWin) {
            return {"result":true, "winner":isPlayer1, "line":elem}
        }
    }
    return {"result":false};
}

function removeEventListeners(){
    //remove all listeners
    for (var i=0; i<allSquares.length;i++){
        allSquares[i].removeEventListener("click",play,false);
    }
}

function gameOver(win){
    //show line
    for (let index of win["line"]){
        document.getElementById(index).style.backgroundColor = "yellow";
    }
    //show winner message
    let player = win["winner"] ? "player1" : "player2";
    document.getElementById("info").innerText = player + " Win!! click start button to continuer."
    removeEventListeners()
}

function gameTie(){
    document.getElementById("info").innerText = "Game Tie!! click start button to continuer."
    removeEventListeners()
}