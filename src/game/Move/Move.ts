import { iMove } from './iMove';
import { MoveError } from './MoveError';
import { Direction } from '../Direction';
import { Fieldable } from '../field/Fieldable';

export class Move implements iMove {
	private readonly _origin: string;
	private readonly _direction: Direction;
	constructor(idOfActual: string, direction: Direction) {
		if (!idOfActual) {
			throw new MoveError('Move must have a actual field');
		}
		// check !direction does not work becouse !direction === Direction.UP = 0
		if (direction == null) {
			throw new MoveError('Move must have a direction');
		}

		this._origin = idOfActual;
		this._direction = direction;
	}

	getActual(): string {
		return this._origin;
	}

	getDirection(): Direction {
		return this._direction;
	}

	toString(): string {
		return `{ ${this.getActual()} => ${this.getDirection()} `;
	}
	equals(other: iMove): boolean {
		return (
			this.getActual() === other.getActual() &&
			this.getDirection() === other.getDirection()
		);
	}
}
