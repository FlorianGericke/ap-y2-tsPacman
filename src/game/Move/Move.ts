import { field } from '../../transfers/Types';
import { iMove } from './iMove';
import { MoveError } from './MoveError';
import { Direction } from '../Direction';
import { Fieldable } from '../field/Fieldable';
import { FieldTypes } from '../field/FieldTypes';

export class Move implements iMove {
	private readonly _origin: Fieldable;
	private readonly _direction: Direction;
	private readonly _dest: Fieldable;
	constructor(actual: Fieldable, direction: Direction) {
		if (!actual) {
			throw new MoveError('Move must have a actual field');
		}
		if (!direction) {
			throw new MoveError('Move must have a direction');
		}

		this._origin = actual;
		this._direction = direction;
		this._dest = this.getDestination();
	}

	getActual(): Fieldable {
		return this._origin;
	}

	getDirection(): Direction {
		return this._direction;
	}

	getDestination(): Fieldable {
		let re: Fieldable | null = null;
		if (this.getDirection() === Direction.UP) {
			re = this.getActual().getUpper();
		}
		if (this.getDirection() === Direction.RIGHT) {
			re = this.getActual().getRight();
		}
		if (this.getDirection() === Direction.DOWN) {
			re = this.getActual().getLower();
		}
		if (this.getDirection() === Direction.LEFT) {
			re = this.getActual().getLeft();
		}

		if (!re) {
			throw new MoveError('no destination connection');
		}
		if (re.getFieldType() !== FieldTypes.PATH) {
			throw new MoveError('Destination must be a path');
		}
		return re;
	}
	toString(): string {
		return `{ ${this.getActual()} => ${this.getDestination()} `;
	}
	equals(other: iMove): boolean {
		return other.toString() === this.toString();
	}
}
