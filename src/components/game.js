import React, { Children } from 'react';
import '../index.css';
import Board from './board.js';
import King from '../pieces/king'
import FallenSoldierBlock from './fallen-soldier-block.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';
import Bishop from '../pieces/bishop.js';
import Knight from '../pieces/knight.js';
import Pawn from '../pieces/pawn.js';
import Queen from '../pieces/queen.js';
import Rook from '../pieces/rook.js';
const API_URIS = {
  MOVES: 'moves',
  STATUS: 'status',
  MOVE: 'move',
  AI_MOVE: 'aimove'
}
export default class Game extends React.Component {

  constructor() {
    super();
    this.getSquareString = this.getSquareString.bind(this);
    this.getSquareStringR = this.getSquareStringR.bind(this);
    this.getCard = this.getCard.bind(this);
    this.randomCard = this.randomCard.bind(this);
    this.putCards = this.putCards.bind(this);
    this.getChar = this.getChar.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timer = 0;
    this.countCards = 0;
    this.state = {
      squares: initialiseChessBoard(),
      //whiteFallenSoldiers: [],
      //blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
      
      enemyPlayerCard: 4,
      aiTurn1: 1,
      time: {},
      seconds: 240,
      lastColored : -1,
      endGame : true
    }
  }
  getSquareString(i) {
    if (i === 0) return "A8";
    if (i === 1) return "B8";
    if (i === 2) return "C8";
    if (i === 3) return "D8";
    if (i === 4) return "E8";
    if (i === 5) return "F8";
    if (i === 6) return "G8";
    if (i === 7) return "H8";

    if (i === 8) return "A7";
    if (i === 9) return "B7";
    if (i === 10) return "C7";
    if (i === 11) return "D7";
    if (i === 12) return "E7";
    if (i === 13) return "F7";
    if (i === 14) return "G7";
    if (i === 15) return "H7";

    if (i === 16) return "A6";
    if (i === 17) return "B6";
    if (i === 18) return "C6";
    if (i === 19) return "D6";
    if (i === 20) return "E6";
    if (i === 21) return "F6";
    if (i === 22) return "G6";
    if (i === 23) return "H6";

    if (i === 24) return "A5";
    if (i === 25) return "B5";
    if (i === 26) return "C5";
    if (i === 27) return "D5";
    if (i === 28) return "E5";
    if (i === 29) return "F5";
    if (i === 30) return "G5";
    if (i === 31) return "H5";

    if (i === 32) return "A4";
    if (i === 33) return "B4";
    if (i === 34) return "C4";
    if (i === 35) return "D4";
    if (i === 36) return "E4";
    if (i === 37) return "F4";
    if (i === 38) return "G4";
    if (i === 39) return "H4";

    if (i === 40) return "A3";
    if (i === 41) return "B3";
    if (i === 42) return "C3";
    if (i === 43) return "D3";
    if (i === 44) return "E3";
    if (i === 45) return "F3";
    if (i === 46) return "G3";
    if (i === 47) return "H3";

    if (i === 48) return "A2";
    if (i === 49) return "B2";
    if (i === 50) return "C2";
    if (i === 51) return "D2";
    if (i === 52) return "E2";
    if (i === 53) return "F2";
    if (i === 54) return "G2";
    if (i === 55) return "H2";

    if (i === 56) return "A1";
    if (i === 57) return "B1";
    if (i === 58) return "C1";
    if (i === 59) return "D1";
    if (i === 60) return "E1";
    if (i === 61) return "F1";
    if (i === 62) return "G1";
    if (i === 63) return "H1";

  }

  getSquareStringR(i) {
    if (i === "A8") return 0;
    if (i === "B8") return 1;
    if (i === "C8") return 2;
    if (i === "D8") return 3;
    if (i === "E8") return 4;
    if (i === "F8") return 5;
    if (i === "G8") return 6;
    if (i === "H8") return 7;

    if (i === "A7") return 8;
    if (i === "B7") return 9;
    if (i === "C7") return 10;
    if (i === "D7") return 11;
    if (i === "E7") return 12;
    if (i === "F7") return 13;
    if (i === "G7") return 14;
    if (i === "H7") return 15;

    if (i === "A6") return 16;
    if (i === "B6") return 17;
    if (i === "C6") return 18;
    if (i === "D6") return 19;
    if (i === "E6") return 20;
    if (i === "F6") return 21;
    if (i === "G6") return 22;
    if (i === "H6") return 23;

    if (i === "A5") return 24;
    if (i === "B5") return 25;
    if (i === "C5") return 26;
    if (i === "D5") return 27;
    if (i === "E5") return 28;
    if (i === "F5") return 29;
    if (i === "G5") return 30;
    if (i === "H5") return 31;

    if (i === "A4") return 32;
    if (i === "B4") return 33;
    if (i === "C4") return 34;
    if (i === "D4") return 35;
    if (i === "E4") return 36;
    if (i === "F4") return 37;
    if (i === "G4") return 38;
    if (i === "H4") return 39;

    if (i === "A3") return 40;
    if (i === "B3") return 41;
    if (i === "C3") return 42;
    if (i === "D3") return 43;
    if (i === "E3") return 44;
    if (i === "F3") return 45;
    if (i === "G3") return 46;
    if (i === "H3") return 47;

    if (i === "A2") return 48;
    if (i === "B2") return 49;
    if (i === "C2") return 50;
    if (i === "D2") return 51;
    if (i === "E2") return 52;
    if (i === "F2") return 53;
    if (i === "G2") return 54;
    if (i === "H2") return 55;

    if (i === "A1") return 56;
    if (i === "B1") return 57;
    if (i === "C1") return 58;
    if (i === "D1") return 59;
    if (i === "E1") return 60;
    if (i === "F1") return 61;
    if (i === "G1") return 62;
    if (i === "H1") return 63;

  }
  randomCard() {
    const min = 1;
    const max = 15;
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    if (rand > 7) rand = 1;
    else if (rand > 5) rand = 2;
    else if (rand > 3) rand = 3;
    else if (rand > 1) rand = 4;
    else rand = 5;
    return rand;
  };
  getCard(i, j) {
    if (i === 1) return new Pawn(j);
    if (i === 2) return new Rook(j);
    if (i === 3) return new Knight(j);
    if (i === 4) return new Bishop(j);
    if (i === 5) return new Queen(j);
  }

  putCards() {
    let x = this.state.randomCard();
    this.state.squares[65] = this.state.getCard(x, 2);
    x = this.state.randomCard();
    this.state.squares[66] = this.state.getCard(x, 2);
    x = this.state.randomCard();
    this.state.squares[67] = this.state.getCard(x, 2);
    x = this.state.randomCard();
    this.state.squares[68] = this.state.getCard(x, 2);
    x = this.state.randomCard();
    this.state.squares[69] = this.state.getCard(x, 1);
    x = this.state.randomCard();
    this.state.squares[70] = this.state.getCard(x, 1);
    x = this.state.randomCard();
    this.state.squares[71] = this.state.getCard(x, 1);
    x = this.state.randomCard();
    this.state.squares[72] = this.state.getCard(x, 1);
  }
  getChar(i) {
    if (i === 1) return 'A';
    if (i === 2) return 'B';
    if (i === 3) return 'C';
    if (i === 4) return 'D';
    if (i === 5) return 'E';
    if (i === 6) return 'F';
    if (i === 7) return 'G';
    if (i === 8) return 'H';
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0 && this.countCards !== 4) {
      this.state.squares[65] = null;
      this.state.squares[66] = null;
      this.state.squares[67] = null;
      this.state.squares[68] = null;
      this.state.squares[69] = null;
      this.state.squares[70] = null;
      this.state.squares[71] = null;
      this.state.squares[72] = null;

      let x = this.randomCard();
      this.state.squares[65] = this.getCard(x, 2);
      x = this.randomCard();
      this.state.squares[66] = this.getCard(x, 2);
      x = this.randomCard();
      this.state.squares[67] = this.getCard(x, 2);
      x = this.randomCard();
      this.state.squares[68] = this.getCard(x, 2);
      x = this.randomCard();
      this.state.squares[69] = this.getCard(x, 1);
      x = this.randomCard();
      this.state.squares[70] = this.getCard(x, 1);
      x = this.randomCard();
      this.state.squares[71] = this.getCard(x, 1);
      x = this.randomCard();
      this.state.squares[72] = this.getCard(x, 1);
      this.setState(oldState => ({
        squares: this.state.squares,
        seconds: 240,
        playerCard : 4,
        enemyPlayerCard : 4
      }));
      this.countCards++;
      //clearInterval(this.timer);
    }
    if (this.countCards == 4) clearInterval(this.timer);
  }

  handleClick(i) {

    if (this.state.sourceSelection === -1) {
       if(this.state.lastColored !== -1){
        this.state.squares[this.state.lastColored].style = { ...this.state.squares[this.state.lastColored].style, backgroundColor: "" }    
        this.state.lastColored = -1;
    }
       
      if (!this.state.squares[i] || this.state.squares[i].player !== this.state.player) {
        this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." });
        if (this.state.squares[i]) {
          this.state.squares[i].style = { ...this.state.squares[i].style, backgroundColor: "" };
        }
      }
      else {
        this.state.squares[i].style = { ...this.state.squares[i].style, backgroundColor: "RGB(111,143,114)" }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        })
      }
      return
    }
    this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "" };
    
    if (this.state.squares[i] && this.state.squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1,
      });
    }

    if (this.state.sourceSelection > 64) {
          if (i > 48 && i < 65) {
            if(this.state.player === 2){
              this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "#f00" }
              this.setState(oldState => ({
                sourceSelection: -1,
                squares: this.state.squares,
                status: 'Wrong Selection',
                lastColored : this.state.sourceSelection,
              }));
              return
            }
            if(this.state.squares[i]  &&  this.state.squares[i].player === this.state.player){
              this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "#f00" }
              this.setState({
                status: "Can not put here",
                squares: this.state.squares,
                sourceSelection: -1,
                lastColored : this.state.sourceSelection,
              });
              return
            }
            let fii = null;
                let see = null;
                for (let z = 0; z <64; z++) {
                  if (this.state.squares[z] === null) {
                    if (this.state.squares[z + 1] === null) {
                      fii = z;
                      see = z + 1;
                      break;
                    }
                    if (this.state.squares[z + 8] === null) {
                      fii = z;
                      see = z + 8;
                      break;
                    }
                  }
                }
                console.log("first played")
                this.props.game.setPiece(this.getSquareString(fii), "Q");
                try{
                this.props.game.move(this.getSquareString(fii), this.getSquareString(see));
              }catch (error){
                this.state.squares[this.getKingPosition(this.state.squares,this.state.player)].style = { ...this.state.squares[this.getKingPosition(this.state.squares,this.state.player)].style, backgroundColor: "#f00" }
                this.props.game.removePiece(this.getSquareString(fii)); 
                this.setState({
                  status: "Check .",
                  squares: this.state.squares,
                  sourceSelection: -1,
                  lastColored : this.getKingPosition(this.state.squares,this.state.player),
                });
                return
              }
              this.props.game.removePiece(this.getSquareString(see));  

             
              
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Pawn') {
              this.props.game.setPiece(this.getSquareString(i), "P");
              this.state.squares[i] = new Pawn(1);
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Bishop') {
              this.props.game.setPiece(this.getSquareString(i), "B");
              this.state.squares[i] = new Bishop(1)
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Rook') {
              this.props.game.setPiece(this.getSquareString(i), "R");
              this.state.squares[i] = new Rook(1);
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Queen') {
              this.props.game.setPiece(this.getSquareString(i), "Q");
              this.state.squares[i] = new Queen(1);
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Knight') {
              this.props.game.setPiece(this.getSquareString(i), "N");
              this.state.squares[i] = new Knight(1);
            }
            this.state.squares[this.state.sourceSelection] = null;

            this.setState(oldState => ({
              sourceSelection: -1,
              squares: this.state.squares,
              status: '',
              player : 2,
              turn : "black"
            }));
          
          }
          else if(i>=0 && i<16){
            if(this.state.player === 1){
              this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "#f00" }
              this.setState(oldState => ({
                sourceSelection: -1,
                squares: this.state.squares,
                status: 'Wrong Selection',
                lastColored : this.state.sourceSelection,
              }));
              return
            }
            if(this.state.squares[i]  &&  this.state.squares[i].player === this.state.player){
              this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "#f00" }
              this.setState({
                status: "Can not put here",
                squares: this.state.squares,
                sourceSelection: -1,
                lastColored : this.state.sourceSelection,
              });
              return
            }
            let fii = null;
                let see = null;
                for (let z = 63; z >= 0; z--) {
                  if (this.state.squares[z] === null) {
                    if (this.state.squares[z - 1] === null) {
                      fii = z;
                      see = z - 1;
                      break;
                    }
                    if (this.state.squares[z - 8] === null) {
                      fii = z;
                      see = z - 8;
                      break;
                    }
                  }
                }
                this.props.game.setPiece(this.getSquareString(fii), "q");
            try{
              this.props.game.move(this.getSquareString(fii), this.getSquareString(see));
            }catch (error){
              this.state.squares[this.getKingPosition(this.state.squares,this.state.player)].style = { ...this.state.squares[this.getKingPosition(this.state.squares,this.state.player)].style, backgroundColor: "#f00" }
              this.props.game.removePiece(this.getSquareString(fii)); 
              this.setState({
                status: "Check .",
                squares: this.state.squares,
                sourceSelection: -1,
                lastColored : this.getKingPosition(this.state.squares,this.state.player),
              });
              return
            }
            this.props.game.removePiece(this.getSquareString(see));  

           
          
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Pawn') {
              this.props.game.setPiece(this.getSquareString(i), "p");
              this.state.squares[i] = new Pawn(2);
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Bishop') {
              this.props.game.setPiece(this.getSquareString(i), "b");
              this.state.squares[i] = new Bishop(2)
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Rook') {
              this.props.game.setPiece(this.getSquareString(i), "r");
              this.state.squares[i] = new Rook(2);
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Queen') {
              this.props.game.setPiece(this.getSquareString(i), "q");
              this.state.squares[i] = new Queen(2);
            }
            if (this.state.squares[this.state.sourceSelection].constructor.name === 'Knight') {
              this.props.game.setPiece(this.getSquareString(i), "n");
              this.state.squares[i] = new Knight(2);
            }
            this.state.squares[this.state.sourceSelection] = null;
            this.setState(oldState => ({
              sourceSelection: -1,
              squares: this.state.squares,
              status: '',
            
              player : 1,
              turn : "white"
            }));
            }
            else{
              this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "#f00" }
              this.setState(oldState => ({
                sourceSelection: -1,
                status: 'Choose Valid destination',
                lastColored : this.state.sourceSelection,
              }));
            }

            if(this.getKingPosition(this.state.squares,1) === null){
              this.setState(oldState => ({
                sourceSelection: -1,
                squares: this.state.squares,
                status: 'Game Over second player wins',
                
              }));
              console.log("game over")
            }
            if(this.getKingPosition(this.state.squares,2) === null){
              this.setState(oldState => ({
                sourceSelection: -1,
                squares: this.state.squares,
                status: 'Game Over first player wins',
                
              }));
              console.log("game over1")
            }
         return  
        }
        try {
          //console.log(this.props.game.moves(this.getSquareString(this.state.squares[i])));
        this.props.game.move(this.getSquareString(this.state.sourceSelection), this.getSquareString(i));
            this.state.squares[i] = this.state.squares[this.state.sourceSelection];
              this.state.squares[this.state.sourceSelection] =null ;
              this.setState(oldState => ({
                sourceSelection: -1,
                squares: this.state.squares,
                status: '',
                player : (this.state.player === 1)?2:1,
                turn : (this.state.player === 1)?"black":"white",
              }))

              if(this.getKingPosition(this.state.squares,1) === null){
                this.setState(oldState => ({
                  sourceSelection: -1,
                  squares: this.state.squares,
                  status: 'Game Over second player wins',
                  
                }));
                console.log("game over")
              }
              if(this.getKingPosition(this.state.squares,2) === null){
                this.setState(oldState => ({
                  sourceSelection: -1,
                  squares: this.state.squares,
                  status: 'Game Over first player wins',
                  
                }));
                console.log("game over1")
              }
            }

            catch (error) {
              
        console.log(error);
        this.state.squares[this.state.sourceSelection].style = { ...this.state.squares[this.state.sourceSelection].style, backgroundColor: "#f00" }    
        this.setState({
          status: "Check .",
          squares: this.state.squares,
          sourceSelection: -1,
          lastColored : this.state.sourceSelection,
        });
      }
    }
    getKingPosition(squares, player) {
        return squares.reduce((acc, curr, i) =>
          acc || //King may be only one, if we had found it, returned his position
          ((curr //current squre mustn't be a null
            && (curr.getPlayer() === player)) //we are looking for aspecial king 
            && (curr instanceof King)
            && i), // returned position if all conditions are completed
          null)
      }
    
      isCheckForPlayer(squares, player) {
        const opponent = player === 1 ? 2 : 1
        const playersKingPosition = this.getKingPosition(squares, player)
        const canPieceKillPlayersKing = (piece, i) => piece.isMovePossible(playersKingPosition, i, squares)
        return squares.reduce((acc, curr, idx) =>
          acc ||
          (curr &&
            (curr.getPlayer() === opponent) &&
            canPieceKillPlayersKing(curr, idx)
            && true),
          false)
      }
    
      render() {
    
        return (
          <div>
            <div>{this.startTimer(), this.state.seconds}</div>
            <div className="game">
                {/*
            <div style={{width : "100%" , height : "100%" , position : "absolute" , disabled :!this.state.endGame}}>
                <div style={{ opacity : "0.7"}} ></div>
                <div >
                    <h1>{this.state.Winner}</h1>
                    <button className = "btn btn-success">OK</button>
                </div>
            </div>
                */}
            <div className="game-board" style={{disabled : this.state.endGame}}>
                
                <Board
                  squares={this.state.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              <div className="game-info">
                <h3>Turn</h3>
                <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>
                </div>
                <div className="game-status">{this.state.status}</div>
              </div>
            </div>
          </div>
        );
      }
    }