import React from 'react';
import  Juego  from "./Juego";


class Game extends React.Component {
    
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Juego />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

export default Game;