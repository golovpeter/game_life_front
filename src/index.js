import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button
            className="square"
            style={{background: props.isSelected ? "palevioletred" : "#fff"}}
            onMouseEnter={props.onClick}/>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameField: Array(30).fill(null).map(() => Array(50).fill(0)),
            isGameStarted: false,
        };
    }

    handleClick(i, j) {
        let array = this.state.gameField;
        array[i][j] = array[i][j] === 0 ? 1 : 0;
        this.setState({
            gameField: array,
        });
    }

    startGame() {
        fetch("http://localhost:8000/startGame", {
            method: "POST",
            body: JSON.stringify({startField: this.state.gameField})
        }).then(r => r.json())
            .then(r => {
                this.setState({
                    gameID: r.GameID,
                    isGameStarted: true
                });
                this.intervalID = setInterval(() => this.nextStep(), 100);
            });
    }

    nextStep() {
        fetch("http://localhost:8000/nextStep", {
            method: "POST",
            body: JSON.stringify({gameID: this.state.gameID})
        }).then(r => r.json())
            .then(r => {
                this.setState({gameField: r.GameField});
            });
    }

    stopGame() {
        clearInterval(this.intervalID)
        this.setState({isGameStarted: false})
    }

    cleanField() {
        this.setState({gameField: Array(30).fill(null).map(() => Array(50).fill(0))})
    }

    renderSquare(i, j) {
        return (
            <Square
                key={`col_${i}_${j}`}
                isSelected={this.state.gameField[i][j]}
                onClick={() => !this.state.isGameStarted ? this.handleClick(i, j) : () => {
                }}/>
        );
    }

    render() {
        return (
            <div>
                {this.state.gameField.map((row, i) => (
                    <div key={`row_${i}`} className="board-row">
                        {row.map((col, j) => this.renderSquare(i, j))}
                    </div>
                ))}
                <div className="mainButtons">
                    <button
                        className="mainButton"
                        onClick={() => !this.state.isGameStarted ? this.startGame() : this.stopGame()}>
                        {!this.state.isGameStarted ? 'Start Game' : 'Stop Game'}
                    </button>
                    <button
                        className="mainButton"
                        onClick={() => this.cleanField()}
                        disabled={this.state.isGameStarted}>
                        Clean
                    </button>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
