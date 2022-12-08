import { field, pawn } from './Types';

export interface TransferInterface {
	globals: {
		mapName: string | null;
		width: number | null;
		height: number | null;

		pawnPositions: pawn[] | null;
	};
	specifics: {
		gameField: field[] | null;
	};
}
