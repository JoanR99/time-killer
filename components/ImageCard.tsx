import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
	src: string;
	alt: string;
	children: ReactNode;
};

const ImageCard = ({ src, alt, children }: Props) => (
	<article className="border-[#001524] rounded-xl border p-4 bg-[#E0DFD5] text-center">
		<div>
			<Image
				src={src}
				alt={alt}
				width={100}
				height={100}
				className="rounded-xl"
			/>
		</div>
		<div className="mt-2">{children}</div>
	</article>
);

export default ImageCard;
