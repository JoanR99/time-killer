import { useRef, useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import useTetrisPlayer from '../hooks/useTetrisPlayer';
import useTetrisBoard, {
	createBoard,
	HEIGHT,
	WIDTH,
} from '../hooks/useTetrisBoard';
import { useTetrisStatus } from '../hooks/useTetrisStatus';
import { isColliding } from '../utils/isColliding';
import playSound from '../utils/playSound';
import useInterval from '../hooks/useInterval';
import { addUserScore } from '../firebase';
import getCellBGColor from '../utils/getCellBGColor';

const TetrisGame = () => {
	const gameArea = useRef<HTMLDivElement>(null);
	const auth = useAuth();

	const [dropTime, setDroptime] = useState<null | number>(null);
	const [gameOver, setGameOver] = useState(true);

	const { player, nextShape, updatePlayerPos, resetPlayer, playerRotate } =
		useTetrisPlayer();
	const { board, nextBoard, setBoard, rowsCleared } = useTetrisBoard(
		player,
		nextShape,
		resetPlayer
	);
	const { score, setScore, rows, setRows, level, setLevel } =
		useTetrisStatus(rowsCleared);

	const movePlayer = (dir: number) => {
		if (!isColliding(player, board, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0, collided: false });
		}
	};

	const keyUp = ({ keyCode }: { keyCode: number }): void => {
		if (!gameOver) {
			if (keyCode === 40) {
				setDroptime(1000 / level + 200);
			}
		}
	};

	const handleStartGame = (): void => {
		if (gameArea.current) gameArea.current.focus();

		setBoard(createBoard(HEIGHT, WIDTH));
		setDroptime(1000);
		resetPlayer();
		setScore(0);
		setLevel(1);
		setRows(0);
		setGameOver(false);
	};

	const move = ({
		keyCode,
		repeat,
	}: {
		keyCode: number;
		repeat: boolean;
	}): void => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				if (repeat) return;
				setDroptime(30);
			} else if (keyCode === 38) {
				playerRotate(board);
			}
		}
	};

	const drop = async (): Promise<void> => {
		if (rows > level * 10) {
			setLevel((prev) => prev + 1);

			setDroptime(1000 / level + 200);
		}

		if (!isColliding(player, board, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });
		} else {
			// Game over!
			if (player.pos.y < 1) {
				console.log('Game over!');
				setGameOver(true);
				setDroptime(null);
				playSound('wrong');
				gameArea.current?.classList.add('game-over');
				setTimeout(() => {
					gameArea.current?.classList.remove('game-over');
				}, 200);
				if (auth?.currentUser) {
					await addUserScore(auth?.currentUser, 'tetris', score);
				}
			}

			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	};

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={move}
			onKeyUp={keyUp}
			ref={gameArea}
			className="outline-none mx-auto mb-4"
		>
			<div className="flex lg:gap-10 items-center justify-center mt-4 lg:mt-8 flex-col lg:flex-row lg:items-start">
				<div className="flex flex-col items-center w-full">
					<h2 className="font-bold text-2xl text-orange-600 lg:mb-4 text-center">
						Tetris
					</h2>
					<div className="flex justify-center gap-8 p-4 lg:mb-8 items-center">
						<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
						{gameOver && (
							<Button intent="primary" onClick={() => handleStartGame()}>
								Start
							</Button>
						)}
					</div>
				</div>

				<div className="flex gap-4">
					<div className="border border-black  max-w-fit">
						{board.map((row, ri) => (
							<div key={ri} className="flex">
								{row.map((cell, ci) => (
									<div
										key={ci}
										className={`border border-black h-4 w-4 lg:h-8 lg:w-8 ${
											cell[2] === 'void'
												? `bg-gray-300`
												: cell[2] === 'red'
												? 'bg-red-600'
												: getCellBGColor(cell[2])
										}
							}`}
									></div>
								))}
							</div>
						))}
					</div>

					<div>
						<h1>Next Shape</h1>
						<div className="border border-black bg-gray-300 max-w-fit">
							{nextBoard.map((row, ri) => (
								<div key={ri} className="flex">
									<div key={ri} className="flex">
										{row.map((cell, ci) => (
											<div
												key={ci}
												className={`border border-black h-4 w-4 lg:h-8 lg:w-8 ${
													cell[2] === 'void'
														? `bg-gray-300`
														: cell[2] === 'red'
														? 'bg-red-600'
														: getCellBGColor(cell[2])
												}
							}`}
											></div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="lg:hidden flex flex-col justify-center items-center gap-1 my-4">
					<div
						className="h-10 w-10 bg-gray-500 text-white text-center rounded-md leading-9 font-bold shadow-sm shadow-black"
						onClick={() => move({ keyCode: 38, repeat: false })}
					>
						&#129045;
					</div>

					<div className="flex gap-1">
						<div
							className="h-10 w-10 bg-gray-500 text-white text-center rounded-md leading-9 font-bold shadow-sm shadow-black"
							onClick={() => move({ keyCode: 37, repeat: false })}
						>
							&#129044;
						</div>
						<div
							className="h-10 w-10 bg-gray-500 text-white text-center rounded-md leading-9 font-bold shadow-sm shadow-black"
							onPointerDown={() => move({ keyCode: 40, repeat: false })}
							onPointerUp={() => keyUp({ keyCode: 40 })}
						>
							&#129047;
						</div>
						<div
							className="h-10 w-10 bg-gray-500 text-white text-center rounded-md leading-9 font-bold shadow-sm shadow-black"
							onClick={() => move({ keyCode: 39, repeat: false })}
						>
							&#129046;
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TetrisGame;
