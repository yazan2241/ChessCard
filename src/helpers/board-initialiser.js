import Bishop from '../pieces/bishop.js';
import King from '../pieces/king.js';
import Knight from '../pieces/knight.js';
import Pawn from '../pieces/pawn.js';
import Queen from '../pieces/queen.js';
import Rook from '../pieces/rook.js';


function randomCard(){
  const min = 1;
  const max = 15;
  let rand = min + Math.random() * (max-min);
  rand = Math.round(rand);
  if(rand > 7)rand = 1;
  else if(rand > 5)rand = 2;
  else if(rand > 3)rand = 3;
  else if(rand > 1)rand = 4;
  else rand = 5;
  return rand;
};
function getCard(i,j){
  if(i===1)return new Pawn(j);
  if(i===2)return new Rook(j);
  if(i===3)return new Knight(j);
  if(i===4)return new Bishop(j);
  if(i===5)return new Queen(j);
}

export default function initialiseChessBoard() {
  const squares = Array(74).fill(null);
  
 /*
  for (let i = 8; i < 16; i++) {
    squares[i] = new Pawn(2);
    squares[i + 40] = new Pawn(1);
  }
  squares[0] = new Rook(2);
  squares[7] = new Rook(2);
  squares[56] = new Rook(1);
  squares[63] = new Rook(1);

  squares[1] = new Knight(2);
  squares[6] = new Knight(2);
  squares[57] = new Knight(1);
  squares[62] = new Knight(1);

  squares[2] = new Bishop(2);
  squares[5] = new Bishop(2);
  squares[58] = new Bishop(1);
  squares[61] = new Bishop(1);

  squares[3] = new Queen(2);
  squares[4] = new King(2);

  squares[59] = new Queen(1);
  squares[60] = new King(1);
*/
  squares[60] = new King(1);
  squares[4] = new King(2);

  squares[53] = new Pawn(1);
  squares[51] = new Pawn(1);
  squares[44] = new Pawn(1);
  
  squares[11] = new Pawn(2);
  squares[13] = new Pawn(2);
  squares[20] = new Pawn(2);


  
  return squares;
}