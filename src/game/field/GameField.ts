import { TransferInterface } from '../../transfers/TransferInterface';
import Field from './Field';
import { Fieldable } from './Fieldable';
import { idToKoordinate, koordinateToId } from '../../transfers/ProjectUtils';
import { field } from '../../transfers/Types';
import { FieldTypes } from './FieldTypes';
import { iGameField } from './iGameField';
import { Move } from '../Move/Move';
import { iMove } from '../Move/iMove';
import { IllegalMoveRegisteredException } from './IllegalMoveRegisteredException';
import { Player } from '../player/Player';

export default class GameField implements iGameField {
	private readonly _root: Field;
	private registerdMoves: iMove[] = [];
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
			let walker = this._getFieldFromCoordinates(0, y) as Field;
			for (let x = 1; x < (_uiInformation.globals.width ?? 0); x++) {
				walker.setRight(
					new Field(
						koordinateToId(x, y),
						y > 0 ? this._getFieldFromCoordinates(x, y - 1) : null,
						null,
						null,
						this._getFieldFromCoordinates(x - 1, y),
						this._getFieldTypeFromUiInformation(x, y),
					),
				);
				if (y !== 0) {
					(walker.getRight()?.getUpper() as Field)?.setLower(
						this._getFieldFromCoordinates(x, y) as Field,
					);
				}
				walker = walker.getRight() as Field;
			}
			walker = this._getFieldFromCoordinates(0, y) as Field;
			if (y === (_uiInformation.globals.height ?? 0) - 1) {
				continue;
			}
			walker.setLower(
				new Field(
					koordinateToId(0, y + 1),
					this._getFieldFromCoordinates(0, y),
					null,
					null,
					null,
					this._getFieldTypeFromUiInformation(0, y + 1),
				),
			);
		}
		for (const pawnPositionsKey of _uiInformation.globals.pawnPositions ??
			[]) {
			const position = idToKoordinate(pawnPositionsKey.position ?? '');
			this._getFieldFromCoordinates(
				position[0],
				position[1],
			)?.setOccupier(new Player(pawnPositionsKey.type));
		}
		console.log(_uiInformation);
	}

	registerMove(move: Move) {
		if (this._uiInformation.globals.pawnPositions == null) {
			throw new IllegalMoveRegisteredException(
				'Cannot register a Move when no Pawns on the gameBoard',
			);
		}
		if (
			this.registerdMoves.length <
			this._uiInformation.globals.pawnPositions.length
		) {
			throw new IllegalMoveRegisteredException(
				'Cannot register More moves then pawn are on the gameBoard',
			);
		}
		for (let i = 0; i < this.registerdMoves.length; i++) {
			if (this.registerdMoves[i].equals(move)) {
				throw new IllegalMoveRegisteredException(
					'Cannot register a More move twice',
				);
			}
			if (this.registerdMoves[i].getActual().equals(move.getActual())) {
				throw new IllegalMoveRegisteredException(
					'Cannot register a more then 1 move from one origin',
				);
			}
		}
	}
	makeMoves() {
		throw new Error('not implemented');
	}

	private _toArray() {
		const re: (Fieldable | null)[] = [];
		for (let y = 0; y < (this._uiInformation.globals.height ?? 0); y++) {
			for (let x = 0; x < (this._uiInformation.globals.width ?? 0); x++) {
				re.push(this._getFieldFromCoordinates(x, y));
			}
		}

		return re;
	}

	printInConsole(showNum: boolean) {
		for (let y = 0; y < (this._uiInformation.globals.height ?? 0); y++) {
			let line = '';
			for (let x = 0; x < (this._uiInformation.globals.width ?? 0); x++) {
				line += this._getFieldFromCoordinates(x, y)?.toLetter(showNum);
			}
			console.log(line);
		}
	}

	private _getFieldFromCoordinates(x: number, y: number): Fieldable | null {
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
