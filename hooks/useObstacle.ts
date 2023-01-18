import { useState } from 'react';
import getRandomNumber from '../utils/getRandomNumber';

const useObstacle = () => {
	const [obstacle, setObstacle] = useState(275);
	const [obstacleTop, setObstacleTop] = useState(225);
	const [obstacleBottom, setObstacleBottom] = useState(225);

	const updateObstaclePosition = () => {
		setObstacle((prevObs) => prevObs - 4);
	};

	const getNewObs = () => {
		const topHeight = getRandomNumber(400);
		const bottomHeight = 600 - topHeight - 150;
		setObstacleTop(topHeight);
		setObstacleBottom(bottomHeight);
		setObstacle(275);
	};

	const resetObstacle = () => {
		setObstacle(275);
		setObstacleTop(225);
		setObstacleBottom(225);
	};

	return {
		obstacle,
		obstacleTop,
		obstacleBottom,
		updateObstaclePosition,
		getNewObs,
		resetObstacle,
	};
};

export default useObstacle;
