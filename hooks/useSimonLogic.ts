import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import animatePress from '../utils/animatePress';
import playSound from '../utils/playSound';
import removeClass from '../utils/removeClass';

const buttonColors = ['red', 'blue', 'green', 'yellow'];

const useSimonLogic = () => {
	const gamePattern = useRef<string[]>([]);
	const [userClickedPattern, setUserClickedPattern] = useState<string[]>([]);
	const [level, setLevel] = useState(0);
	const [disabled, setDisabled] = useState(true);

	const displayPattern = useCallback((index: number, array: string[]) => {
		if (index >= array.length) return;

		document.getElementById(array[index])?.classList.add('pressed');

		removeClass(index, array);

		playSound(array[index]);

		index++;

		setTimeout(() => displayPattern(index, array), 500);
	}, []);

	const nextSequence = useCallback(() => {
		const randomNumber = Math.round(Math.random() * 3);
		const randomChosenColor = buttonColors[randomNumber];
		gamePattern.current = [...gamePattern.current, randomChosenColor];

		if (gamePattern.current.length === 1) setDisabled(false);

		setTimeout(function () {
			displayPattern(0, gamePattern.current);
		}, 500);

		setLevel((prevLevel) => prevLevel + 1);
	}, [displayPattern]);

	const handleUserClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>, color: string) => {
			e.currentTarget;
			setUserClickedPattern((prevPattern) => [...prevPattern, color]);
			playSound(color);
			animatePress(e.currentTarget);
		},
		[]
	);

	function startOver() {
		setLevel(0);
		gamePattern.current = [];
		setUserClickedPattern([]);
		setDisabled(true);
	}

	function wrongAnswer() {
		playSound('wrong');
		document.getElementById('simon')?.classList.add('game-over');
		setTimeout(() => {
			document.getElementById('simon')?.classList.remove('game-over');
		}, 200);
	}

	useEffect(() => {
		const checkAnswer = () => {
			const currentLevel = userClickedPattern.length - 1;

			if (
				userClickedPattern[currentLevel] === gamePattern.current[currentLevel]
			) {
				if (userClickedPattern.length === gamePattern.current.length) {
					setTimeout(nextSequence, 1000);
					setUserClickedPattern([]);
				}
			} else {
				wrongAnswer();
				startOver();
			}
		};

		if (userClickedPattern.length > 0) {
			checkAnswer();
		}
	}, [userClickedPattern, nextSequence]);

	return { gamePattern, level, handleUserClick, nextSequence, disabled };
};

export default useSimonLogic;
