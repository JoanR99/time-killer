import { useCallback, useEffect, useState } from 'react';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import useInterval from '../utils/useInterval';

const getRandom = (max: number) => Math.floor(Math.random() * max);

export default function Page() {
	const [birdPosition, setBirdPosition] = useState(300);
	const [obstacle, setObstacle] = useState(275);
	const [obstacleTop, setObstacleTop] = useState(225);
	const [obstacleBottom, setObstacleBottom] = useState(225);
	const [start, setStart] = useState(false);
	const [score, setScore] = useState(0);

	const handleKey = useCallback((e: KeyboardEvent) => {
		const newDirection = getDirectionFromKey(e.key);
		const isValidDirection = newDirection !== '';
		if (!isValidDirection) return;

		return setBirdPosition((prevPos) =>
			prevPos + 60 > 550 ? 550 : prevPos + 60
		);
	}, []);

	const handleGameOver = useCallback(() => {
		if (
			(obstacle <= -125 &&
				obstacle >= -225 &&
				birdPosition > 550 - obstacleTop) ||
			(obstacle <= -125 && obstacle >= -225 && birdPosition < obstacleBottom)
		) {
			setBirdPosition(300);
			setObstacle(275);
			setObstacleTop(225);
			setObstacleBottom(225);
			setScore(0);
			setStart((prevStart) => !prevStart);
		}
	}, [birdPosition, obstacle, obstacleBottom, obstacleTop]);

	useEffect(() => {
		if (start) {
			window.addEventListener('keydown', handleKey);
		} else {
			window.removeEventListener('keydown', handleKey);
		}
	}, [start, handleKey]);

	useEffect(() => {
		handleGameOver();
		if (obstacle < -274) {
			getNewObs();
			setObstacle(275);
		}
	}, [obstacle, handleGameOver]);

	function gravity() {
		setBirdPosition((prevPos) => (prevPos - 2 < 50 ? 50 : prevPos - 4));
	}

	function move() {
		setObstacle((prevObs) => prevObs - 4);
	}

	function getNewObs() {
		setScore((prevScore) => ++prevScore);
		const topHeight = getRandom(400);
		const bottomHeight = 600 - topHeight - 150;
		setObstacleTop(topHeight);
		setObstacleBottom(bottomHeight);
	}

	useInterval(
		() => {
			gravity();
			move();
		},
		start ? 25 : null
	);

	return (
		<div className="flex justify-center gap-20">
			<div>
				<h1>Flappy Bird</h1>
				<p>score: {score}</p>
			</div>

			<div className="flex justify-center w-[600px] h-[750px]">
				<div
					className="relative h-[750px] w-[50px] bg-white z-20"
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
					className="relative h-[750px] w-[50px] bg-white z-20"
					style={{ left: '225px' }}
				></div>
			</div>
		</div>
	);
}
