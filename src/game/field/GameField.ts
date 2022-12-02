import { TransferInterface } from '../../transfers/TransferInterface';
import Field from './Field';
import { FieldTypes } from './FieldTypes';
import { field } from '../../transfers/Types';
import { Fieldable } from './Fieldable';
import { idToKoordinate, koordinateToId } from '../../transfers/ProjectUtils';

export default class GameField {
	private _root: Field;

	constructor(private _uiInformation: TransferInterface) {
		this._root = new Field(
			koordinateToId(0, 0),
			null,
			null,
			null,
			null,
			_uiInformation.specifics.gameField!.find(
				(e) => e!.id === koordinateToId(0, 0),
			)!.fieldType,
		);

		for (let y = 0; y < _uiInformation.globals.height!; y++) {
			let walker = this.getFieldFromKoordinates(0, y) as Field;
			for (let x = 1; x < _uiInformation.globals.width!; x++) {
				walker.setRight(
					new Field(
						koordinateToId(x, y),
						y > 0 ? this.getFieldFromKoordinates(x, y - 1) : null,
						null,
						null,
						this.getFieldFromKoordinates(x - 1, y),
						_uiInformation.specifics.gameField!.find(
							(e) => e!.id === koordinateToId(x, y),
						)!.fieldType,
					),
				);
				if (y !== 0) {
					(walker.getRight()?.getUpper() as Field)?.setLower(
						this.getFieldFromKoordinates(x, y) as Field,
					);
				}
				walker = walker.getRight() as Field;
			}
			walker = this.getFieldFromKoordinates(0, y) as Field;
			if (y === _uiInformation.globals.height! - 1) {
				continue;
			}
			walker.setLower(
				new Field(
					koordinateToId(0, y + 1),
					this.getFieldFromKoordinates(0, y),
					null,
					null,
					null,
					_uiInformation.specifics.gameField!.find(
						(e) => e!.id === koordinateToId(0, y + 1),
					)!.fieldType,
				),
			);
		}
	}

	toArray() {
		const re = [];
		for (let y = 0; y < this._uiInformation.globals.height!; y++) {
			for (let x = 0; x < this._uiInformation.globals.width!; x++) {
				re.push(this.getFieldFromKoordinates(x, y));
			}
		}

		return re;
	}

	printInConsole(showNum: boolean) {
		for (let y = 0; y < this._uiInformation.globals.height!; y++) {
			let line = '';
			for (let x = 0; x < this._uiInformation.globals.width!; x++) {
				line += this.getFieldFromKoordinates(x, y)?.toLetter(showNum);
			}
			console.log(line);
		}
	}

	getFieldFromKoordinates(x: number, y: number): Fieldable | null {
		let walker = this._root;
		for (let i = 0; i < y; i++) {
			if (walker.getLower() !== null) {
				walker = walker.getLower() as Field;
			} else {
				null;
			}
		}
		for (let i = 0; i < x; i++) {
			if (walker.getRight() !== null) {
				walker = walker.getRight() as Field;
			} else {
				null;
			}
		}
		return walker;
	}
}
