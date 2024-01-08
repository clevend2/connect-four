

export enum PieceColor {
    Red = 'Red',
    Yellow = 'Yellow',
}

export type PieceStatus = 'empty' | PieceColor;

export type Board = PieceStatus[][];

export interface GameState {
    board: Board;
    turn: PieceColor;
    winner: PieceStatus | null;
}

export const BOARD_COLUMNS = 7;

export const BOARD_ROWS = 6;

export const COLORS = [
    PieceColor.Red,
    PieceColor.Yellow,
];

export function createGameState () {
    return {
        board: createBoard(),
        turn: PieceColor.Red,
        winner: null,
    };
}

function createBoard () {
    const board: Board = [];

    for (let i = 0; i < BOARD_COLUMNS; i++) {
        const col: PieceStatus[] = [];

        for (let j = 0; j < BOARD_ROWS; j++) {
            col.push("empty");
        }

        board.push(col);
    }

    return board;
}

export function columnIsFull(gameState: GameState, column: number) {
    return findEmptySpot(gameState.board, column) === -1;
};

export function move(gameState: GameState, column: number) {
    if (gameState.winner) {
        return;
    }
    
    const emptySpot = findEmptySpot(gameState.board, column);

    if (emptySpot === -1) {
        return;
    }

    const newGameState: GameState = structuredClone(gameState);

    newGameState.board[column][emptySpot] = gameState.turn;
    
    const winner = findConnectFour(newGameState, [column, emptySpot]);

    if (winner) {
        newGameState.winner = winner;
    } else {
        if (newGameState.board.every((column, i) => findEmptySpot(newGameState.board, i) === -1)) {
            newGameState.winner = 'empty';
        }
    }

    newGameState.turn = gameState.turn === PieceColor.Red ? PieceColor.Yellow : PieceColor.Red;

    return newGameState;
}

function findConnectFour (gameState: GameState, lastMove: [number, number]): PieceColor | undefined {
    // the last move's row
    const row = lastMove[1];

    // the last move's column
    const col = lastMove[0];

    // the last move's diagonal
    const diagonal = row - col;

    // the last move's anti-diagonal
    const antiDiagonal = row + col;

    // the lines that contain the last move
    const lines = [
        // the last move's column
        gameState.board[col],
        // the last move's row
        gameState.board.map(col => col[row]),
        // the last move's diagonal
        gameState.board.map((column, index) => column[index + diagonal]).filter((piece) => !!piece),
        // the last move's anti-diagonal
        gameState.board.map((column, index) => column[antiDiagonal - index]).filter((piece) => !!piece),
    ];

    // scan each line
    for (const line of lines) {
        const winner = findConnectFourInLine(line);

        if (winner) {
            return winner;
        }
    }
}

function findConnectFourInLine (line: PieceStatus[]): PieceColor | undefined {
    return COLORS.find(color => {
        return line.join('').includes(color.repeat(4));
    });
}

function findEmptySpot (board: Board, column: number): number {
    for (let emptySpot = board[column].length - 1; emptySpot >= 0; emptySpot--) {
        if (board[column][emptySpot] === 'empty') {
            return emptySpot;
        }
    }

    return -1;
};
