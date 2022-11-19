import { DIRECTION, Direction } from './getCoordsInDirection';
import { LinkedListNode } from './linkedList';

export default function getNodeNextDirection(
	node: LinkedListNode,
	currentDirection: Direction
) {
	if (node.next === null) return currentDirection;
	const { row: currentRow, cel: currentCel } = node.value;
	const { row: nextRow, cel: nextCel } = node.next.value;

	if (currentRow === nextRow && currentCel === nextCel + 1)
		return DIRECTION.RIGHT;
	if (currentRow === nextRow && currentCel === nextCel - 1)
		return DIRECTION.LEFT;
	if (currentCel === nextCel && currentRow === nextRow + 1)
		return DIRECTION.DOWN;
	if (currentCel === nextCel && currentRow === nextRow - 1) return DIRECTION.UP;
	return '';
}
