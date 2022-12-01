export const koordinateToId = (x: number, y: number) => {
	return `${`0${x}`.slice(-2)}${`0${y}`.slice(-2)}`;
};

export const idToKoordinate = (id: string) => {
	if (id.length !== 4) {
		throw new Error(`id ${id} ist not Valid, id must be 4 characters`);
	}
	return [parseInt(id.slice(0, 2)), parseInt(id.slice(2, 4))];
};
