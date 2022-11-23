import { useCallback, useEffect, useRef, useState } from 'react';
import createBoard from '../utils/createBoard';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import useInterval from '../utils/useInterval';

const getRandom = (max: number) => Math.floor(Math.random() * max);

function getWallRows(rows: number) {
	const openRows = getRandom(46);

	let wallRows = [];

	for (let i = 0; i < rows; i++) {
		if (i < openRows || i > openRows + 12) {
			wallRows.push(i);
		}
	}
	return wallRows;
}

function getWallS(board: number[][], rows: number[], cols: number[]) {
	let wall = [];
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < cols.length; j++) {
			wall.push(board[rows[i]][cols[j]]);
		}
	}
	return wall;
}

function getBirdPosition(board: number[][], rows: number[]) {
	let bird = [];

	for (let row of rows) {
		bird.push(board[row][6]);
		bird.push(board[row][7]);
		bird.push(board[row][8]);
		bird.push(board[row][9]);
	}

	return bird;
}

export default function Page() {
	const board = useRef(createBoard(60, 40));
	const [start, setStart] = useState(false);
	const [wallCol, setWallCol] = useState([36, 37, 38, 39]);
	const [wallRows, setWallRows] = useState(getWallRows(board.current.length));
	const [wall, setWall] = useState<Set<number>>(new Set([]));
	const [birdRow, setBirdRow] = useState<Set<number>>(
		new Set([29, 30, 31, 32])
	);
	const [birdPosition, setBirdPosition] = useState<Set<number>>(new Set([]));
	const [score, setScore] = useState(0);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		const newDirection = getDirectionFromKey(e.key);
		const isValidDirection = newDirection !== '';
		if (!isValidDirection) return;

		setBirdRow(
			(prevRow) =>
				new Set(
					Array.from(prevRow).map((row, i) => {
						if (i === 0 && row - 4 < 1) {
							return 0;
						}

						if (i === 1 && row - 4 < 2) {
							return 1;
						}
						if (i === 2 && row - 4 < 3) {
							return 2;
						}
						if (i === 3 && row - 4 < 4) {
							return 3;
						}

						return row - 4;
					})
				)
		);
	}, []);

	function moveWalls() {
		handleGameOver();
		setWallCol((prevCol) => prevCol.map((col) => col - 1));
		resetWall();
	}

	function moveBird() {
		setBirdRow(
			(prevRow) =>
				new Set(
					Array.from(prevRow).map((row, i) => {
						if (i === 0 && row + 1 > 56) {
							return 56;
						}
						if (i === 1 && row + 1 > 57) {
							return 57;
						}
						if (i === 2 && row + 1 > 58) {
							return 58;
						}
						if (i === 3 && row + 1 > 59) {
							return 59;
						}

						return row + 1;
					})
				)
		);
	}

	function resetWall() {
		if (wallCol.some((col) => col === 0)) {
			setWallCol([36, 37, 38, 39]);
			setWallRows(getWallRows(board.current.length));
			setScore((prevScore) => ++prevScore);
		}
	}

	function handleGameOver() {
		if (Array.from(birdPosition).some((cell) => wall.has(cell))) {
			setStart(false);
			setWallCol([36, 37, 38, 39]);
			setWallRows(getWallRows(board.current.length));
			setBirdRow(new Set([29, 30, 31, 32]));
			setBirdPosition(new Set([]));
			setScore(0);
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', (e) => handleKeyDown(e));
	}, [handleKeyDown]);

	useEffect(() => {
		setWall(new Set(getWallS(board.current, wallRows, wallCol)));
	}, [wallCol, wallRows]);

	useEffect(() => {
		setBirdPosition(
			new Set(getBirdPosition(board.current, Array.from(birdRow)))
		);
	}, [birdRow]);

	useInterval(() => moveWalls(), 150, start);
	useInterval(() => moveBird(), 150, start);

	return (
		<div>
			<button onClick={() => setStart(true)}>Start</button>
			<h1>{score}</h1>
			<div className="border border-black max-w-fit mt-8 mx-auto">
				{board.current.map((row, ri) => (
					<div key={ri} className="flex">
						{row.map((cell, ci) => (
							<div
								key={ci}
								className={`h-2 w-2 ${
									wall.has(cell)
										? ' bg-red-600'
										: birdPosition.has(cell)
										? 'bg-blue-600 rounded-full'
										: ''
								}`}
							></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
