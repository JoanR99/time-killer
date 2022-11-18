import { DIRECTION } from './getCoordsInDirection';

export default function getDirectionFromKey(key: string) {
	if (key === 'ArrowUp') return DIRECTION.UP;
	if (key === 'ArrowRight') return DIRECTION.RIGHT;
	if (key === 'ArrowDown') return DIRECTION.DOWN;
	if (key === 'ArrowLeft') return DIRECTION.LEFT;
	return '';
}
