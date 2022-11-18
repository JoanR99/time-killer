function animatePress(target: HTMLButtonElement) {
	target?.classList.add('pressed');
	setTimeout(() => {
		target?.classList.remove('pressed');
	}, 100);
}

export default animatePress;
