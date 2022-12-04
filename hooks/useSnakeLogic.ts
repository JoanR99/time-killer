import { useEffect, useState } from 'react';
import createBoard from '../utils/createBoard';
import getCoordsInDirection, {
	DIRECTION,
	Direction,
} from '../utils/getCoordsInDirection';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import getNodeGrowthDirection from '../utils/getNodeGrowthDirection';
import getStartingSnakeCoords from '../utils/getStartingSnakeCoords';
import isOutOfBoard from '../utils/isOutOfBoard';
import { Coords, LinkedList, LinkedListNode } from '../utils/linkedList';
import randomIntFromInterval from '../utils/randomIntFromInterval';
import useInterval from '../utils/useInterval';

const BOARD_SIZE = 15;

export default function useSnakeLogic() {
	const [board] = useState(createBoard(BOARD_SIZE, BOARD_SIZE));
	const [snake, setSnake] = useState(
		new LinkedList(getStartingSnakeCoords(board))
	);
	const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cel]));
	const [direction, setDirection] = useState<Direction>(
		DIRECTION.RIGHT as Direction
	);

	const [start, setStart] = useState(false);
	const [foodCell, setFoodCell] = useState(snake.head.value.cel + 5);
	const [score, setScore] = useState(0);

	useInterval(
		() => {
			moveSnake();
		},
		start ? 150 : null
	);

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			handleKeyDown(e);
		});
	}, []);

	function moveSnake() {
		const currentHeadCoords: Coords = {
			row: snake.head.value.row,
			col: snake.head.value.col,
		};

		const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);

		if (isOutOfBoard(nextHeadCoords, board)) {
			handleGameOver();
			return;
		}

		const nextHeadCel = board[nextHeadCoords.row][nextHeadCoords.col];

		if (snakeCells.has(nextHeadCel)) {
			handleGameOver();
			return;
		}

		const newHead = new LinkedListNode({
			row: nextHeadCoords.row,
			col: nextHeadCoords.col,
			cel: nextHeadCel,
		});

		const currentHead = snake.head;
		snake.head = newHead;
		currentHead.next = newHead;

		const newSnakeCells = new Set(snakeCells);
		newSnakeCells.delete(snake.tail.value.cel);
		newSnakeCells.add(nextHeadCel);

		snake.tail = snake.tail.next!;
		if (snake.tail === null) snake.tail = snake.head;

		const foodConsumed = nextHeadCel === foodCell;
		if (foodConsumed) {
			growSnake(newSnakeCells);
			handleFoodConsumption(newSnakeCells);
		}

		setSnakeCells(newSnakeCells);
	}

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

	function handleFoodConsumption(newSnakeCells: Set<number>) {
		const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
		let nextFoodCell;

		while (true) {
			nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
			if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
				continue;
			break;
		}

		setFoodCell(nextFoodCell);
		setScore(score + 1);
	}

	function handleKeyDown(e: KeyboardEvent) {
		const newDirection = getDirectionFromKey(e.key);
		const isValidDirection = newDirection !== '';
		if (!isValidDirection) return;

		setDirection(newDirection as Direction);
	}

	const handleStart = () => setStart(true);

	function handleGameOver() {
		const snakeStartingValue = getStartingSnakeCoords(board);
		setSnake(new LinkedList(snakeStartingValue));
		setSnakeCells(new Set([snakeStartingValue.cel]));
		setDirection(DIRECTION.RIGHT as Direction);
		setStart(false);
		setScore(0);
		setFoodCell(snakeStartingValue.cel + 5);
	}

	return { score, handleStart, board, snakeCells, foodCell };
}
