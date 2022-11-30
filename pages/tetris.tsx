import useTetrisLogic, { getShapeCoords } from '../hooks/useTetrisLogic';

function Page() {
	const {
		score,
		setStart,
		board,
		nextShapeBoard,
		currentShape,
		getColor,
		color,
		nextColor,
		nextShape,
	} = useTetrisLogic();

	return (
		<div>
			<div className="flex gap-10 items-start justify-center mt-8">
				<div>
					<button onClick={() => setStart(true)}>start</button>
					<h1>{score}</h1>
				</div>
				<div className="border border-black bg-gray-300 max-w-fit">
					{board.current.map((row, ri) => (
						<div key={ri} className="flex">
							{row.map((cell, ci) => (
								<div
									key={ci}
									className={`border border-black h-8 w-8 ${
										currentShape?.includes(cell)
											? `bg-${color}-600`
											: getColor(cell)
									}
							}`}
								></div>
							))}
						</div>
					))}
				</div>

				<div>
					<h1>Next Shape</h1>
					<div className="border border-black bg-gray-300 max-w-fit">
						{nextShapeBoard.current.map((row, ri) => (
							<div key={ri} className="flex">
								{row.map((cell, ci) => (
									<div
										key={ci}
										className={`border border-black h-8 w-8 ${
											getShapeCoords(
												nextShapeBoard.current,
												1,
												2,
												nextShape,
												0
											).includes(cell)
												? `bg-${nextColor}-600`
												: ''
										}
							}`}
									></div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
