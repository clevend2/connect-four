import { GameState } from "../game"

export function Info (props: { gameState: GameState, onReset: () => void }) {
    const text = props.gameState.winner 
        ? (
            props.gameState.winner === "empty" 
                ? "Nobody won. :(" 
                : `${props.gameState.winner} Won!`
        )
        : `${props.gameState.turn}'s Turn`;
    
    return (
        <div className={`info ${props.gameState.winner || props.gameState.turn}`}>
            <p>{text}</p>
            <button onClick={props.onReset} tabIndex={0}>Reset</button>
        </div>
    )
}