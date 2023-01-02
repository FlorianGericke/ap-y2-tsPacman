import { Move } from '../Move/Move';

export interface iGameField {
	printInConsole: (showNum: boolean) => void;
	registerMove: (move: Move) => void;
	makeMoves: () => void;
}
