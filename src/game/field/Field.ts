import { Fieldable } from './Fieldable';
import { FieldTypes } from './FieldTypes';
import { Playerable } from '../player/playerable';

export default class Field implements Fieldable {
	private _upper: Fieldable | null;

	private _right: Fieldable | null;

	private _lower: Fieldable | null;

	private _left: Fieldable | null;

	private _fieldType: FieldTypes;

	private _id: string;

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

	equals(): boolean {
		return false;
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
		throw new Error('Not implemented yet');
		// Return null;
	}

	isOccupiedFrom(): Playerable {
		throw new Error('Not implemented yet');
		// Return undefined;
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
		if (this._fieldType === FieldTypes.PATH) {
			return ` ${showNum ? this.getNumPath() : ' - '} `;
		} else if (this._fieldType === FieldTypes.WALL) {
			return ` ${showNum ? this.getNumPath() : ' # '} `;
		} else if (this._fieldType === FieldTypes.SPAWN) {
			return ` ${showNum ? this.getNumPath() : ' * '} `;
		} else {
			throw new Error('No FieldType defined');
		}
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
}
