import { Playerable } from './Playerable';
import { PawnTypes } from '../../transfers/PawnTypes';
import { Direction } from '../Direction';
import { BordInformations } from '../field/BordInformations';

export abstract class Player implements Playerable {
	private _position = '';
	private _spawnField = '';

	protected constructor(private _pawnType: PawnTypes) {}

	setPostionAsId(postion: string) {
		this._position = postion;
	}

	getPawnType(): PawnTypes {
		return this._pawnType;
	}

	getPostionAsId(): string {
		return this._position;
	}

	setSpawnAsId(postion: string) {
		this._spawnField = postion;
	}

	getSpawnAsId(): string {
		return this._spawnField;
	}

	abstract getNextDirection(info: BordInformations): Direction;
}
