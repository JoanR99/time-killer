import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { addRecord, addTopScore } from '../firebase';
import useBird from '../hooks/useBird';
import useObstacle from '../hooks/useObstacle';
import playSound from '../utils/playSound';
import useInterval from '../utils/useInterval';

export default function Page() {
	const [start, setStart] = useState(false);
	const [score, setScore] = useState(0);
	const gameArea = useRef<HTMLDivElement>(null);
	const [speedTime, setSpeedTime] = useState<null | number>(null);
	const { birdPosition, fly, fall, resetBird } = useBird();
	const {
		obstacle,
		obstacleBottom,
		obstacleTop,
		getNewObs,
		updateObstaclePosition,
		resetObstacle,
	} = useObstacle();
	const auth = useAuth();

	const keyUp = ({ keyCode }: { keyCode: number }): void => {
		if (start) {
			if (keyCode === 38) {
				fly();
			}
		}
	};

	const moveBirdAndObstacle = () => {
		fall();
		updateObstaclePosition();
	};

	const handleStartGame = (): void => {
		if (gameArea.current) gameArea.current.focus();

		setSpeedTime(25);
		resetBird();
		setScore(0);
		setStart(true);
	};

	const handleGameOver = async () => {
		resetObstacle();
		resetBird();
		setScore(0);
		setStart(false);
		setSpeedTime(null);
		playSound('wrong');
		gameArea.current?.classList.add('game-over');
		setTimeout(() => {
			gameArea.current?.classList.remove('game-over');
		}, 200);
		if (auth?.currentUser) {
			await addTopScore(auth?.currentUser, 'flappy', score);
			await addRecord(auth?.currentUser, 'flappy', score);
		}
	};

	useInterval(() => {
		moveBirdAndObstacle();
	}, speedTime);

	const collideZone = () => obstacle <= -125 && obstacle >= -225;

	const topCollide = () => birdPosition > 550 - obstacleTop;

	const bottomCollide = () => birdPosition < obstacleBottom;

	useEffect(() => {
		if (collideZone() && (topCollide() || bottomCollide())) {
			handleGameOver();
		}
		if (obstacle < -274) {
			getNewObs();
			setScore((prevScore) => ++prevScore);
		}
	}, [obstacle, handleGameOver, getNewObs]);

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyUp={keyUp}
			ref={gameArea}
			className="flex justify-center gap-20"
		>
			<div>
				<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
					Flappy Bird
				</h2>
				<div className="flex justify-center gap-8 p-4 mb-8 items-center">
					<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
					{!start && (
						<Button intent="primary" onClick={handleStartGame}>
							Start
						</Button>
					)}
				</div>
			</div>

			<div className="flex justify-center w-[600px] h-[750px]">
				<div
					className="relative h-[750px] w-[50px] bg-[#e8e9eb] z-20"
					style={{ left: '-225px' }}
				></div>
				<div className=" absolute w-[500px] h-[600px] bg-blue-400">
					<div
						className={`absolute h-[50px] w-[50px] bg-yellow-600 rounded-full`}
						style={{ bottom: `${birdPosition}px`, left: '50px' }}
						onClick={() => setStart(true)}
					></div>
				</div>
				<div className="absolute bottom-0 h-[200px] w-[500px] bg-orange-900"></div>

				<div
					className="relative h-[600px] w-[50px] flex flex-col justify-between z-10"
					style={{ left: `${obstacle}px` }}
				>
					<div
						className={` w-[50px] bg-green-800`}
						style={{ height: `${obstacleTop}px` }}
					></div>
					<div
						className={` w-[50px] bg-green-800`}
						style={{ height: `${obstacleBottom}px` }}
					></div>
				</div>
				<div
					className="relative h-[750px] w-[50px] bg-[#e8e9eb] z-20"
					style={{ left: '225px' }}
				></div>
			</div>
		</div>
	);
}
