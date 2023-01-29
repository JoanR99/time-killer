import RecordsPanel from '../components/RecordsPanel';
import TetrisGame from '../components/TetrisGame';

function Page() {
	return (
		<div className="flex items-center">
			<RecordsPanel gameName="tetris" />
			<TetrisGame />
		</div>
	);
}

export default Page;
