import RecordsPanel from '../components/RecordsPanel';
import SnakeGame from '../components/SnakeComponent';

export default function Page() {
	return (
		<div className="flex items-center">
			<RecordsPanel gameName="snake" />
			<SnakeGame />
		</div>
	);
}
