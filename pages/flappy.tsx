import FlappyGame from '../components/FlappyGame';
import RecordsPanel from '../components/RecordsPanel';

export default function Page() {
	return (
		<div className="flex items-center">
			<RecordsPanel gameName="flappy" />
			<FlappyGame />
		</div>
	);
}
