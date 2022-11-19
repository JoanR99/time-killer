import getCoordsInDirection, { Direction } from './getCoordsInDirection';
import getNodeNextDirection from './getNodeNextDirection';
import getOppositeDirection from './getOpositeDirection';
import { LinkedListNode } from './linkedList';

export default function getNodeGrowthDirection(
	snakeTail: LinkedListNode,
	currentDirection: Direction
) {
	const tailNextNodeDirection = getNodeNextDirection(
		snakeTail,
		currentDirection
	);
	const growthDirection = getOppositeDirection(
		tailNextNodeDirection as Direction
	);

	const currentTailCoords = {
		row: snakeTail.value.row,
		col: snakeTail.value.col,
	};

	const growthNodeCoords = getCoordsInDirection(
		currentTailCoords,
		growthDirection as Direction
	);

	return growthNodeCoords;
}
