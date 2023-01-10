import { useEffect, useState } from 'react';
import Card from '../components/Card';
import useMemory from '../hooks/useMemory';

export default function Page() {
	const { turns, cards, handleChoice, firstChoice, secondChoice, disabled } =
		useMemory();

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
