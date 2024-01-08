import React from 'react';
import { move, createGameState, GameState, PieceColor } from './game';
import { MoveBar } from './components/move-bar';
import { Board } from './components/board';
import { Info } from './components/info';

const ANIMATION_INTERVAL = 50;

function getFromLocalStorage(): GameState | undefined {
  const value = localStorage.getItem('gameState');
  
  if (value) {
    return JSON.parse(value);
  }
}

function animateDrop(column: number, color: PieceColor, onLanded: () => void) {
  let currPieceIdx = 0;
  let lastPiece: HTMLElement | null;
  let currPiece: HTMLElement | null;

  const drop = () => {
    currPiece = document.getElementById(`${column}-${currPieceIdx}`);

    if (lastPiece) {
      lastPiece.classList.remove(`dropping`);
      lastPiece.classList.remove(`dropping-${color}`);
    }

    if (currPiece?.classList.contains('empty')) {
      currPiece?.classList.add(`dropping`);
      currPiece?.classList.add(`dropping-${color}`);
      currPieceIdx++;

      lastPiece = currPiece;

      return true;
    } else {
      return false;
    }
  }

  drop();

  const animation = setInterval(() => {
    if (!drop()) {
      clearInterval(animation);   
      onLanded();
      
      if (lastPiece) {
        lastPiece.classList.remove(`empty`);
        lastPiece.classList.add(color);
        lastPiece.classList.remove(`dropping`);
        lastPiece.classList.remove(`dropping-${color}`);
      }
    }
  }, ANIMATION_INTERVAL);
}

function App() {
  const [gameState, setGameState] = React.useState(getFromLocalStorage() || createGameState());
  const [isDropping, setIsDropping] = React.useState(false);

  const onMove = (column: number) => {
    if (!isDropping) {
      const newGameState = move(gameState, column);

      if (newGameState) {
        setIsDropping(true);

        animateDrop(column, gameState.turn, () => {
          setGameState(newGameState);
          setIsDropping(false);
          localStorage.setItem('gameState', JSON.stringify(newGameState));
        });
      }
    }
  }

  const onReset = () => {
    setGameState(createGameState());
    localStorage.removeItem('gameState');
  }

  return (
    <div className={`game-container ${gameState.winner ? 'winner' : ''}`}>
      <Info gameState={gameState} onReset={onReset} />
      <div className={`board-container ${isDropping ? 'dropping' : ""}`}>
        <MoveBar gameState={gameState} onMove={onMove} />
        <Board gameState={gameState} onMove={onMove} />
      </div>
    </div>
  );
}

export default App;
