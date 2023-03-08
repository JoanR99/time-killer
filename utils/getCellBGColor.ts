import { Color } from '../hooks/useTetrisPlayer';

function getCellBGColor(color: Color) {
	switch (color) {
		case 'blue':
			return 'bg-blue-600';
		case 'green':
			return 'bg-green-600';
		case 'orange':
			return 'bg-orange-600';
		case 'red':
			return 'bg-red-600';
		case 'yellow':
			return 'bg-yellow-600';
		default:
			return 'bg-gray-300';
	}
}

export default getCellBGColor;
