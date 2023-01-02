import { Move } from '../Move/Move';
import { BordInformations } from './BordInformations';

export interface iGameField {
	printInConsole: (showNum: boolean) => void;
	registerMove: (move: Move) => void;
	makeMoves: () => void;
	getBordInformations: () => BordInformations;
}
