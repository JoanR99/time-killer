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
					<label htmlFor={otherProps.id}>{otherProps.label}</label>
					<input
						{...field}
						{...otherProps}
						placeholder={otherProps.label}
						className={`${!!errors[name]}`}
					/>
					<span className="">
						{errors[name] ? (errors[name]?.message as string) : ''}
					</span>
				</div>
			)}
		/>
	);
}

export default FormInput;
