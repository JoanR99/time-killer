import RecordsPanel from '../components/RecordsPanel';
import SimonGame from '../components/SimonGame';

export default function Page() {
	return (
		<div className="flex items-center flex-col-reverse md:flex-row mb-4">
			<RecordsPanel gameName="simon" />

			<SimonGame />
		</div>
	);
}
