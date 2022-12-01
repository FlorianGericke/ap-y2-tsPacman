import { field, ghostPosition, playerPostion } from './Types';

export interface TransferInterface {
	globals: {
		width: number;
		height: number;

		playerPostion: playerPostion | null;
		ghostPositions: ghostPosition[] | null;
	};
	specifics: {
		gameField: field[];
	};
}
