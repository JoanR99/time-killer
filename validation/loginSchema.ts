import { object, string } from 'zod';

export const loginSchema = object({
	email: string({
		required_error: 'Email is required',
	})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	password: string({
		required_error: 'Password is required',
	}).min(1, 'Password is required'),
});

export const defaultValues = {
	email: '',
	password: '',
};
