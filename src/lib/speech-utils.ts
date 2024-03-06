export const playLine = ({
	phrase,
	voice,
	volume,
	rate,
	pitch
}: {
	phrase: string;
	voice: ReturnType<typeof speechSynthesis.getVoices>[number] | null;
	volume: number;
	rate: number;
	pitch: number;
}): SpeechSynthesisUtterance => {
	const utterance = new SpeechSynthesisUtterance(phrase);

	if (voice) {
		utterance.voice = voice;
	}

	utterance.rate = rate;
	utterance.volume = volume;
	utterance.pitch = pitch;

	speechSynthesis.speak(utterance);

	return utterance;
};
