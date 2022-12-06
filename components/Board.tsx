import useSnakeLogic from '../hooks/useSnakeLogic';

const Board = () => {
	const { score, handleStart, board, snakeCells, foodCell, start, boardRef } =
		useSnakeLogic();

	return (
		<div ref={boardRef}>
			<h2 className="font-bold text-2xl text-[#DC5F00] mb-4 text-center">
				Snake Game
			</h2>
			<div className="flex justify-center gap-8 p-4 mb-8 items-center">
				<h3 className=" font-bold text-xl text-center"> Score: {score}</h3>
				{!start && (
					<button
						className="border bg-orange-600 px-2 py-1 rounded-xl font-medium"
						id="level-title"
						onClick={handleStart}
					>
						Start
					</button>
				)}
			</div>

			<div className="border border-black max-w-fit mt-8 m-auto">
				{board.map((row, ri) => (
					<div key={ri} className="flex">
						{row.map((cell, ci) => (
							<div
								key={ci}
								className={`border border-black h-9 w-9 ${
									snakeCells.has(cell)
										? 'bg-orange-600'
										: foodCell === cell
										? 'bg-green-600'
										: ''
								}`}
							></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Board;
