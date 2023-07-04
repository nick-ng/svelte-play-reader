export const playLine = (
	phrase: string,
	voice: ReturnType<typeof speechSynthesis.getVoices>[number] | null,
	volume: number,
	rate: number
): SpeechSynthesisUtterance => {
	const utterance = new SpeechSynthesisUtterance(phrase);

	if (voice) {
		utterance.voice = voice;
	}

	utterance.rate = rate;
	utterance.volume = volume;

	speechSynthesis.speak(utterance);

	return utterance;
};
