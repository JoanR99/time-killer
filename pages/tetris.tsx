import React, { useCallback, useEffect, useRef, useState } from 'react';
import createBoard from '../utils/createBoard';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import getT from '../utils/tetrominoes';
import theTetrominoes from '../utils/tetrominoes';
import useInterval from '../utils/useInterval';

const WIDTH = 10;

const getRandom = (max: number) => Math.floor(Math.random() * max);

function getShapeCoords(
	board: number[][],
	row: number,
	col: number,
	shape: number,
	rotation: number
) {
	return getT(board, row, col)[shape][rotation];
}

function Page() {
	const board = useRef(createBoard(20, WIDTH));
	const [shape, setShape] = useState(0);
	const [rotation, setRotation] = useState(0);
	const [row, setRow] = useState(0);
	const [col, setCol] = useState(4);

	const [start, setStart] = useState(false);

	const [currentShape, setCurrentShape] = useState<number[]>(
		getShapeCoords(board.current, row, col, shape, rotation)
	);

	const [nextShape, setNextShape] = useState(getRandom(5));

	const [taken, setTaken] = useState<Set<number>>(new Set());
	const [left, setLeft] = useState(false);
	console.log(currentShape);
	console.log(nextShape);

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
		setCurrentShape(getShapeCoords(board.current, row, col, shape, rotation));
	}, [row, col, rotation, shape]);

	function moveDown() {
		setRow((prevRow) => prevRow + 1);
		freeze();
	}

	function freeze() {
		const nexPos = getShapeCoords(board.current, row + 1, col, shape, rotation);
		const nPos = getShapeCoords(board.current, row + 2, col, shape, rotation);
		// const Pos = getShapeCoords(board.current, row + 3, col, shape, rotation);

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
			setNextShape(getRandom(5));
		}

		if (nexPos.some((node) => node >= 191)) {
			setRow(0);
			setCol(4);
			setShape(nextShape);
			setRotation(0);
			setTaken((prevTaken) => new Set([...Array.from(prevTaken), ...nexPos]));
			setNextShape(getRandom(5));
		}

		if (nPos.some((coord) => taken.has(coord))) {
			setRow(0);
			setCol(4);
			setShape(nextShape);
			setRotation(0);
			setTaken(
				(prevTaken) =>
					new Set([
						...Array.from(prevTaken),
						...getShapeCoords(board.current, row + 1, col, shape, rotation),
					])
			);
			setNextShape(getRandom(5));
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

	useInterval(() => moveDown(), 1000, start);

	return (
		<div>
			<button onClick={() => setStart(true)}>start</button>

			<div className="border border-black max-w-fit mt-8 m-auto">
				{board.current.map((row, ri) => (
					<div key={ri} className="flex">
						{row.map((cell, ci) => (
							<div
								key={ci}
								className={`border border-black h-9 w-9 ${
									currentShape?.includes(cell)
										? 'bg-blue-600'
										: taken?.has(cell)
										? 'bg-red-600'
										: ''
								}
							}`}
							>
								{cell}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default Page;
