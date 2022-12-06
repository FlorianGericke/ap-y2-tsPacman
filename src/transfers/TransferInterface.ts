import { field, pawn } from './Types';

export interface TransferInterface {
	globals: {
		mapName: string;
		width: number;
		height: number;

		pawnPositions?: pawn[];
	};
	specifics: {
		gameField: field[];
	};
}
