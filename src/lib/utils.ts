export const uuid = (): string => {
	if (typeof window.crypto.randomUUID === 'function') {
		return window.crypto.randomUUID();
	}

	let newUuid = '';
	for (let n = 0; n < 36; n++) {
		if ([8, 13, 18, 23].includes(n)) {
			newUuid = newUuid + '-';
		} else {
			const randomNumber = Math.floor(36 * Math.random());
			newUuid = newUuid + randomNumber.toString(36);
		}
	}

	return newUuid;
};
