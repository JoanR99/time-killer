import { useCallback, useEffect, useRef, useState } from 'react';
import getDirectionFromKey from '../utils/getDirectionFromKey';
import useInterval from '../utils/useInterval';
import getRandomNumber from '../utils/getRandomNumber';
import playSound from '../utils/playSound';
import { useAuth } from '../context/AuthContext';
import { addRecord, addTopScore } from '../firebase';

export default function useFlappyLogic() {
	const [birdPosition, setBirdPosition] = useState(300);
	const [obstacle, setObstacle] = useState(275);
	const [obstacleTop, setObstacleTop] = useState(225);
	const [obstacleBottom, setObstacleBottom] = useState(225);
	const [start, setStart] = useState(false);
	const [score, setScore] = useState(0);
	const boardRef = useRef<HTMLDivElement>(null);
	const auth = useAuth();

	const handleKey = useCallback((e: KeyboardEvent) => {
		const newDirection = getDirectionFromKey(e.key);
		const isValidDirection = newDirection !== '';
		if (!isValidDirection) return;

		return setBirdPosition((prevPos) =>
			prevPos + 60 > 550 ? 550 : prevPos + 60
		);
	}, []);

	const handleGameOver = useCallback(async () => {
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
			playSound('wrong');
			boardRef.current?.classList.add('game-over');
			setTimeout(() => {
				boardRef.current?.classList.remove('game-over');
			}, 200);
			if (auth?.currentUser) {
				await addTopScore(auth?.currentUser, 'flappy', score);
				await addRecord(auth?.currentUser, 'flappy', score);
			}
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
		const topHeight = getRandomNumber(400);
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

	return {
		birdPosition,
		obstacle,
		obstacleTop,
		obstacleBottom,
		score,
		setStart,
		start,
		boardRef,
	};
}
