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
	collided: boolean;
	color: string;
};

const usePlayer = () => {
	const [player, setPlayer] = useState({} as PLAYER);
	const [nextPlayer, setNextPlayer] = useState<PLAYER>({
		pos: { x: WIDTH / 2 - 2, y: 0 },
		tetromino: randomTetromino().shape,
		collided: false,
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
		setPlayer((prev) => ({
			...prev,
			pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
			collided,
		}));
	};

	const resetPlayer = useCallback((): void => {
		setPlayer(nextPlayer);
		setNextPlayer({
			pos: { x: WIDTH / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false,
			color: getRandomColor(),
		});
	}, [nextPlayer]);

	return { player, nextPlayer, updatePlayerPos, resetPlayer, playerRotate };
};

export default usePlayer;
