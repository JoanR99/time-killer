import MemoryGame from '../components/MemoryGame';
import RecordsPanel from '../components/RecordsPanel';

export default function Page() {
	return (
		<div className="flex items-center flex-col-reverse mb-4 lg:flex-row">
			<RecordsPanel gameName="memory" />
			<MemoryGame />
		</div>
	);
}
