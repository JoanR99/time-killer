import React, { useEffect, useState } from 'react';
import createBoard from '../utils/createBoard';
import getCoordsInDirection, {
	Direction,
	DIRECTION,
} from '../utils/getCoordsInDirection';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import getStartingSnakeCoords from '../utils/getStartingSnakeCoords';
import isOutOfBoard from '../utils/isOutOfBoard';
import { Coords, LinkedList, LinkedListNode } from '../utils/linkedList';
import useInterval from '../utils/useInterval';

const BOARD_SIZE = 15;

const Board = () => {
	const [board] = useState(createBoard(BOARD_SIZE));
	const [snake, setSnake] = useState(
		new LinkedList(getStartingSnakeCoords(board))
	);
	const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cel]));
	const [direction, setDirection] = useState<Direction>(
		DIRECTION.RIGHT as Direction
	);
	const [start, setStart] = useState(false);
	const [foodCell, setFoodCell] = useState(snake.head.value.cel + 5);

	useInterval(
		() => {
			moveSnake();
		},
		150,
		start
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

		setSnakeCells(newSnakeCells);

		snake.tail = snake.tail.next!;
		if (snake.tail === null) snake.tail = snake.head;
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
	}

	return (
		<div>
			<button onClick={handleStart}>Start</button>

			<div className="border border-black max-w-fit mt-8 m-auto">
				{board.map((row, ri) => (
					<div key={ri} className="flex">
						{row.map((cell, ci) => (
							<div
								key={ci}
								className={`border border-black h-9 w-9 ${
									snakeCells.has(cell)
										? 'bg-orange-600'
										: foodCell === cell
										? 'bg-green-600'
										: ''
								}`}
							></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Board;
