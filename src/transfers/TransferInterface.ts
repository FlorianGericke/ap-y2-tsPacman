import { field, ghostPosition, playerPostion } from './Types';

export interface TransferInterface {
	globals: {
		width: number;
		height: number;

		playerPostion: playerPostion;
		ghostPositions: ghostPosition[];
	};
	specifics: {
		gameField: field[];
	};
}
