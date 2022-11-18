function removeClass(index: number, array: string[]) {
	setTimeout(
		() => document.getElementById(array[index])?.classList.remove('pressed'),
		200
	);
}

export default removeClass;
