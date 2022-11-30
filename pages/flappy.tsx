import useFlappyLogic from '../hooks/useFlappyLogic';

export default function Page() {
	const {
		score,
		birdPosition,
		obstacle,
		obstacleBottom,
		obstacleTop,
		setStart,
	} = useFlappyLogic();
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
