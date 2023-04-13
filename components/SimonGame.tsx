import Head from 'next/head';
import { useRef, useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { addUserScore } from '../firebase';
import playSound from '../utils/playSound';

const buttonColors: ButtonColor[] = ['red', 'blue', 'green', 'yellow'];

export type ButtonColor = 'red' | 'blue' | 'green' | 'yellow';

type IsPressed = Record<ButtonColor, boolean>;

const SimonGame = () => {
	const [level, setLevel] = useState(0);
	const [disabled, setDisabled] = useState(true);
	const [isGameOver, setIsGameOver] = useState(false);
	const auth = useAuth();

	const [isPressed, setIsPressed] = useState<IsPressed>({
		red: false,
		yellow: false,
		blue: false,
		green: false,
	});

	const gamePattern = useRef<ButtonColor[]>([]);
	const userClickedPattern = useRef<ButtonColor[]>([]);

	const resetPatterns = () => {
		gamePattern.current = [];
		userClickedPattern.current = [];
	};

	const addRandomColorToPattern = () => {
		const randomNumber = Math.round(Math.random() * 3);
		const randomChosenColor = buttonColors[randomNumber];
		gamePattern.current = [...gamePattern.current, randomChosenColor];
	};

	const animatePress = (color: ButtonColor) => {
		setIsPressed((prev) => ({
			...prev,
			[color]: true,
		}));
		playSound(color);
		setTimeout(
			() =>
				setIsPressed((prev) => ({
					...prev,
					[color]: false,
				})),
			300
		);
	};

	const displayPattern = (index: number, colorPattern: ButtonColor[]) => {
		if (index >= colorPattern.length) return;

		animatePress(colorPattern[index]);

		playSound(colorPattern[index]);

		index++;

		setTimeout(() => displayPattern(index, colorPattern), 500);
	};

	const handleStart = () => {
		setDisabled(false);
		nextSequence();
	};

	const nextSequence = () => {
		addRandomColorToPattern();

		setTimeout(function () {
			displayPattern(0, gamePattern.current);
		}, 500);

		setLevel((prevLevel) => prevLevel + 1);
	};

	const handleClick = (color: ButtonColor) => {
		userClickedPattern.current = [...userClickedPattern.current, color];
		playSound(color);
		animatePress(color);

		const currentLevel = userClickedPattern.current.length - 1;

		if (
			userClickedPattern.current[currentLevel] ===
			gamePattern.current[currentLevel]
		) {
			if (userClickedPattern.current.length === gamePattern.current.length) {
				userClickedPattern.current = [];
				setTimeout(nextSequence, 1000);
			}
		} else {
			wrongAnswer();
			startOver();
		}
	};

	function startOver() {
		setLevel(0);
		resetPatterns();
		setDisabled(true);
	}

	async function wrongAnswer() {
		playSound('wrong');
		setIsGameOver(true);
		setTimeout(() => {
			setIsGameOver(false);
		}, 200);
		if (auth?.currentUser) {
			await addUserScore(auth?.currentUser, 'simon', level);
		}
	}

	return (
		<div className={`bg-gray-200 w-full ${isGameOver ? 'game-over' : ''}`}>
			<Head>
				<title>Simon Game</title>
				<meta name="description" content="Simon Game" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="p-8">
				<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
					Simon Game
				</h2>
				<div className="flex justify-center gap-8 p-4 mb-8 items-center">
					<h3 className=" font-bold text-xl text-center"> Level: {level}</h3>
					{gamePattern.current.length === 0 && (
						<Button intent="primary" onClick={handleStart}>
							Start
						</Button>
					)}
				</div>

				<div className="container">
					<div className="flex">
						<button
							className={`md:m-2 m-1 inline-block h-32 w-32 md:h-52 md:w-52 border-[10px] border-darkBlue green ${
								isPressed.green ? 'pressed' : ''
							}`}
							onClick={(e) => handleClick('green')}
							disabled={disabled}
						></button>

						<button
							className={`md:m-2 m-1 inline-block h-32 w-32 md:h-52 md:w-52 border-[10px] border-darkBlue red ${
								isPressed.red ? 'pressed' : ''
							}`}
							onClick={(e) => handleClick('red')}
							disabled={disabled}
						></button>
					</div>

					<div className="flex">
						<button
							className={`md:m-2 m-1 inline-block h-32 w-32 md:h-52 md:w-52 border-[10px] border-darkBlue yellow ${
								isPressed.yellow ? 'pressed' : ''
							}`}
							onClick={(e) => handleClick('yellow')}
							disabled={disabled}
						></button>
						<button
							className={`md:m-2 m-1 inline-block h-32 w-32 md:h-52 md:w-52 border-[10px] border-darkBlue blue ${
								isPressed.blue ? 'pressed' : ''
							}`}
							onClick={(e) => handleClick('blue')}
							disabled={disabled}
						></button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SimonGame;
