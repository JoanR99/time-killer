import { DIRECTION } from './getCoordsInDirection';

export default function getDirectionFromKey(key: number) {
	if (key === 38) return DIRECTION.UP;
	if (key === 39) return DIRECTION.RIGHT;
	if (key === 40) return DIRECTION.DOWN;
	if (key === 37) return DIRECTION.LEFT;
	return '';
}
