import { Color } from '../hooks/useTetrisPlayer';
import getRandomNumber from './getRandomNumber';

const colors: Color[] = ['orange', 'red', 'yellow', 'green', 'blue'];

export const getRandomColor = () => {
	return colors[getRandomNumber(colors.length - 1)];
};
