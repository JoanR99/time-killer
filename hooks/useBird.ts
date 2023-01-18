import { useState } from 'react';

const useBird = () => {
	const [birdPosition, setBirdPosition] = useState(300);

	const fall = () => {
		setBirdPosition((prevPos) => (prevPos - 2 < 50 ? 50 : prevPos - 4));
	};

	const fly = () => {
		setBirdPosition((prevPos) => (prevPos + 60 > 550 ? 550 : prevPos + 60));
	};

	const resetBird = () => {
		setBirdPosition(300);
	};

	return { birdPosition, fly, fall, resetBird };
};

export default useBird;
