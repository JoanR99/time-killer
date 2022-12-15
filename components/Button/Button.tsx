import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
};

const buttonStyles = cva(
	'rounded-xl font-normal py-1 px-2 text-center text-white',
	{
		variants: {
			intent: {
				primary: 'bg-brand',
				google: 'bg-blue-600',
			},
			fullWidth: {
				true: 'w-full',
			},
		},
		defaultVariants: {
			intent: 'primary',
		},
	}
);

export interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

function Button({ children, intent, fullWidth, onClick }: Props) {
	return (
		<button className={buttonStyles({ intent, fullWidth })} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
