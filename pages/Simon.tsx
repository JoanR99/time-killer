import Head from 'next/head';
import Button from '../components/Button';
import useSimonLogic from '../hooks/useSimonLogic';

export default function Page() {
	const {
		gamePattern,
		level,
		handleUserClick,
		nextSequence,
		disabled,
		blueRef,
		redRef,
		yellowRef,
		greenRef,
		boardRef,
	} = useSimonLogic();

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
						<Button intent="primary" onClick={() => nextSequence()}>
							Start
						</Button>
					)}
				</div>

				<div className="container">
					<div className="row">
						<button
							ref={greenRef}
							className="btn green"
							onClick={(e) => handleUserClick(e, 'green')}
							disabled={disabled}
						></button>

						<button
							ref={redRef}
							className="btn red"
							onClick={(e) => handleUserClick(e, 'red')}
							disabled={disabled}
						></button>
					</div>

					<div className="row">
						<button
							ref={yellowRef}
							className="btn yellow"
							onClick={(e) => handleUserClick(e, 'yellow')}
							disabled={disabled}
						></button>
						<button
							ref={blueRef}
							className="btn blue"
							onClick={(e) => handleUserClick(e, 'blue')}
							disabled={disabled}
						></button>
					</div>
				</div>
			</main>
		</div>
	);
}
