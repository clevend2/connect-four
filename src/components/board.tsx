import { GameState } from "../game";
import { Piece } from "./piece";

export function Board (props: { gameState: GameState, onMove: (column: number) => void }) {
    return (
        <div className="board">
        {props.gameState.board.map((column, i) => column.map((piece, k, row) => (
            <Piece 
                key={`${i}-${k}`} 
                id={`${i}-${k}`} 
                status={piece} 
                ariaLabel={`Column ${i + 1}, row ${row.length - k} - ${piece}`} 
                onPress={() => props.onMove(i)} 
                tabIndex={0}
            />
        )))}
        </div>
    )
  }