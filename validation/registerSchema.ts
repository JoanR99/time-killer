import { object, string } from 'zod';

export const registerSchema = object({
	name: string({
		required_error: 'Name is required',
	})
		.min(3, 'Name must be 2 or more characters')
		.max(20, 'Name must be 20 or fewer characters'),
	email: string({
		required_error: 'Email is required',
	})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	password: string({
		required_error: 'Password is required',
	})
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/,
			'Password must contain at least a lowercase letter, a uppercase letter, a number and a special character ( ! @ # $ % )'
		)
		.min(8, 'Password must be 8 or more characters')
		.max(20, 'Password must be 20 or fewer characters'),
	passwordConfirm: string({
		required_error: 'Password confirm is required',
	}).min(1, 'Password confirm is required'),
}).refine((data) => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'Passwords must match',
});

export const defaultValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
};
