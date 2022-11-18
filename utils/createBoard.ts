export default function createBoard(boardSize: number) {
	const board = [];
	let counter = 1;

	for (let row = 0; row < boardSize; row++) {
		const currentRow = [];

		for (let cel = 0; cel < boardSize; cel++) {
			currentRow.push(counter++);
		}
		board.push(currentRow);
	}

	return board;
}
