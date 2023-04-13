import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
	GameName,
	getGameTopScores,
	getUserGameTopScore,
	ScoreInfo,
} from '../firebase';

type Props = {
	gameName: GameName;
};

const RecordsPanel = ({ gameName }: Props) => {
	const auth = useAuth();
	const [userRecord, setUserRecords] = useState(0);
	const [gameRecords, setGameRecords] = useState<ScoreInfo[]>([]);

	useEffect(() => {
		async function getRecords() {
			const gameR = await getGameTopScores(gameName);
			if (gameR) setGameRecords(gameR);

			if (!auth?.currentUser) return;
			const userR = await getUserGameTopScore(auth?.currentUser?.uid, gameName);

			if (userR) setUserRecords(userR);
		}

		getRecords();
	});

	return (
		<div className="p-4 bg-darkGray h-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 rounded-xl sm:ml-4 md:ml-8 text-white">
			<h3 className="font-bold text-2xl text-orange-600 mb-4 text-center">
				Records
			</h3>
			{auth?.currentUser && (
				<div className="text-center mb-4">
					<h4 className="font-bold text-lg text-orange-600 text-center mb-1">
						Your record
					</h4>
					<span className="font-bold">{userRecord}</span>
				</div>
			)}
			<div>
				<h4 className="font-bold text-lg text-orange-600 text-center mb-1">
					Top Scores
				</h4>
				{gameRecords.map((record, i) => (
					<div key={i}>
						<p>
							<span className="font-bold">{i + 1}- </span> {record.userName}:{' '}
							{record.score}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecordsPanel;
