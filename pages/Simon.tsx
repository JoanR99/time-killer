import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { addRecord, addTopScore } from '../firebase';
import useSimomPattern, { ButtonColor } from '../hooks/useSimonPattern';
import playSound from '../utils/playSound';

type IsPressed = {
	red: boolean;
	yellow: boolean;
	blue: boolean;
	green: boolean;
};

type Color = keyof IsPressed;

export default function Page() {
	const [level, setLevel] = useState(0);
	const [disabled, setDisabled] = useState(true);
	const boardRef = useRef<HTMLDivElement>(null);
	const auth = useAuth();
	const {
		gamePattern,
		setUserClickedPattern,
		userClickedPattern,
		resetPatterns,
		addRandomColorToPattern,
	} = useSimomPattern();

	const [isPressed, setIsPressed] = useState<IsPressed>({
		red: false,
		yellow: false,
		blue: false,
		green: false,
	});

	const animatePress = (color: Color) => {
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

	const nextSequence = () => {
		addRandomColorToPattern();

		setTimeout(function () {
			displayPattern(0, gamePattern.current);
		}, 500);

		setLevel((prevLevel) => prevLevel + 1);
		setDisabled(false);
	};

	const handleClick = (color: ButtonColor) => {
		setUserClickedPattern((prevPattern: ButtonColor[]) => [
			...prevPattern,
			color,
		]);
		playSound(color);
		animatePress(color);
	};

	function startOver() {
		setLevel(0);
		resetPatterns();
		setDisabled(true);
	}

	async function wrongAnswer() {
		playSound('wrong');
		boardRef.current?.classList.add('game-over');
		setTimeout(() => {
			boardRef.current?.classList.remove('game-over');
		}, 200);
		if (auth?.currentUser) {
			await addTopScore(auth?.currentUser, 'simon', level);
			await addRecord(auth?.currentUser, 'simon', level);
		}
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
					setDisabled(false);
				}
			} else {
				wrongAnswer();
				startOver();
			}
		};
		if (userClickedPattern.length > 0) {
			checkAnswer();
		}
	}, [userClickedPattern, gamePattern]);

	return (
		<div ref={boardRef} className=" bg-gray-200">
			<Head>
				<title>Simon Game</title>
				<meta name="description" content="Simon Game" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="min-h-screen p-8">
				<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
					Simon Game
				</h2>
				<div className="flex justify-center gap-8 p-4 mb-8 items-center">
					<h3 className=" font-bold text-xl text-center"> Level: {level}</h3>
					{gamePattern.current.length === 0 && (
						<Button intent="primary" onClick={nextSequence}>
							Start
						</Button>
					)}
				</div>

				<div className="container">
					<div className="row">
						<button
							className={`btn green ${isPressed.green ? 'pressed' : ''}`}
							onClick={(e) => handleClick('green')}
							disabled={disabled}
						></button>

						<button
							className={`btn red ${isPressed.red ? 'pressed' : ''}`}
							onClick={(e) => handleClick('red')}
							disabled={disabled}
						></button>
					</div>

					<div className="row">
						<button
							className={`btn yellow ${isPressed.yellow ? 'pressed' : ''}`}
							onClick={(e) => handleClick('yellow')}
							disabled={disabled}
						></button>
						<button
							className={`btn blue ${isPressed.blue ? 'pressed' : ''}`}
							onClick={(e) => handleClick('blue')}
							disabled={disabled}
						></button>
					</div>
				</div>
			</main>
		</div>
	);
}
