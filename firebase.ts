import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.FIREBASE_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PUBLIC_PROJECT_ID,
	storageBucket: process.env.FIREBASE_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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
