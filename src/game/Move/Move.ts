import { field } from '../../transfers/Types';
import { iMove } from './iMove';
import { FieldTypes } from '../field/FieldTypes';
import { MoveError } from './MoveError';

export class Move implements iMove {
	private readonly _dest: field;
	private readonly _origin: field;
	constructor(origin: field, dest: field) {
		if (!origin) {
			throw new MoveError('Move must have a origin field');
		}
		if (!dest) {
			throw new MoveError('Move must have a destination field');
		}
		if (dest.fieldType !== FieldTypes.PATH) {
			throw new MoveError('dest.fieldType must be PATH ');
		}
		this._dest = dest;
		this._origin = origin;
	}

	getDestination(): field {
		return this._dest;
	}

	getOrigin(): field {
		return this._origin;
	}

	toString(): string {
		return `{ ${this.getOrigin} => ${this.getDestination()} `;
	}
}
