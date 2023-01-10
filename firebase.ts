import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
} from 'firebase/firestore';

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

export const addTopScore = async (
	user: User,
	gameName: string,
	score: number
) => {
	const userDocRef = doc(db, 'users', user.uid);
	const userSnapshot = await getDoc(userDocRef);
	const userScores = userSnapshot?.data()?.scores;

	if (
		!userScores ||
		!userScores[gameName] ||
		(gameName === 'memory' && score < userScores[gameName]) ||
		(gameName !== 'memory' && userScores[gameName] < score)
	) {
		const data = {
			scores: {
				...userScores,
				[gameName]: score,
			},
		};

		await setDoc(userDocRef, data, { merge: true });
	}
};

export const addRecord = async (
	user: User,
	gameName: string,
	score: number
) => {
	const newScore = {
		score,
		user: `/users/${user.uid}`,
		userName: user.displayName,
	};
	const recordDocRef = doc(db, 'records', gameName);
	const gameRecordsSnapshot = await getDoc(recordDocRef);

	const gameRecords = gameRecordsSnapshot.data()?.top;
	if (gameRecords) {
		console.log(gameRecords[gameRecords.length - 1]);
		if (
			gameRecords.length < 10 ||
			(gameName === 'memory' &&
				gameRecords[gameRecords.length - 1].score > score) ||
			(gameName !== 'memory' &&
				gameRecords[gameRecords.length - 1].score < score)
		) {
			const newRecordList =
				gameName === 'memory'
					? [...(gameRecords as []), newScore].sort((a, b) => a.score - b.score)
					: [...(gameRecords as []), newScore].sort(
							(a, b) => b.score - a.score
					  );

			if (newRecordList?.length > 10) {
				await setDoc(recordDocRef, {
					top: [...newRecordList.filter((v, i) => i <= 9)],
				});
			} else {
				await setDoc(recordDocRef, { top: [...newRecordList] });
			}
		}
	} else {
		await setDoc(recordDocRef, { top: [newScore] });
	}
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
