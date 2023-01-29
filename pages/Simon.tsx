import RecordsPanel from '../components/RecordsPanel';
import SimonGame from '../components/SimonGame';

export default function Page() {
	return (
		<div className="flex items-center">
			<RecordsPanel gameName="simon" />

			<SimonGame />
		</div>
	);
}
