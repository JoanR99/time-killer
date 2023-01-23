import { useRef, useState } from 'react';

const buttonColors: ButtonColor[] = ['red', 'blue', 'green', 'yellow'];

export type ButtonColor = 'red' | 'blue' | 'green' | 'yellow';

const useSimomPattern = () => {
	const gamePattern = useRef<ButtonColor[]>([]);
	const [userClickedPattern, setUserClickedPattern] = useState<ButtonColor[]>(
		[]
	);

	const resetPatterns = () => {
		gamePattern.current = [];
		setUserClickedPattern([]);
	};

	const addRandomColorToPattern = () => {
		const randomNumber = Math.round(Math.random() * 3);
		const randomChosenColor = buttonColors[randomNumber];
		gamePattern.current = [...gamePattern.current, randomChosenColor];
	};

	return {
		gamePattern,
		userClickedPattern,
		setUserClickedPattern,
		resetPatterns,
		addRandomColorToPattern,
	};
};

export default useSimomPattern;
