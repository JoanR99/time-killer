import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, defaultValues } from '../validation/registerSchema';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import RegisterImage from '../components/RegisterImage';
import Button from '../components/Button';
import { useRouter } from 'next/router';

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

	const router = useRouter();

	async function submitHandler({ name, email, password }: FormProps) {
		try {
			await signUpWithEmailAndPassword(name, email, password);
			router.push('/login');
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="flex gap-20 mt-28 items-center justify-center">
			<div className="w-1/3">
				<RegisterImage />
			</div>

			<div className="w-1/3">
				<h2 className=" text-2xl text-[#dc5f00] font-extrabold uppercase mb-4">
					Register
				</h2>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(submitHandler)}
						noValidate
						autoComplete="off"
					>
						<FormInput
							name="name"
							type="text"
							label="Name"
							required
							id="name"
						/>
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
						<FormInput
							name="passwordConfirm"
							type="password"
							label="Password Confirm"
							required
							id="passwordConfirm"
						/>

						<Button variant="primary">Register</Button>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}
