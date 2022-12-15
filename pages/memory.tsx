import { useEffect, useState } from 'react';
import Card from '../components/Card';

const data = [
	{ name: 'react', active: false },
	{ name: 'vue', active: false },
	{ name: 'angular', active: false },
	{ name: 'svelte', active: false },
	{ name: 'next', active: false },
	{ name: 'nuxt', active: false },
	{ name: 'express', active: false },
	{ name: 'nest', active: false },
	{ name: 'mongo', active: false },
	{ name: 'postgres', active: false },
	{ name: 'tailwind', active: false },
	{ name: 'javascript', active: false },
	{ name: 'typescript', active: false },
	{ name: 'html', active: false },
	{ name: 'css', active: false },
	{ name: 'sass', active: false },
];

export type CardContent = {
	name: string;
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
			if (firstChoice.name === secondChoice.name) {
				setCards((prevCards) =>
					prevCards.map((card) => {
						if (
							card.name === firstChoice.name ||
							card.name === secondChoice.name
						) {
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
		<div className="flex gap-20">
			<div className="text-center w-1/6">
				<h2 className="font-bold text-2xl text-orange-600 mb-2 text-center">
					Memory
				</h2>
				<div className="gap-8 p-4">
					<h3 className=" font-bold text-xl text-center"> Turns: {turns}</h3>
				</div>
			</div>
			<div className="grid grid-cols-8 gap-8 p-8 mx-auto w-5/6">
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
