import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	variant: 'primary' | 'google';
	onClick?: (e: MouseEvent) => void;
};

function Button({ children, variant }: Props) {
	return (
		<button
			className={`rounded-xl font-normal w-full py-1 text-center text-white ${
				variant === 'primary' ? 'bg-[#dc5f00]' : ' bg-blue-600'
			}`}
		>
			{children}
		</button>
	);
}

export default Button;
