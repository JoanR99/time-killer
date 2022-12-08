import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, defaultValues } from '../validation/loginSchema';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import LoginImage from '../components/LoginImage';
import { useRouter } from 'next/router';
import Button from '../components/Button/Button';

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

	const router = useRouter();

	async function submitHandler({ email, password }: FormProps) {
		try {
			await logInWithEmailAndPassword(email, password);
			router.push('/');
		} catch (e) {
			console.log(e);
		}
	}

	async function handleClick() {
		await logInWithPopup();
		router.push('/');
	}

	return (
		<div className="flex gap-20 mt-28 items-center justify-center">
			<div className="w-1/3">
				<LoginImage />
			</div>

			<div className="w-1/3">
				<h2 className=" text-2xl text-orange-600 font-extrabold uppercase mb-4">
					Login
				</h2>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(submitHandler)}
						noValidate
						autoComplete="off"
						className="mb-2"
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

						<Button intent="primary" fullWidth>
							Login
						</Button>
					</form>
					<Button intent="google" fullWidth onClick={handleClick}>
						Login with Google
					</Button>
				</FormProvider>
			</div>
		</div>
	);
}
