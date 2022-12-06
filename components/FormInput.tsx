import { Controller, useFormContext } from 'react-hook-form';

type Props = {
	name: string;
	type: string;
	label: string;
	required: boolean;
	id: string;
	multiline?: boolean;
	rows?: number;
	value?: string;
	checked?: boolean;
};

function FormInput({ name, ...otherProps }: Props) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			defaultValue=""
			render={({ field }) => (
				<div className="mb-2">
					<label htmlFor={otherProps.id} className="hidden">
						{otherProps.label}
					</label>
					<input
						{...field}
						{...otherProps}
						placeholder={otherProps.label}
						className={`${!!errors[
							name
						]} rounded-xl border border-solid border-gray-400 bg-gray-200 p-1 indent-2 w-full mb-2`}
					/>
					<span
						className={`${
							!!errors[name]
								? ' border rounded-xl border-red-800 bg-red-200 text-red-800 py-1 px-2'
								: 'hidden'
						}`}
					>
						{errors[name] ? (errors[name]?.message as string) : ''}
					</span>
				</div>
			)}
		/>
	);
}

export default FormInput;
