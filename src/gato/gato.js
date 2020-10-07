import React , {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import './index.css';


const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = (props) => {

  const renderSquare = (i) => {
    return(
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />);
  }

  return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)} 
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
    
}

const Game = () => {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [
  //       {
  //         squares: Array(9).fill(null)
  //       }
  //     ],
  //     stepNumber: 0,
  //     xIsNext: true
  //   };
  // }



    const [history,setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState("");

    const handleClick = (i) => {
      const hist = history.slice(0, stepNumber + 1 );
      const current = hist[hist.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "Y";
    
      setHistory(hist.concat([{ squares }]));
      setStepNumber(hist.length);
      setXIsNext(!xIsNext);
    }
  
    const jumpTo = (step) => {
      setStepNumber(step);
      setXIsNext((step % 2) === 0);
    }
    

    const moves = history.map((step, move) => {
      const desc = move ?
        'Movimiento #' + move :
        'Reiniciar';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });


    // this.state.history;
    // const current = history[this.state.stepNumber];
    // const winner = calculateWinner(current.squares);


    
    let current = history[stepNumber]; 
    let winner = calculateWinner(current.squares); 
      k(()=> {
      current = history[stepNumber];
      winner = calculateWinner(current.squares);    
      
      if (winner) {
        setStatus("Ganador: " + winner);
      } else {
        setStatus(" Siguiente jugador: " + (xIsNext ? "X" : "Y"));
      }

    });

  
  
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );

  }

  function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }


ReactDOM.render(<Game />, document.getElementById("root"));

