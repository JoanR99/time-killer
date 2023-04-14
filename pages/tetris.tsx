import RecordsPanel from '../components/RecordsPanel';
import TetrisGame from '../components/TetrisGame';

function Page() {
	return (
		<div className="flex items-center flex-col-reverse lg:flex-row mb-4">
			<RecordsPanel gameName="tetris" />
			<TetrisGame />
		</div>
	);
}

export default Page;
