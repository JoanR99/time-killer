import { useEffect, useState } from 'react';
import { NextShape, PLAYER } from './usePlayer';

export const WIDTH = 12;
export const HEIGHT = 20;

export type BOARDCELL = [string | number, string, string];
export type BOARD = BOARDCELL[][];

export const createBoard = (height: number, width: number) =>
	Array.from(Array(height), () =>
		Array(width).fill([0, 'clear', 'void'])
	) as BOARD;

const useTetrisBoard = (
	player: PLAYER,
	nextShape: NextShape,
	resetPlayer: () => void
) => {
	const [board, setBoard] = useState(createBoard(HEIGHT, WIDTH));
	const [nextBoard, setNextBoard] = useState(createBoard(6, 6));
	const [rowsCleared, setRowsCleared] = useState(0);

	useEffect(() => {
		const updateBoard = (prevBoard: BOARD): BOARD => {
			const newBoard = prevBoard.map(
				(row) =>
					row.map((cell) =>
						cell[1] === 'clear' ? [0, 'clear'] : cell
					) as BOARDCELL[]
			);

			nextShape.tetromino?.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newBoard[y][x + 2] = [value, 'clear', nextShape.color];
					}
				});
			});

			return newBoard;
		};

		setNextBoard((prev) => updateBoard(prev));
	}, [nextShape, resetPlayer]);

	useEffect(() => {
		if (!player.pos) return;

		setRowsCleared(0);

		const sweepRows = (newBoard: BOARD): BOARD => {
			return newBoard.reduce((ack, row) => {
				if (row.findIndex((cell) => cell[0] === 0) === -1) {
					setRowsCleared((prev) => prev + 1);

					ack.unshift(
						new Array(newBoard[0].length).fill([0, 'clear']) as BOARDCELL[]
					);
					return ack;
				}

				ack.push(row);
				return ack;
			}, [] as BOARD);
		};

		const updateBoard = (prevBoard: BOARD): BOARD => {
			const newBoard = prevBoard.map(
				(row) =>
					row.map((cell) =>
						cell[1] === 'clear' ? [0, 'clear'] : cell
					) as BOARDCELL[]
			);

			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newBoard[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`,
							player.color,
						];
					}
				});
			});

			if (player.collided) {
				resetPlayer();
				return sweepRows(newBoard);
			}

			return newBoard;
		};

		setBoard((prev) => updateBoard(prev));
	}, [
		player.pos,
		player.collided,
		player.color,
		player.tetromino,
		resetPlayer,
	]);

	return { board, nextBoard, setBoard, rowsCleared };
};

export default useTetrisBoard;
