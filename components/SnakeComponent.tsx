import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addUserScore } from '../firebase';
import useSnake from '../hooks/useSnake';
import createBoard from '../utils/createBoard';
import getCoordsInDirection, { Direction } from '../utils/getCoordsInDirection';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import getStartingSnakeCoords from '../utils/getStartingSnakeCoords';
import isOutOfBoard from '../utils/isOutOfBoard';
import { Coords, LinkedListNode } from '../utils/linkedList';
import playSound from '../utils/playSound';
import randomIntFromInterval from '../utils/randomIntFromInterval';
import useInterval from '../utils/useInterval';
import Button from '../components/Button';

const BOARD_SIZE = 15;

const SnakeGame = () => {
	const [board] = useState(createBoard(BOARD_SIZE, BOARD_SIZE));
	const {
		snake,
		snakeCells,
		direction,
		resetSnake,
		growSnake,
		setDirection,
		setSnakeCells,
	} = useSnake(board);

	const [speed, setSpeed] = useState<number | null>(null);
	const [foodCell, setFoodCell] = useState(snake.head.value.cel + 5);
	const [score, setScore] = useState(0);
	const boardRef = useRef<HTMLDivElement>(null);
	const auth = useAuth();

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
		playSound('blue');
	}

	function keyDown({ keyCode }: { keyCode: number }) {
		const newDirection = getDirectionFromKey(keyCode);
		const isValidDirection = newDirection !== '';
		if (!isValidDirection) return;

		setDirection(newDirection as Direction);
	}

	const handleStart = () => {
		if (boardRef.current) boardRef.current.focus();
		setSpeed(150);
	};

	async function handleGameOver() {
		const snakeStartingValue = getStartingSnakeCoords(board);
		resetSnake(snakeStartingValue);
		setSpeed(null);
		setScore(0);
		setFoodCell(snakeStartingValue.cel + 5);
		playSound('wrong');
		boardRef.current?.classList.add('game-over');
		setTimeout(() => {
			boardRef.current?.classList.remove('game-over');
		}, 200);
		if (auth?.currentUser) {
			await addUserScore(auth?.currentUser, 'snake', score);
		}
	}

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

	useInterval(() => {
		moveSnake();
	}, speed);

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={keyDown}
			ref={boardRef}
			className="outline-none"
		>
			<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
				Snake Game
			</h2>
			<div className="flex justify-center gap-8 p-4 mb-8 items-center">
				<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
				{!speed && (
					<Button intent="primary" onClick={handleStart}>
						Start
					</Button>
				)}
			</div>

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

export default SnakeGame;
