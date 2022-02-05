import React from "react";
import Board from "../board/board";
import "./game.css"

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
            </div>
        );
    }
}

export default Game;
