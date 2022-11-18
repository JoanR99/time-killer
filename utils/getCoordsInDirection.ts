import { Coords } from './linkedList';

export const DIRECTION = {
	UP: 'UP',
	DOWN: 'DOWN',
	RIGHT: 'RIGHT',
	LEFT: 'LEFT',
};

export type Direction = 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';

export default function getCoordsInDirection(
	coords: Coords,
	direction: Direction
): Coords {
	if (direction === DIRECTION.UP) {
		return {
			...coords,
			row: coords.row - 1,
		};
	}

	if (direction === DIRECTION.DOWN) {
		return {
			...coords,
			row: coords.row + 1,
		};
	}

	if (direction === DIRECTION.RIGHT) {
		return {
			...coords,
			col: coords.col + 1,
		};
	}

	if (direction === DIRECTION.LEFT) {
		return {
			...coords,
			col: coords.col - 1,
		};
	}

	return coords;
}
