
var player1 = true
var allSquares = document.getElementsByClassName("square")
function startGame(){
    console.log(allSquares); 
    for (var i=0; i<allSquares.length;i++){
        allSquares[i].addEventListener("click",play,false);
    }
}

function play(button){
    let id = button.target.id;
    console.log(id);
    var element = document.getElementById(id);
    let player = player1 ? "player1" : "player2";
    element.classList.add(player);
    player1 = !player1;
}