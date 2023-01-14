import getRandomNumber from './getRandomNumber';

const colors = ['orange', 'red', 'yellow', 'green', 'blue'];

export const getRandomColor = () => {
	return colors[getRandomNumber(colors.length - 1)];
};
