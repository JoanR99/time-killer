const WIDTH = 10;

//The Tetrominoes

function getT(board: number[][], row: number, col: number) {
	const row1 = row + 1 > board.length - 1 ? board.length - 1 : row + 1;
	const row2 = row + 2 > board.length - 1 ? board.length - 1 : row + 2;
	const row3 = row + 3 > board.length - 1 ? board.length - 1 : row + 3;

	const lTetromino: number[][] = [
		[board[row][col], board[row1][col], board[row2][col], board[row][col + 1]],
		[
			board[row][col],
			board[row][col + 1],
			board[row][col + 2],
			board[row1][col + 2],
		],
		[
			board[row][col + 1],
			board[row1][col + 1],
			board[row2][col + 1],
			board[row2][col],
		],
		[
			board[row1][col],
			board[row1][col + 1],
			board[row1][col + 2],
			board[row][col + 2],
		],
	];

	const zTetromino: number[][] = [
		[
			board[row][col],
			board[row][col + 1],
			board[row1][col],
			board[row1][col - 1],
		],
		[
			board[row][col],
			board[row1][col],
			board[row1][col + 1],
			board[row2][col + 1],
		],
		[
			board[row][col],
			board[row][col + 1],
			board[row1][col],
			board[row1][col - 1],
		],
		[
			board[row][col],
			board[row1][col],
			board[row1][col + 1],
			board[row2][col + 1],
		],
		[
			board[row][col],
			board[row1][col],
			board[row1][col + 1],
			board[row2][col + 1],
		],
	];

	const tTetromino: number[][] = [
		[
			board[row][col + 1],
			board[row1][col],
			board[row1][col + 1],
			board[row1][col + 2],
		],
		[board[row][col], board[row1][col], board[row1][col + 1], board[row2][col]],
		[
			board[row][col - 1],
			board[row][col],
			board[row][col + 1],
			board[row1][col + 1],
		],
		[board[row][col], board[row1][col], board[row1][col - 1], board[row2][col]],
	];

	const oTetromino: number[][] = [
		[
			board[row][col],
			board[row][col + 1],
			board[row1][col],
			board[row1][col + 1],
		],
		[
			board[row][col],
			board[row][col + 1],
			board[row1][col],
			board[row1][col + 1],
		],
		[
			board[row][col],
			board[row][col + 1],
			board[row1][col],
			board[row1][col + 1],
		],
		[
			board[row][col],
			board[row][col + 1],
			board[row1][col],
			board[row1][col + 1],
		],
	];

	const iTetromino: number[][] = [
		[
			board[row][col - 1],
			board[row][col],
			board[row][col + 1],
			board[row][col + 2],
		],
		[board[row][col], board[row1][col], board[row2][col], board[row3][col]],
		[
			board[row][col - 1],
			board[row][col],
			board[row][col + 1],
			board[row][col + 2],
		],
		[board[row][col], board[row1][col], board[row2][col], board[row3][col]],
	];

	const theTetrominoes = [
		lTetromino,
		zTetromino,
		tTetromino,
		oTetromino,
		iTetromino,
	];

	return theTetrominoes;
}

export default getT;
