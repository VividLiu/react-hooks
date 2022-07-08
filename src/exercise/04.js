// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
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
  )
}

function History({moves, onMoveClick}) {
  const curMove = moves.length

  return (
    <ol>
      {moves.map((move, i) => (
        <li key={JSON.stringify(move)}>
          <button
            disabled={curMove === i + 1}
            onClick={e => onMoveClick(i + 1)}
          >
            {!i ? `Go to game start` : `Go to move #${i + 1}`}
            {i + 1 === curMove ? ' (current)' : ''}
          </button>
        </li>
      ))}
    </ol>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState('board', () =>
    Array(9).fill(null),
  )
  //use {} to represent the start move
  const [steps, setSteps] = useLocalStorageState('steps', [{}])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (!squares[square] && !winner) {
      let nextSquares = [...squares]
      nextSquares[square] = nextValue
      setSquares(nextSquares)

      let stepCopy = [...steps, {[square]: nextValue}]
      setSteps(stepCopy)
    }
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function onMoveClick(i) {
    const newSteps = steps.slice(0, i)
    const newSquares = calculateSquaresFromSteps(newSteps)
    setSteps(newSteps)
    setSquares(newSquares)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} selectSquare={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <History moves={steps} onMoveClick={onMoveClick} />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateSquaresFromSteps(steps) {
  const board = Array(9).fill(null)

  steps.forEach(step => {
    const key = Object.keys(step)[0]
    board[key] = step[key]
  })
  console.log(board)
  return board
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
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
