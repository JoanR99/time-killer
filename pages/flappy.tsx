import useFlappyLogic from '../hooks/useFlappyLogic';

export default function Page() {
	const {
		score,
		birdPosition,
		obstacle,
		obstacleBottom,
		obstacleTop,
		setStart,
		start,
		boardRef,
	} = useFlappyLogic();
	return (
		<div ref={boardRef} className="flex justify-center gap-20">
			<div>
				<h2 className="font-bold text-2xl text-orange-600 mb-4 text-center">
					Flappy Bird
				</h2>
				<div className="flex justify-center gap-8 p-4 mb-8 items-center">
					<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
					{!start && (
						<button
							className="border bg-orange-600 px-2 py-1 rounded-xl font-medium"
							id="level-title"
							onClick={() => setStart(true)}
						>
							Start
						</button>
					)}
				</div>
			</div>

			<div className="flex justify-center w-[600px] h-[750px]">
				<div
					className="relative h-[750px] w-[50px] bg-[#e8e9eb] z-20"
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
					className="relative h-[750px] w-[50px] bg-[#e8e9eb] z-20"
					style={{ left: '225px' }}
				></div>
			</div>
		</div>
	);
}
