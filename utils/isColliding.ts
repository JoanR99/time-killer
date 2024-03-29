import { PLAYER } from '../hooks/useTetrisPlayer';
import { BOARD } from '../hooks/useTetrisBoard';

export const isColliding = (
	player: PLAYER,
	board: BOARD,
	{ x: moveX, y: moveY }: { x: number; y: number }
) => {
	// Using for loops to be able to return (and break). Not possible with forEach
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
			// 1. Check that we're on an actual Tetromino cell
			if (player.tetromino[y][x] !== 0) {
				if (
					// 2. Check that our move is inside the game areas height (y)
					// That we're not moving through the bottom of the grid
					!board[y + player.pos.y + moveY] ||
					// 3. Check that our move is inside the game areas width (x)
					!board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					// 4. Check that the cell we're moving to isn't set to clear
					board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
						'clear'
				) {
					return true;
				}
			}
		}
	}

	// 5. If everything above is false
	return false;
};
