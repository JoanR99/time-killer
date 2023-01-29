import MemoryGame from '../components/MemoryGame';
import RecordsPanel from '../components/RecordsPanel';

export default function Page() {
	return (
		<div className="flex items-center">
			<RecordsPanel gameName="memory" />
			<MemoryGame />
		</div>
	);
}
