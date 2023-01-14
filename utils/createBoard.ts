import { BOARD } from '../hooks/useTetrisBoard';

export default function createBoard(rowsSize: number, colsSize: number) {
	const board = [];
	let counter = 1;

	for (let row = 0; row < rowsSize; row++) {
		const currentRow = [];

		for (let cel = 0; cel < colsSize; cel++) {
			currentRow.push(counter++);
		}
		board.push(currentRow);
	}

	return board;
}
