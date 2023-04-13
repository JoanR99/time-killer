import RecordsPanel from '../components/RecordsPanel';
import SnakeGame from '../components/SnakeComponent';

export default function Page() {
	return (
		<div className="flex items-center flex-col-reverse md:flex-row my-4 gap-4">
			<RecordsPanel gameName="snake" />
			<SnakeGame />
		</div>
	);
}
