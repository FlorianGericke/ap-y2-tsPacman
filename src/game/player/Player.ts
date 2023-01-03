import { Playerable } from './Playerable';
import { PawnTypes } from '../../transfers/PawnTypes';
import { Direction } from '../Direction';
import { Fieldable } from '../field/Fieldable';
import { PlayerException } from './PlayerException';

export abstract class Player implements Playerable {
	private _position = '';
	private _spawnField: Fieldable | null = null;

	protected constructor(private _pawnType: PawnTypes) {}

	setPostionAsId(postion: string) {
		this._position = postion;
	}

	getPawnType(): PawnTypes {
		return this._pawnType;
	}

	getSpawnField(): Fieldable {
		if (this._spawnField == null) {
			throw new PlayerException('No spawn field specified');
		}
		return this._spawnField;
	}

	abstract getNextDirection(): () => Direction;

	getPostionAsId(): string {
		return this._position;
	}

	setSpawnField(spawn: Fieldable) {
		this._spawnField = spawn;
	}
}
