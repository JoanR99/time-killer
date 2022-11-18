import { Coords } from './linkedList';

export default function isOutOfBoard(coords: Coords, board: number[][]) {
	if (coords.col < 0 || coords.row < 0) return true;
	if (board.length <= coords.row || board[0].length <= coords.col) return true;
	return false;
}
