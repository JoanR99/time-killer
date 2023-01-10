import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addRecord, addTopScore } from '../firebase';

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

export default function useMemory() {
	const [cards, setCards] = useState<CardContent[]>([]);
	const [firstChoice, setFirstChoice] = useState<null | CardContent>(null);
	const [secondChoice, setSecondChoice] = useState<null | CardContent>(null);
	const [turns, setTurns] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const auth = useAuth();

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

	async function endGame() {
		if (auth?.currentUser) {
			await addTopScore(auth?.currentUser, 'memory', turns);
			await addRecord(auth?.currentUser, 'memory', turns);
		}
		shuffleCards();
		setFirstChoice(null);
		setSecondChoice(null);
		setTurns(0);
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

	useEffect(() => {
		if (cards.every((card) => card.active)) {
			endGame();
		}
	}, [cards]);

	return {
		cards,
		firstChoice,
		secondChoice,
		turns,
		disabled,
		handleChoice,
	};
}
