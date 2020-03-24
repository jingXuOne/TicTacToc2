import React, { Component } from "react";
import ReactDOM from "react-dom";
import Square from "./Square";
import StartButton from "./StartButton";
import ClearButton from "./ClearButton";
import GameInfo from "./GameInfo";

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
      squares: [],
      boardStatus: {
          start : "visible",
          clear: "hidden",
          info: "Player1: X Player2: O"
      }
    };
    this.startGame = this.startGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
  }

  startGame() {
    this.setState({
        isStarted: true,
        isPlayerX: true,
        squares: Array(9).fill(""),
        boardStatus: {
            start: "hidden",
            clear: "visible",
            info: "Next Player X"
        }
    });
  }

  clearGame() {
    this.setState({
        isStarted: true,
        isPlayerX: true,
        squares: Array(9).fill(""),
        boardStatus: {
            start: "hidden",
            clear: "visible",
            info: "Next Player X"
        }
    });
  }

gameOver({winner,winResult}){
    this.setState({
        isStarted: false,
        boardStatus: {
            start: "visible",
            clear: "hidden",
            info: `Player ${winner} Win! click start button to continuer.`
        }
    }, () => {
        //show line
        // let squareCount = ReactDOM.findDOMNode(Square);
        // console.log("squareCount",squareCount);
        for (const index of winResult){
            document.getElementById(index).classList.add("winner");
        } 
    })
}

gameTie(){
    this.setState({
        isStarted: false,
        boardStatus: {
            start: "visible",
            clear: "hidden",
            info: "Game Tie!! click start button to continuer."
        }
    });
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
                    isPlayerX: !prevState.isPlayerX,
                    boardStatus: {
                        info: `Next Player ${!this.state.isPlayerX ? "X": "O"}`
                    }
                }));
            }
    );
 }

  render() {
    
    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>
        <div>
          <StartButton onClick={this.startGame} visibility={this.state.boardStatus.start}/>
          <ClearButton onClick={this.clearGame} visibility={this.state.boardStatus.clear}/>
          <GameInfo title={this.state.boardStatus.info}/>
        </div>

        <div className="board">{
            [...Array(9).keys()].map(value => (
            <Square
            ref="square"
            onClick={() => this.handleSquareClick(value)}
            player={this.state.squares[value]}
            squareId={value}
            key={value}
        />
    ))
        }</div>
      </div>
    );
  }
}
