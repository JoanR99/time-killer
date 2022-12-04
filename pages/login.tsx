import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, defaultValues } from '../validation/loginSchema';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

type FormProps = {
	email: string;
	password: string;
};

export default function Page() {
	const methods = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues,
	});

	const { logInWithEmailAndPassword, logInWithPopup } = useAuth()!;

	async function submitHandler({ email, password }: FormProps) {
		try {
			const x = await logInWithEmailAndPassword(email, password);
			console.log(x);
		} catch (e) {
			console.log(e);
		}
	}

	async function handleClick() {
		const l = await logInWithPopup();
		console.log(l);
	}

	return (
		<div>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<FormInput
						name="email"
						type="text"
						label="Email"
						required
						id="email"
					/>
					<FormInput
						name="password"
						type="password"
						label="Password"
						required
						id="password"
					/>

					<button>Login</button>
				</form>
			</FormProvider>
			<button onClick={handleClick}>Login with Google</button>
		</div>
	);
}
