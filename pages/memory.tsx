import { useEffect, useState } from 'react';
import Card from '../components/Card';

const data = [
	{ url: '1', active: false },
	{ url: '2', active: false },
	{ url: '3', active: false },
	{ url: '4', active: false },
	{ url: '5', active: false },
	{ url: '6', active: false },
	{ url: '7', active: false },
	{ url: '8', active: false },
	{ url: '9', active: false },
	{ url: '10', active: false },
	{ url: '11', active: false },
	{ url: '12', active: false },
	{ url: '13', active: false },
	{ url: '14', active: false },
	{ url: '15', active: false },
	{ url: '16', active: false },
];

export type CardContent = {
	url: string;
	id: number;
	active: boolean;
};

export default function Page() {
	const [cards, setCards] = useState<CardContent[]>([]);
	const [firstChoice, setFirstChoice] = useState<null | CardContent>(null);
	const [secondChoice, setSecondChoice] = useState<null | CardContent>(null);
	const [turns, setTurns] = useState(0);
	const [disabled, setDisabled] = useState(false);

	function shuffleCards() {
		const cardPairs = [...data, ...data]
			.sort(() => Math.random() - 0.5)
			.map((card, index) => ({ ...card, id: index }));

		setCards(cardPairs);
	}

	function handleChoice(card: CardContent) {
		firstChoice ? setSecondChoice(card) : setFirstChoice(card);
	}

	function resetTurn() {
		setFirstChoice(null);
		setSecondChoice(null);
		setTurns((prevTurns) => ++prevTurns);
		setDisabled(false);
	}

	useEffect(() => {
		shuffleCards();
	}, []);

	useEffect(() => {
		if (firstChoice && secondChoice) {
			setDisabled(true);
			if (firstChoice.url === secondChoice.url) {
				setCards((prevCards) =>
					prevCards.map((card) => {
						if (card.url === firstChoice.url || card.url === secondChoice.url) {
							return { ...card, active: true };
						} else {
							return card;
						}
					})
				);
				resetTurn();
			} else {
				setTimeout(resetTurn, 1000);
			}
		}
	}, [firstChoice, secondChoice]);

	return (
		<div>
			<h1>{turns}</h1>
			<div className="grid grid-cols-8 gap-8 p-8 w-3/4 mx-auto">
				{cards?.map((card) => (
					<Card
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						active={
							card.id === firstChoice?.id ||
							card.id === secondChoice?.id ||
							card.active
						}
						disabled={disabled || card.id === firstChoice?.id}
					/>
				))}
			</div>
		</div>
	);
}
