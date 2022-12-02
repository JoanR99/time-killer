import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	User,
	createUserWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { auth, createUserInDatabase, googleProvider } from '../firebase';

type Props = {
	children: ReactNode;
};

type Auth = {
	currentUser: User | null;
	loading: boolean;
	logInWithPopup: () => Promise<DocumentReference<DocumentData>>;
	logInWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<UserCredential>;
	signUpWithEmailAndPassword: (
		displayName: string,
		email: string,
		password: string
	) => Promise<DocumentReference<DocumentData>>;
	logOut: () => Promise<void>;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: Props) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);

	async function logInWithPopup() {
		const { user } = await signInWithPopup(auth, googleProvider);
		const userDocRef = await createUserInDatabase(user);

		return userDocRef;
	}

	function logInWithEmailAndPassword(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		return signOut(auth);
	}

	async function signUpWithEmailAndPassword(
		displayName: string,
		email: string,
		password: string
	) {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const userDocRef = await createUserInDatabase({ ...user, displayName });

		return userDocRef;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		loading,
		logInWithEmailAndPassword,
		logInWithPopup,
		logOut,
		signUpWithEmailAndPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
