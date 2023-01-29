import { useRef, useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { addUserScore } from '../firebase';
import getRandomNumber from '../utils/getRandomNumber';
import playSound from '../utils/playSound';
import useInterval from '../utils/useInterval';

type Status = {
	playing: boolean;
	speed: null | number;
	score: number;
};

const FlappyGame = () => {
	const gameArea = useRef<HTMLDivElement>(null);
	const auth = useAuth();
	const [birdPosition, setBirdPosition] = useState(300);
	const [status, setStatus] = useState<Status>({
		playing: false,
		score: 0,
		speed: null,
	});
	const [obstacle, setObstacle] = useState({
		xPosition: 275,
		topPartHeight: 225,
		bottomPartHeight: 225,
	});

	const { playing, score, speed } = status;

	const getNewObs = () => {
		const topHeight = getRandomNumber(400);
		const bottomHeight = 600 - topHeight - 150;
		setObstacle({
			xPosition: 275,
			topPartHeight: topHeight,
			bottomPartHeight: bottomHeight,
		});
	};

	const keyUp = ({ keyCode }: { keyCode: number }): void => {
		if (playing) {
			if (keyCode === 38) {
				setBirdPosition((prevPos) => (prevPos + 60 > 550 ? 550 : prevPos + 60));
			}
		}
	};

	const collideZone = obstacle.xPosition <= -125 && obstacle.xPosition >= -225;

	const topCollide = birdPosition > 550 - obstacle.topPartHeight;

	const bottomCollide = birdPosition < obstacle.bottomPartHeight;

	const moveBirdAndObstacle = () => {
		if (collideZone && (topCollide || bottomCollide)) {
			handleGameOver();
		} else if (obstacle.xPosition < -272) {
			getNewObs();
			setStatus((prevStatus) => ({ ...prevStatus, score: score + 1 }));
		} else {
			setBirdPosition((prevPos) => (prevPos - 2 < 50 ? 50 : prevPos - 4));
			setObstacle((prevObs) => ({
				...prevObs,
				xPosition: prevObs.xPosition - 4,
			}));
		}
	};

	const handleStartGame = (): void => {
		if (gameArea.current) gameArea.current.focus();

		setStatus({
			playing: true,
			score: 0,
			speed: 25,
		});
		setBirdPosition(300);
	};

	const handleGameOver = async () => {
		setObstacle({
			xPosition: 275,
			topPartHeight: 225,
			bottomPartHeight: 225,
		});
		setBirdPosition(300);
		setStatus({ playing: false, score: 0, speed: null });
		playSound('wrong');
		gameArea.current?.classList.add('game-over');
		setTimeout(() => {
			gameArea.current?.classList.remove('game-over');
		}, 200);
		if (auth?.currentUser) {
			await addUserScore(auth?.currentUser, 'flappy', score);
		}
	};

	useInterval(moveBirdAndObstacle, speed);

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyUp={keyUp}
			ref={gameArea}
			className="flex justify-center gap-20 outline-none"
		>
			<div>
				<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
					Flappy Bird
				</h2>
				<div className="flex justify-center gap-8 p-4 mb-8 items-center">
					<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
					{!playing && (
						<Button intent="primary" onClick={handleStartGame}>
							Start
						</Button>
					)}
				</div>
			</div>

			<div className="flex justify-center w-[600px] h-[732px]">
				<div
					className="relative h-[720px] w-[50px] bg-[#e8e9eb] z-20"
					style={{ left: '-225px' }}
				></div>
				<div className=" absolute w-[500px] h-[600px] bg-blue-400">
					<div
						className={`absolute h-[50px] w-[50px] bg-yellow-600 rounded-full`}
						style={{ bottom: `${birdPosition}px`, left: '50px' }}
					></div>
				</div>
				<div className="absolute bottom-0 h-[200px] w-[500px] bg-orange-900"></div>

				<div
					className="relative h-[600px] w-[50px] flex flex-col justify-between z-10"
					style={{ left: `${obstacle.xPosition}px` }}
				>
					<div
						className={` w-[50px] bg-green-800`}
						style={{ height: `${obstacle.topPartHeight}px` }}
					></div>
					<div
						className={` w-[50px] bg-green-800`}
						style={{ height: `${obstacle.bottomPartHeight}px` }}
					></div>
				</div>
				<div
					className="relative h-[720px] w-[50px] bg-[#e8e9eb] z-20"
					style={{ left: '225px' }}
				></div>
			</div>
		</div>
	);
};

export default FlappyGame;
