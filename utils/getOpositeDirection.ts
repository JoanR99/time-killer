import { Direction, DIRECTION } from './getCoordsInDirection';

export default function getOppositeDirection(direction: Direction) {
	if (direction === DIRECTION.UP) return DIRECTION.DOWN;
	if (direction === DIRECTION.RIGHT) return DIRECTION.LEFT;
	if (direction === DIRECTION.DOWN) return DIRECTION.UP;
	if (direction === DIRECTION.LEFT) return DIRECTION.RIGHT;
}
