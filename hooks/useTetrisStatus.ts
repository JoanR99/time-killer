import { useEffect, useState } from 'react';

export const ROWPOINTS = [40, 100, 300, 1200];

export const useTetrisStatus = (rowsCleared: number) => {
	const [score, setScore] = useState(0);
	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(1);

	useEffect(() => {
		if (rowsCleared > 0) {
			setScore((prev) => prev + ROWPOINTS[rowsCleared - 1] * level);
			setRows((prev) => prev + rowsCleared);
		}
	}, [rowsCleared, level]);

	return { score, setScore, rows, setRows, level, setLevel };
};
