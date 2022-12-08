import { useParameter, PartialStoryFn } from '@storybook/addons';
import { ReactFramework } from '@storybook/react';
import { UserCredential } from 'firebase/auth';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { useState } from 'react';
import { AuthContext, Auth } from '../../context/AuthContext';

export default function AuthDecorator(Story: any, context: any) {
	const authState: Auth = {
		currentUser: null,
		loading: false,
		logInWithEmailAndPassword: () => ({} as Promise<UserCredential>),
		logInWithPopup: () => ({} as Promise<DocumentReference<DocumentData>>),
		logOut: () => ({} as Promise<void>),
		signUpWithEmailAndPassword: () =>
			({} as Promise<DocumentReference<DocumentData>>),
	};
	const initialState = useParameter('auth', authState)!;

	const [state, setState] = useState({ ...initialState });

	return (
		<AuthContext.Provider value={state}>
			<Story />
		</AuthContext.Provider>
	);
}
