import { Fieldable } from './Fieldable';
import { FieldTypes } from './FieldTypes';
import { Playerable } from '../player/Playerable';
import { PawnTypes } from '../../transfers/PawnTypes';

export default class Field implements Fieldable {
	private _upper: Fieldable | null;

	private _right: Fieldable | null;

	private _lower: Fieldable | null;

	private _left: Fieldable | null;

	private _fieldType: FieldTypes;

	private _occupiedFrom: Playerable | null = null;

	private readonly _id: string;

	constructor(
		id: string,
		upper: Fieldable | null,
		right: Fieldable | null,
		lower: Fieldable | null,
		left: Fieldable | null,
		fieldType: FieldTypes,
	) {
		this._id = id;
		this._fieldType = fieldType;
		this._upper = upper;
		this._right = right;
		this._lower = lower;
		this._left = left;
	}

	equals(other: Fieldable): boolean {
		return this.toString() === other.toString();
	}

	getFieldType(): FieldTypes {
		return this._fieldType;
	}

	getLeft(): Fieldable | null {
		return this._left;
	}

	getLower(): Fieldable | null {
		return this._lower;
	}

	setLower(lower: Fieldable) {
		this._lower = lower;
	}

	getRight(): Fieldable | null {
		return this._right;
	}

	setRight(right: Fieldable) {
		this._right = right;
	}

	getUpper(): Fieldable | null {
		return this._upper;
	}

	isOccupied(): boolean {
		return this._occupiedFrom !== null;
	}

	isOccupiedFrom(): Playerable | null {
		return this._occupiedFrom;
	}

	setOccupier(occupier: Playerable | null) {
		this._occupiedFrom = occupier;
	}

	toString(): string {
		return JSON.stringify({
			ID: this._id,
			UPPER: this._upper,
			RIGHT: this._right,
			LOWER: this._lower,
			LEFT: this._left,
			FIELDTYPE: this._fieldType,
		});
	}

	toLetter(showNum: boolean): string {
		if (this._occupiedFrom === null) {
			if (this._fieldType === FieldTypes.PATH) {
				return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' - '} `;
			} else if (this._fieldType === FieldTypes.WALL) {
				return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' # '} `;
			} else if (this._fieldType === FieldTypes.SPAWN) {
				return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' * '} `;
			} else {
				throw new Error('No FieldType defined');
			}
		}

		if (this._occupiedFrom.getPawnType() === PawnTypes.Yellow)
			return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' Y '} `;
		if (this._occupiedFrom.getPawnType() === PawnTypes.Cyan)
			return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' C '} `;
		if (this._occupiedFrom.getPawnType() === PawnTypes.Red)
			return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' R '} `;
		if (this._occupiedFrom.getPawnType() === PawnTypes.Pink)
			return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' P '} `;
		if (this._occupiedFrom.getPawnType() === PawnTypes.Orange)
			return ` ${showNum ? ' ' + this.getNumPath() + ' ' : ' O '} `;

		throw new Error('No Suitable Letter for this fieldType defined');
	}

	getNumPath(): number {
		let i = 0;

		if (this.getUpper()?.getFieldType() === FieldTypes.PATH) {
			i++;
		}

		if (this.getLeft()?.getFieldType() === FieldTypes.PATH) {
			i++;
		}

		if (this.getLower()?.getFieldType() === FieldTypes.PATH) {
			i++;
		}

		if (this.getRight()?.getFieldType() === FieldTypes.PATH) {
			i++;
		}

		return i;
	}

	getId(): string {
		return this._id;
	}
}
