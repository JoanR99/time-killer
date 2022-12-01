import { CardContent } from '../pages/memory';

type Props = {
	card: CardContent;
	active: boolean;
	handleChoice: (card: CardContent) => void;
	disabled: boolean;
};

export default function Card({ card, handleChoice, active, disabled }: Props) {
	function handleClick() {
		if (!disabled) handleChoice(card);
	}

	return (
		<div className={`card h-40 w-full}`}>
			<div
				className={`side h-40 front bg-orange-600 ${
					active ? 'front--active' : ''
				}`}
			>
				{card.url}
			</div>
			<div
				className={`side h-40 back  ${active ? 'back--active' : ''}`}
				onClick={handleClick}
			>
				back
			</div>
		</div>
	);
}
