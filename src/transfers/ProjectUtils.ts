import { TransferInterface } from './TransferInterface';

export const koordinateToId = (x: number, y: number) => {
	return `${`0${x}`.slice(-2)}${`0${y}`.slice(-2)}`;
};

export const idToKoordinate = (id: string) => {
	if (id.length !== 4) {
		throw new Error(`id ${id} ist not Valid, id must be 4 characters`);
	}
	return [parseInt(id.slice(0, 2)), parseInt(id.slice(2, 4))];
};

export const getLocalStoredMaps = (): TransferInterface[] => {
	const localStorageValue: string | null = localStorage.getItem('savedMaps');

	return localStorageValue
		? (JSON.parse(localStorageValue) as TransferInterface[])
		: (JSON.parse('[]') as TransferInterface[]);
};

export const getIndexOfStoredMap = (
	insertNewSaveMap: TransferInterface,
): number => {
	return getLocalStoredMaps().findIndex((map) => {
		return map.globals.mapName === insertNewSaveMap.globals.mapName;
	});
};

export const getLocalStoredMap = (name: string): TransferInterface => {
	return getLocalStoredMaps().find((map) => map.globals.mapName === name);
};
