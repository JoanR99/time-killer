import useSnakeLogic from '../hooks/useSnakeLogic';

const Board = () => {
	const { score, handleStart, board, snakeCells, foodCell } = useSnakeLogic();

	return (
		<div>
			<h1>{score}</h1>
			<button onClick={handleStart}>Start</button>

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
