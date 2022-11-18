import { SnakeCoords } from './linkedList';

export default function getStartingSnakeCoords(board: number[][]): SnakeCoords {
	const rowSize = board.length;
	const colSize = board[0].length;
	const startingRow = Math.round(rowSize / 3);
	const startingCol = Math.round(colSize / 3);
	const startingCoords = board[startingRow][startingCol];

	return {
		row: startingRow,
		col: startingCol,
		cel: startingCoords,
	};
}
