import { TransferInterface } from '../../transfers/TransferInterface';
import Field from './Field';
import { Fieldable } from './Fieldable';
import { koordinateToId } from '../../transfers/ProjectUtils';
import { field } from '../../transfers/Types';
import { FieldTypes } from './FieldTypes';

export default class GameField {
	private readonly _root: Field;

	constructor(private _uiInformation: TransferInterface) {
		if (!_uiInformation) {
			throw new Error(
				'GameField needs uiInformation object to be initialized',
			);
		}
		if (!_uiInformation.specifics.gameField) {
			throw new Error('GameField needs uiInformation with gameFields');
		}
		this._root = new Field(
			koordinateToId(0, 0),
			null,
			null,
			null,
			null,
			this._getFieldTypeFromUiInformation(0, 0),
		);

		for (let y = 0; y < (_uiInformation.globals.height ?? 0); y++) {
			let walker = this.getFieldFromCoordinates(0, y) as Field;
			for (let x = 1; x < (_uiInformation.globals.width ?? 0); x++) {
				walker.setRight(
					new Field(
						koordinateToId(x, y),
						y > 0 ? this.getFieldFromCoordinates(x, y - 1) : null,
						null,
						null,
						this.getFieldFromCoordinates(x - 1, y),
						this._getFieldTypeFromUiInformation(x, y),
					),
				);
				if (y !== 0) {
					(walker.getRight()?.getUpper() as Field)?.setLower(
						this.getFieldFromCoordinates(x, y) as Field,
					);
				}
				walker = walker.getRight() as Field;
			}
			walker = this.getFieldFromCoordinates(0, y) as Field;
			if (y === (_uiInformation.globals.height ?? 0) - 1) {
				continue;
			}
			walker.setLower(
				new Field(
					koordinateToId(0, y + 1),
					this.getFieldFromCoordinates(0, y),
					null,
					null,
					null,
					this._getFieldTypeFromUiInformation(0, y + 1),
				),
			);
		}
	}

	toArray() {
		const re = [];
		for (let y = 0; y < (this._uiInformation.globals.height ?? 0); y++) {
			for (let x = 0; x < (this._uiInformation.globals.width ?? 0); x++) {
				re.push(this.getFieldFromCoordinates(x, y));
			}
		}

		return re;
	}

	printInConsole(showNum: boolean) {
		for (let y = 0; y < (this._uiInformation.globals.height ?? 0); y++) {
			let line = '';
			for (let x = 0; x < (this._uiInformation.globals.width ?? 0); x++) {
				line += this.getFieldFromCoordinates(x, y)?.toLetter(showNum);
			}
			console.log(line);
		}
	}

	getFieldFromCoordinates(x: number, y: number): Fieldable | null {
		let walker = this._root;
		for (let i = 0; i < y; i++) {
			if (walker.getLower() !== null) {
				walker = walker.getLower() as Field;
			} else {
				return null;
			}
		}
		for (let i = 0; i < x; i++) {
			if (walker.getRight() !== null) {
				walker = walker.getRight() as Field;
			} else {
				return null;
			}
		}
		return walker;
	}

	private _getFieldTypeFromUiInformation(x: number, y: number): FieldTypes {
		if (!this._uiInformation.specifics.gameField) {
			throw new Error('GameField needs uiInformation with gameFields');
		}

		const fields: field[] = this._uiInformation.specifics.gameField;

		const field: field | null =
			fields.find((field: field) => {
				if (!field) {
					throw new Error('a field must be specified');
				}
				return field.id === koordinateToId(x, y);
			}) ?? null;

		if (!field) {
			throw new Error('a field must be specified');
		}

		return field.fieldType;
	}
}
