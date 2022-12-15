import { CardContent } from '../pages/memory';
import { FaReact, FaAngular, FaBrain } from 'react-icons/fa';
import { RiVuejsFill } from 'react-icons/ri';
import {
	SiSvelte,
	SiNextdotjs,
	SiNuxtdotjs,
	SiExpress,
	SiNestjs,
	SiMongodb,
	SiPostgresql,
	SiJavascript,
	SiTypescript,
	SiHtml5,
	SiCss3,
	SiTailwindcss,
	SiSass,
} from 'react-icons/si';

type Props = {
	card: CardContent;
	active: boolean;
	handleChoice: (card: CardContent) => void;
	disabled: boolean;
};

function getIcon(name: string) {
	if (name === 'react') {
		return <FaReact className="w-12 h-12 text-blue-500" />;
	} else if (name === 'vue') {
		return <RiVuejsFill className="w-12 h-12 text-green-700" />;
	} else if (name === 'angular') {
		return <FaAngular className="w-12 h-12 text-red-700" />;
	} else if (name === 'svelte') {
		return <SiSvelte className="w-12 h-12 text-orange-700" />;
	} else if (name === 'next') {
		return <SiNextdotjs className="w-12 h-12 text-black" />;
	} else if (name === 'nuxt') {
		return <SiNuxtdotjs className="w-12 h-12 text-green-500" />;
	} else if (name === 'express') {
		return <SiExpress className="w-12 h-12 text-green-700" />;
	} else if (name === 'nest') {
		return <SiNestjs className="w-12 h-12 text-red-700" />;
	} else if (name === 'mongo') {
		return <SiMongodb className="w-12 h-12 text-green-700" />;
	} else if (name === 'postgres') {
		return <SiPostgresql className="w-12 h-12 text-blue-700" />;
	} else if (name === 'javascript') {
		return <SiJavascript className="w-12 h-12 text-yellow-600" />;
	} else if (name === 'typescript') {
		return <SiTypescript className="w-12 h-12 text-blue-800" />;
	} else if (name === 'html') {
		return <SiHtml5 className="w-12 h-12 text-orange-700" />;
	} else if (name === 'css') {
		return <SiCss3 className="w-12 h-12 text-blue-700" />;
	} else if (name === 'sass') {
		return <SiSass className="w-12 h-12 text-pink-700" />;
	} else if (name === 'tailwind') {
		return <SiTailwindcss className="w-12 h-12 text-blue-500" />;
	}
}

export default function Card({ card, handleChoice, active, disabled }: Props) {
	function handleClick() {
		if (!disabled) handleChoice(card);
	}

	return (
		<div className={`card h-40 w-full}`}>
			<div
				className={`side h-40 front flex items-center justify-center ${
					active ? 'front--active' : ''
				}`}
			>
				{getIcon(card.name)}
			</div>
			<div
				className={`side h-40 back flex items-center justify-center  ${
					active ? 'back--active' : ''
				}`}
				onClick={handleClick}
			>
				<FaBrain className="w-12 h-12 text-pink-300" />
			</div>
		</div>
	);
}
