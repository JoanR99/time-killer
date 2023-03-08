import { useState } from 'react';
import { DIRECTION, Direction } from '../utils/getCoordsInDirection';
import getNodeGrowthDirection from '../utils/getNodeGrowthDirection';
import getStartingSnakeCoords from '../utils/getStartingSnakeCoords';
import isOutOfBoard from '../utils/isOutOfBoard';
import { LinkedList, LinkedListNode, SnakeCoords } from '../utils/linkedList';

const useSnake = (board: number[][]) => {
	const [snake, setSnake] = useState(
		new LinkedList(getStartingSnakeCoords(board))
	);
	const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cel]));
	const [direction, setDirection] = useState<Direction>(
		DIRECTION.RIGHT as Direction
	);

	function growSnake(newSnakeCells: Set<number>) {
		const growthNodeCoords = getNodeGrowthDirection(snake.tail, direction);

		if (isOutOfBoard(growthNodeCoords, board)) return;

		const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];

		const newTail = new LinkedListNode({
			row: growthNodeCoords.row,
			col: growthNodeCoords.col,
			cel: newTailCell,
		});

		const currentTail = snake.tail;
		snake.tail = newTail;
		snake.tail.next = currentTail;

		newSnakeCells.add(newTailCell);
	}

	const resetSnake = (snakeStartingValue: SnakeCoords) => {
		setSnake(new LinkedList(snakeStartingValue));
		setSnakeCells(new Set([snakeStartingValue.cel]));
		setDirection(DIRECTION.RIGHT as Direction);
	};

	return {
		snake,
		direction,
		snakeCells,
		growSnake,
		resetSnake,
		setDirection,
		setSnakeCells,
	};
};

export default useSnake;
