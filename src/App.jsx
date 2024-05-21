import React, { useState } from 'react';
import './App.scss';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleBoxClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const checkWinner = calculateWinner(newBoard);
    if (checkWinner) {
      setWinner(checkWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner('draw');
    } else {
      setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="app">
      <h1 className="app__title"> Tic Tac Toe </h1>
      <div className="app__board">
        {board.map((box, index) => (
          <div
            key={index}
            className={`app__box ${
              box ? `app__box--${box.toLowerCase()}` : 'app__box--empty'
            }`}
            onClick={() => handleBoxClick(index)}
          >
            {box}
          </div>
        ))}
      </div>
      {winner ? (
        <div className="app__winner">
          {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
        </div>
      ) : null}
      <button className="app__button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;