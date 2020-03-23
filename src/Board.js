import React, { Component } from "react";
import Square from "./Square";

const winResults = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      isPlayerX: true,
      squares: []
    };
    this.startGame = this.startGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
  }

  startGame() {
    this.clearGame();
    document.getElementById("startButton").style.visibility = "hidden";
    document.getElementById("clearButton").style.visibility = "visible";
  }

  clearGame() {
    this.setState({
        isStarted: true,
        isPlayerX: true,
        squares: Array(9).fill(""),
    },()=>{
        document.getElementById("info").innerText = "Next Player X";
    });
  }

gameOver({winner,winResult}){
    this.setState({
        isStarted: false
    }, () => {
        //show line
        for (const index of winResult){
            document.getElementById(index).classList.add("winner");
        } 
        document.getElementById("info").innerText = `Player ${winner} Win! click start button to continuer.`
        document.getElementById("clearButton").style.visibility = "hidden";
        document.getElementById("startButton").style.visibility = "visible";
    })
}

gameTie(){
    this.setState({
        isStarted: false
    }, () => {
        document.getElementById("info").innerText = "Game Tie!! click start button to continuer.";
        document.getElementById("clearButton").style.visibility = "hidden";
        document.getElementById("startButton").style.visibility = "visible";
    })
} 

checkWinner(){
    const playerSymbol = this.state.isPlayerX ? "X" : "O";
    //find all index with symbol "x" or "o";
    const indices = this.state.squares.map((e, index) => e === playerSymbol ? index : '').filter(String)
    if (indices.length < 3){
        return {isWin: false};
    }
    for (const result of winResults){
        const isWin = result.every( v => indices.indexOf(v) > -1)
        if (isWin) {
            return {isWin: true, winner: playerSymbol, winResult: result}
        }
    }
    return {isWin: false}
}  
  handleSquareClick(i) {
    if (!this.state.isStarted){
        return;
    }  
    
    let squares = Array.from(this.state.squares);
    squares[i] = this.state.isPlayerX ? "X": "O";
    
    this.setState({ 
            squares
        },
            () => {
                //check winner
                const checkResult = this.checkWinner();
                if (checkResult.isWin){
                    this.gameOver(checkResult);
                    return;
                }
                //check tie
                if (!this.state.squares.some( val => val === "")){
                    this.gameTie();
                    return;
                }
                this.setState(prevState => ({
                    isPlayerX: !prevState.isPlayerX
                }),()=>{
                    const nextPlayer = this.state.isPlayerX ? "X": "O";
                    document.getElementById("info").innerText = `Next Player ${nextPlayer}`;
                });
                
            }
    );
 }

  render() {
    const squares = [...Array(9).keys()].map(value => (
        <Square
        onClick={() => this.handleSquareClick(value)}
        player={this.state.squares[value]}
        squareId={value}
        key={value}
      />
    ))
    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>
        <div>
          <button type="button" onClick={this.startGame} id="startButton">
            Start
          </button>
          <button type="button" onClick={this.clearGame} id="clearButton">
            Clear
          </button>
          <p id="info">Player1: X Player2: O</p>
        </div>
        <div className="board">{squares}</div>
      </div>
    );
  }
}
