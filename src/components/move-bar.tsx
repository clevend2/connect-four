import { GameState, columnIsFull } from "../game";
import { Piece } from "./piece";

export function MoveBar (props: { gameState: GameState, onMove: (column: number) => void }) {
    return <div className="move-bar">
      {props.gameState.board.map((column, i) => (
        <Piece 
          disabled={columnIsFull(props.gameState, i)} 
          key={`${i}-move`} 
          status={props.gameState.turn} 
          ariaLabel={`Drop ${props.gameState.turn} in column ${i + 1}`}
          tabIndex={i + 1} 
          onPress={() => props.onMove(i)} 
        />
      ))}
    </div>
  }