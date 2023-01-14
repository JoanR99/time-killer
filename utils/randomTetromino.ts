import { TETROMINOS } from './tetrominoes';

export const randomTetromino = () => {
	const tetrominos = [
		'I',
		'J',
		'L',
		'O',
		'S',
		'T',
		'Z',
	] as (keyof typeof TETROMINOS)[];
	const randTetromino =
		tetrominos[Math.floor(Math.random() * tetrominos.length)];
	return TETROMINOS[randTetromino];
};
