import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	getDocs,
	query,
} from 'firebase/firestore';

export type ScoreInfo = {
	score: number;
	userName: string;
	user: string;
};

export type GameName = 'flappy' | 'memory' | 'tetris' | 'snake' | 'simon';

type UserRecords = Record<GameName, number>;

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const isUserPersonalRecord = (
	gameName: GameName,
	score: number,
	userScores: UserRecords | null
) => {
	if (!userScores || !userScores[gameName]) return true;

	const isUserMemoryRecord =
		gameName === 'memory' && score < userScores[gameName];
	const isUserRecord = gameName !== 'memory' && userScores[gameName] < score;

	return isUserMemoryRecord || isUserRecord;
};

const isGameTopRecord = (
	gameName: GameName,
	score: number,
	gameRecords: ScoreInfo[]
) => {
	const isMemoryRecord =
		gameName === 'memory' && gameRecords[gameRecords.length - 1].score > score;
	const isGameRecord =
		gameName !== 'memory' && gameRecords[gameRecords.length - 1].score < score;

	return gameRecords.length < 10 || isMemoryRecord || isGameRecord;
};

export const addUserTopScore = async (
	userId: string,
	gameName: GameName,
	score: number
) => {
	const userDocRef = doc(db, 'users', userId);
	const userSnapshot = await getDoc(userDocRef);
	const user = userSnapshot.data();

	if (!user) return;

	if (isUserPersonalRecord(gameName, score, user.scores)) {
		const data = {
			scores: {
				...user.scores,
				[gameName]: score,
			},
		};

		await setDoc(userDocRef, data, { merge: true });
	}
};

export const addGameTopScore = async (
	user: User,
	gameName: GameName,
	score: number
) => {
	const newScore: ScoreInfo = {
		score,
		user: `/users/${user.uid}`,
		userName: user.displayName!,
	};
	const recordDocRef = doc(db, 'records', gameName);
	const gameRecordsSnapshot = await getDoc(recordDocRef);

	const gameRecords = gameRecordsSnapshot.data();

	if (!gameRecords) {
		await setDoc(recordDocRef, { top: [newScore] });
		return;
	}

	if (isGameTopRecord(gameName, score, gameRecords.top)) {
		const sortFunction =
			gameName === 'memory'
				? (a: ScoreInfo, b: ScoreInfo) => a.score - b.score
				: (a: ScoreInfo, b: ScoreInfo) => b.score - a.score;

		const newRecordList = [...gameRecords.top, newScore].sort(sortFunction);

		const top =
			newRecordList.length > 10
				? newRecordList.filter((v, i) => i <= 9)
				: newRecordList;

		await setDoc(recordDocRef, {
			top,
		});
	}
};

export const addUserScore = async (
	user: User,
	gameName: GameName,
	score: number
) => {
	await addUserTopScore(user.uid, gameName, score);
	await addGameTopScore(user, gameName, score);
};

export const getUserTopScores = async (userId: string) => {
	const userDocRef = doc(db, 'users', userId);
	const userSnapshot = await getDoc(userDocRef);
	const user = userSnapshot.data();

	if (!user?.scores) return null;

	return user?.scores as UserRecords;
};

export const getUserGameTopScore = async (
	userId: string,
	gameName: GameName
) => {
	const userScores = await getUserTopScores(userId);

	if (!userScores) return null;

	return userScores[gameName];
};

export const getGamesTopScores = async () => {
	const recordsCollectionRef = collection(db, 'records');
	const queryRecordsSnapshot = await getDocs(recordsCollectionRef);
	return queryRecordsSnapshot.docs.map((game) => {
		const key = game.id;
		const records = game.data();

		return {
			[key]: records,
		};
	});
};

export const getGameTopScores = async (gameName: GameName) => {
	const recordDocRef = doc(db, 'records', gameName);
	const gameRecordsSnapshot = await getDoc(recordDocRef);

	const gameRecords = gameRecordsSnapshot.data();

	if (!gameRecords?.top) return null;

	return gameRecords.top as ScoreInfo[];
};

export const googleProvider = new GoogleAuthProvider();

export const createUserInDatabase = async (user: User) => {
	const userDocRef = doc(db, 'users', user.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = user;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt });
		} catch (e) {
			console.log(e);
		}
	}

	return userDocRef;
};
