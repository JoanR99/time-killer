import { useCallback, useState } from 'react';
import { getRandomColor } from '../utils/getRandomColor';
import { isColliding } from '../utils/isColliding';
import { randomTetromino } from '../utils/randomTetromino';
import { BOARD, WIDTH } from './useTetrisBoard';

export type PLAYER = {
	pos: {
		x: number;
		y: number;
	};
	tetromino: (string | number)[][];
	color: string;
	collided: boolean;
};

export type NextShape = Pick<PLAYER, 'tetromino' | 'color'>;

const usePlayer = () => {
	const [player, setPlayer] = useState({} as PLAYER);
	const [nextShape, setNextShape] = useState<NextShape>({
		tetromino: randomTetromino().shape,
		color: getRandomColor(),
	});

	const rotate = (matrix: PLAYER['tetromino']) => {
		// Make the rows to become cols (transpose)
		const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));
		// Reverse each row to get a rotated matrix
		return mtrx.map((row) => row.reverse());
	};

	const playerRotate = (board: BOARD): void => {
		const clonedPlayer = JSON.parse(JSON.stringify(player));
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

		// This one is so the player can't rotate into the walls or other tetrominos that's merged
		const posX = clonedPlayer.pos.x;
		let offset = 1;
		while (isColliding(clonedPlayer, board, { x: 0, y: 0 })) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));

			if (offset > clonedPlayer.tetromino[0].length) {
				clonedPlayer.pos.x = posX;
				return;
			}
		}

		setPlayer(clonedPlayer);
	};

	const updatePlayerPos = ({
		x,
		y,
		collided,
	}: {
		x: number;
		y: number;
		collided: boolean;
	}): void => {
		setPlayer({
			...player,
			pos: { x: (player.pos.x += x), y: (player.pos.y += y) },
			collided,
		});
	};

	const resetPlayer = useCallback((): void => {
		setPlayer({
			pos: { x: WIDTH / 2 - 2, y: 0 },
			tetromino: nextShape.tetromino,
			color: nextShape.color,
			collided: false,
		});
		setNextShape({
			tetromino: randomTetromino().shape,
			color: getRandomColor(),
		});
	}, [nextShape]);

	return { player, nextShape, updatePlayerPos, resetPlayer, playerRotate };
};

export default usePlayer;
