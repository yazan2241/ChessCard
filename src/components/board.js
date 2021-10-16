import React from 'react';

import '../index.css';
import Square from './square.js';

export default class Board extends React.Component {

  renderSquare(i, squareShade) {
    return <Square
      key={i}
      keyVal={i}
      style={this.props.squares[i] ? this.props.squares[i].style : null}
      shade={squareShade}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    const board = [];
    const sq =[];
    sq.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+1)}</button>);
    sq.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+2)}</button>);
    sq.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+3)}</button>);
    sq.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+4)}</button>);
    board.push(<div className="col-md-2 emptyCell" key={8}>{sq}</div>)

    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "light-square" : "dark-square";
        squareRows.push(this.renderSquare((i * 8) + j, squareShade));
      }
      board.push(<div className="board-row" key={i}>{squareRows}</div>)
    }
    
    const sq1 =[];
    sq1.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+5)}</button>);
    sq1.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+6)}</button>);
    sq1.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+7)}</button>);
    sq1.push(<button className="btn btn-default imItem">{this.renderSquare((8*8)+8)}</button>);

    board.push(<div className="col-md-2 emptyCell" key={9}>{sq1}</div>)

    return (
      <div>
        {board}
      </div>
    );
  }
}


function isEven(num) {
  return num % 2 === 0
}