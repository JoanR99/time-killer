function playSound(name: string) {
	var audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

export default playSound;
