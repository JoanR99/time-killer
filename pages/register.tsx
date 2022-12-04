import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, defaultValues } from '../validation/registerSchema';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

type FormProps = {
	name: string;
	email: string;
	password: string;
};

export default function Page() {
	const methods = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues,
	});

	const { signUpWithEmailAndPassword } = useAuth()!;

	async function submitHandler({ name, email, password }: FormProps) {
		try {
			await signUpWithEmailAndPassword(name, email, password);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(submitHandler)}
				noValidate
				autoComplete="off"
			>
				<FormInput name="name" type="text" label="Name" required id="name" />
				<FormInput name="email" type="text" label="Email" required id="email" />
				<FormInput
					name="password"
					type="password"
					label="Password"
					required
					id="password"
				/>
				<FormInput
					name="passwordConfirm"
					type="password"
					label="Password Confirm"
					required
					id="passwordConfirm"
				/>

				<button>Register</button>
			</form>
		</FormProvider>
	);
}
