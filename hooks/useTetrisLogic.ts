import { useCallback, useEffect, useRef, useState } from 'react';
import createBoard from '../utils/createBoard';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import useInterval from '../utils/useInterval';
import getT from '../utils/tetrominoes';
import getRandomNumber from '../utils/getRandomNumber';

const colors = ['orange', 'red', 'yellow', 'green', 'blue'];

const WIDTH = 10;
const HEIGHT = 20;

export function getShapeCoords(
	board: number[][],
	row: number,
	col: number,
	shape: number,
	rotation: number
) {
	return getT(board, row, col)[shape][rotation];
}

export default function useTetrisLogic() {
	const board = useRef(createBoard(HEIGHT, WIDTH));
	const nextShapeBoard = useRef(createBoard(5, 6));
	const [score, setScore] = useState(0);
	const [shape, setShape] = useState(0);
	const [rotation, setRotation] = useState(0);
	const [row, setRow] = useState(0);
	const [col, setCol] = useState(4);
	const [color, setColor] = useState(colors[0]);
	const [nextColor, setNextColor] = useState(colors[getRandomNumber(5)]);

	const [start, setStart] = useState(false);

	const [currentShape, setCurrentShape] = useState<number[]>(
		getShapeCoords(board.current, row, col, shape, rotation)
	);

	const [nextShape, setNextShape] = useState(getRandomNumber(5));

	const [taken, setTaken] = useState<Set<number>>(new Set());
	const [takenOrange, setTakenOrange] = useState<Set<number>>(new Set());
	const [takenRed, setTakenRed] = useState<Set<number>>(new Set());
	const [takenYellow, setTakenYellow] = useState<Set<number>>(new Set());
	const [takenGreen, setTakenGreen] = useState<Set<number>>(new Set());
	const [takenBlue, setTakenBlue] = useState<Set<number>>(new Set());

	const handleKeyDown = useCallback(
		(e: KeyboardEvent, row: number, shape: number, rotation: number) => {
			const newDirection = getDirectionFromKey(e.key);
			const isValidDirection = newDirection !== '';
			if (!isValidDirection) return;

			if (newDirection === 'RIGHT') {
				moveRight(row, shape, rotation);
			} else if (newDirection === 'LEFT') {
				moveLeft(row, shape, rotation);
			} else if (newDirection === 'UP') {
				rotate();
			}
		},
		[]
	);

	useEffect(() => {
		window.addEventListener('keydown', (e) =>
			handleKeyDown(e, row, shape, rotation)
		);
	}, [handleKeyDown]);

	useEffect(() => {
		gameOver();
		setCurrentShape(getShapeCoords(board.current, row, col, shape, rotation));
	}, [row, col, rotation, shape]);

	function moveDown() {
		setRow((prevRow) => prevRow + 1);
		freeze();
		getScore(board.current);
	}

	function getScore(board: number[][]) {
		board.forEach((row) => {
			if (row.every((cell) => taken.has(cell))) {
				if (row.every((cell) => takenOrange.has(cell))) {
					setTakenOrange(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setTakenRed(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenYellow(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenGreen(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenBlue(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTaken(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setScore((prevScore) => prevScore + 100);
				} else if (row.every((cell) => takenRed.has(cell))) {
					setTakenRed(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setTakenOrange(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenYellow(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenGreen(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenBlue(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTaken(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setScore((prevScore) => prevScore + 100);
				} else if (row.every((cell) => takenYellow.has(cell))) {
					setTakenYellow(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setTakenOrange(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenRed(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenGreen(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenBlue(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTaken(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setScore((prevScore) => prevScore + 100);
				} else if (row.every((cell) => takenGreen.has(cell))) {
					setTakenGreen(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setTakenOrange(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenRed(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenYellow(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenBlue(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTaken(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setScore((prevScore) => prevScore + 100);
				} else if (row.every((cell) => takenBlue.has(cell))) {
					setTakenBlue(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setTakenOrange(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenRed(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenYellow(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTakenYellow(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)].map((ce) =>
									ce < row[0] ? ce + 10 : ce
								)
							)
					);
					setTaken(
						(prevTaken) =>
							new Set(
								[...Array.from(prevTaken)]
									.filter((c) => !row.includes(c))
									.map((ce) => (ce < row[0] ? ce + 10 : ce))
							)
					);
					setScore((prevScore) => prevScore + 100);
				}
			}
		});
	}

	function setTakenColor(color: string, colorShape: number[]) {
		switch (color) {
			case 'orange':
				setTakenOrange(
					(prevTaken) => new Set([...Array.from(prevTaken), ...colorShape])
				);
				break;
			case 'red':
				setTakenRed(
					(prevTaken) => new Set([...Array.from(prevTaken), ...colorShape])
				);
				break;
			case 'yellow':
				setTakenYellow(
					(prevTaken) => new Set([...Array.from(prevTaken), ...colorShape])
				);
				break;
			case 'green':
				setTakenGreen(
					(prevTaken) => new Set([...Array.from(prevTaken), ...colorShape])
				);
				break;
			case 'blue':
				setTakenBlue(
					(prevTaken) => new Set([...Array.from(prevTaken), ...colorShape])
				);
				break;
			default:
				return;
		}
	}

	function freeze() {
		const nexPos = getShapeCoords(board.current, row + 1, col, shape, rotation);
		const nPos = getShapeCoords(board.current, row + 2, col, shape, rotation);

		if (
			nPos.some((node) => node >= 191) &&
			shape === 4 &&
			(rotation === 0 || rotation === 2)
		) {
			setRow(0);
			setCol(4);
			setShape(nextShape);
			setRotation(0);
			setTaken((prevTaken) => new Set([...Array.from(prevTaken), ...nPos]));
			setTakenColor(color, nPos);
			setNextShape(getRandomNumber(5));
			setColor(nextColor);
			setNextColor(colors[getRandomNumber(5)]);
		}

		if (nexPos.some((node) => node >= 191)) {
			setRow(0);
			setCol(4);
			setShape(nextShape);
			setRotation(0);
			setTaken((prevTaken) => new Set([...Array.from(prevTaken), ...nexPos]));
			setTakenColor(color, nexPos);
			setNextShape(getRandomNumber(5));
			setColor(nextColor);
			setNextColor(colors[getRandomNumber(5)]);
		}

		if (nPos.some((coord) => taken.has(coord))) {
			setRow(0);
			setCol(4);
			setShape(nextShape);
			setRotation(0);
			setTaken((prevTaken) => new Set([...Array.from(prevTaken), ...nexPos]));
			setTakenColor(color, nexPos);
			setNextShape(getRandomNumber(5));
			setColor(nextColor);
			setNextColor(colors[getRandomNumber(5)]);
		}
	}

	function moveLeft(row: number, shape: number, rotation: number) {
		setCol((prevCol) => {
			const nexPos = getShapeCoords(
				board.current,
				row,
				prevCol - 1,
				shape,
				rotation
			);
			if (nexPos.some((coord) => !coord)) {
				return prevCol;
			}

			return --prevCol;
		});
	}

	function gameOver() {
		const currentStartingShapePos = getShapeCoords(
			board.current,
			0,
			col,
			shape,
			rotation
		);

		if (currentStartingShapePos.some((cell) => taken.has(cell))) {
			setScore(0);
			setShape(0);
			setRotation(0);
			setRow(0);
			setCol(4);
			setColor(colors[0]);
			setNextColor(colors[getRandomNumber(5)]);

			setStart(false);

			setCurrentShape(getShapeCoords(board.current, 0, 4, 0, 0));

			setNextShape(getRandomNumber(5));

			setTaken(new Set());
			setTakenOrange(new Set());
			setTakenRed(new Set());
			setTakenYellow(new Set());
			setTakenGreen(new Set());
			setTakenBlue(new Set());
		}
	}

	function moveRight(row: number, shape: number, rotation: number) {
		setCol((prevCol) => {
			const nexPos = getShapeCoords(
				board.current,
				row,
				prevCol + 1,
				shape,
				rotation
			);
			if (nexPos.some((coord) => !coord)) {
				return prevCol;
			}

			return ++prevCol;
		});
	}

	function rotate() {
		setRotation((prevRot) => {
			const nextRot = prevRot + 1 > 3 ? 0 : prevRot + 1;
			const nexPos = getShapeCoords(board.current, row, col, shape, nextRot);
			if (nexPos.some((coord) => !coord)) {
				return prevRot;
			}

			return nextRot;
		});
	}

	useInterval(() => moveDown(), start ? 1000 : null);

	function getColor(cell: number) {
		if (takenOrange.has(cell)) return 'bg-orange-600';
		else if (takenRed.has(cell)) return 'bg-red-600';
		else if (takenYellow.has(cell)) return 'bg-yellow-600';
		else if (takenGreen.has(cell)) return 'bg-green-600';
		else if (takenBlue.has(cell)) return 'bg-blue-600';
		else return '';
	}

	return {
		score,
		board,
		setStart,
		currentShape,
		nextShapeBoard,
		getColor,
		color,
		nextColor,
		nextShape,
	};
}
