import { useRef, useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import usePlayer from '../hooks/usePlayer';
import useTetrisBoard, {
	createBoard,
	HEIGHT,
	WIDTH,
} from '../hooks/useTetrisBoard';
import { useTetrisStatus } from '../hooks/useTetrisStatus';
import { isColliding } from '../utils/isColliding';
import playSound from '../utils/playSound';
import useInterval from '../utils/useInterval';
import { addRecord, addTopScore } from '../firebase';

function Page() {
	const gameArea = useRef<HTMLDivElement>(null);
	const auth = useAuth();

	const [dropTime, setDroptime] = useState<null | number>(null);
	const [gameOver, setGameOver] = useState(true);

	const { player, nextShape, updatePlayerPos, resetPlayer, playerRotate } =
		usePlayer();
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
					await addTopScore(auth?.currentUser, 'tetris', score);
					await addRecord(auth?.currentUser, 'tetris', score);
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
			className="outline-none"
		>
			<div className="flex gap-10 items-start justify-center mt-8">
				<div>
					<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
						Tetris
					</h2>
					<div className="flex justify-center gap-8 p-4 mb-8 items-center">
						<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
						{gameOver && (
							<Button intent="primary" onClick={() => handleStartGame()}>
								Start
							</Button>
						)}
					</div>
				</div>
				<div className="border border-black  max-w-fit">
					{board.map((row, ri) => (
						<div key={ri} className="flex">
							{row.map((cell, ci) => (
								<div
									key={ci}
									className={`border border-black h-8 w-8 ${
										cell[2] === 'void' ? `bg-gray-300` : `bg-${cell[2]}-600`
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
											className={`border border-black h-8 w-8 ${
												cell[2] === 'void' ? `bg-gray-300` : `bg-${cell[2]}-600`
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
		</div>
	);
}

export default Page;
