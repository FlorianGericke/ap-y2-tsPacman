import { Playerable } from './Playerable';
import { PawnTypes } from '../../transfers/PawnTypes';
import { Direction } from 'tty';

export abstract class Player implements Playerable {
	private _position = '';

	protected constructor(private _pawnType: PawnTypes) {}

	setPostionAsId(postion: string) {
		this._position = postion;
	}
	getPawnType(): PawnTypes {
		return this._pawnType;
	}

	goBackToSpawn(): void {
		throw new Error('not implemented yet');
	}

	abstract getNextDirection(): () => Direction;

	getPostionAsId(): string {
		return this._position;
	}
}
