import {
	useCallback,
	useEffect,
	useRef,
	useState,
	MouseEvent,
	RefObject,
} from 'react';
import animatePress from '../utils/animatePress';
import playSound from '../utils/playSound';

const buttonColors = ['red', 'blue', 'green', 'yellow'];

function animatePattern(element: RefObject<HTMLButtonElement>) {
	element.current?.classList.add('pressed');

	setTimeout(() => element.current?.classList.remove('pressed'), 200);
}

const useSimonLogic = () => {
	const gamePattern = useRef<string[]>([]);
	const [userClickedPattern, setUserClickedPattern] = useState<string[]>([]);
	const [level, setLevel] = useState(0);
	const [disabled, setDisabled] = useState(true);
	const redRef = useRef<HTMLButtonElement>(null);
	const greenRef = useRef<HTMLButtonElement>(null);
	const yellowRef = useRef<HTMLButtonElement>(null);
	const blueRef = useRef<HTMLButtonElement>(null);
	const boardRef = useRef<HTMLDivElement>(null);

	const displayPattern = useCallback((index: number, array: string[]) => {
		if (index >= array.length) return;

		if (array[index] === 'red') {
			animatePattern(redRef);
		} else if (array[index] === 'yellow') {
			animatePattern(yellowRef);
		} else if (array[index] === 'blue') {
			animatePattern(blueRef);
		} else if (array[index] === 'green') {
			animatePattern(greenRef);
		}

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
		boardRef.current?.classList.add('game-over');
		setTimeout(() => {
			boardRef.current?.classList.remove('game-over');
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

	return {
		gamePattern,
		level,
		handleUserClick,
		nextSequence,
		disabled,
		redRef,
		blueRef,
		greenRef,
		yellowRef,
		boardRef,
	};
};

export default useSimonLogic;
