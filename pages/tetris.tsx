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
		start,
		boardRef,
	} = useTetrisLogic();

	return (
		<div ref={boardRef}>
			<div className="flex gap-10 items-start justify-center mt-8">
				<div>
					<h2 className="font-bold text-2xl text-[#DC5F00] mb-4 text-center">
						Tetris
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
