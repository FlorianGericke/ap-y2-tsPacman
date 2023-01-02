import { Playerable } from './Playerable';
import { PawnTypes } from '../../transfers/PawnTypes';
import { Direction } from 'tty';

export class Player implements Playerable {
	constructor(private _pawnType: PawnTypes) {}

	getPawnType(): PawnTypes {
		return this._pawnType;
	}

	goBackToSpawn(): void {
		throw new Error('not implemented yet');
	}

	getNextDirection(): () => Direction {
		throw new Error('not implemented yet');
	}
}
