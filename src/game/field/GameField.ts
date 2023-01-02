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
import { Playerable } from '../player/Playerable';
import { PawnTypes } from '../../transfers/PawnTypes';
import { BordInformations } from './BordInformations';
import { Direction } from '../Direction';

export default class GameField implements iGameField {
	private readonly _ROOT: Field;
	private registeredMoves: iMove[] = [];
	private pacmanCanKill = false;

	constructor(
		private _uiInformation: TransferInterface,
		private readonly _YELLOW_PAWN: Playerable,
		private readonly _RED_PAWN: Playerable,
		private readonly _PINK_PAWN: Playerable,
		private readonly _CYAN_PAWN: Playerable,
		private readonly _ORANGE_PAWN: Playerable,
	) {
		if (!_uiInformation) {
			throw new Error(
				'GameField needs uiInformation object to be initialized',
			);
		}
		if (!_uiInformation.specifics.gameField) {
			throw new Error('GameField needs uiInformation with gameFields');
		}
		this._ROOT = new Field(
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
			let insert: Playerable | null = null;
			if (pawnPositionsKey.type === PawnTypes.Yellow)
				insert = this._YELLOW_PAWN;
			if (pawnPositionsKey.type === PawnTypes.Red)
				insert = this._RED_PAWN;
			if (pawnPositionsKey.type === PawnTypes.Pink)
				insert = this._PINK_PAWN;
			if (pawnPositionsKey.type === PawnTypes.Cyan)
				insert = this._CYAN_PAWN;
			if (pawnPositionsKey.type === PawnTypes.Orange)
				insert = this._ORANGE_PAWN;

			insert?.setPostionAsId(pawnPositionsKey.position ?? '');

			this._getFieldFromCoordinates(
				position[0],
				position[1],
			)?.setOccupier(insert);
		}
		console.log(_uiInformation);
	}

	getBordInformations() {
		return new (class implements BordInformations {
			constructor(public superThis: GameField) {}
			getPositionOfCyan(): string {
				return this.superThis._CYAN_PAWN.getPostionAsId();
			}

			getPositionOfOrange(): string {
				return this.superThis._ORANGE_PAWN.getPostionAsId();
			}

			getPositionOfPink(): string {
				return this.superThis._PINK_PAWN.getPostionAsId();
			}

			getPositionOfRed(): string {
				return this.superThis._RED_PAWN.getPostionAsId();
			}

			getPositionOfYellow(): string {
				return this.superThis._YELLOW_PAWN.getPostionAsId();
			}
		})(this);
	}

	registerMove(move: Move) {
		if (this._uiInformation.globals.pawnPositions == null) {
			throw new IllegalMoveRegisteredException(
				'Cannot register a Move when no Pawns on the gameBoard',
			);
		}
		if (
			this.registeredMoves.length >=
			this._uiInformation.globals.pawnPositions.length
		) {
			throw new IllegalMoveRegisteredException(
				'Cannot register More moves then pawn are on the gameBoard',
			);
		}
		for (let i = 0; i < this.registeredMoves.length; i++) {
			if (this.registeredMoves[i].equals(move)) {
				throw new IllegalMoveRegisteredException(
					'Cannot register a move twice',
				);
			}
			if (this.registeredMoves[i].getActual() === move.getActual()) {
				throw new IllegalMoveRegisteredException(
					'Cannot register a more then 1 move from one origin',
				);
			}
		}
		this.registeredMoves.push(move);
	}
	makeMoves() {
		if (
			this.registeredMoves.length !==
			(this._uiInformation.globals.pawnPositions ?? []).length
		) {
			throw new IllegalMoveRegisteredException(
				'The amount of moves does not fit for the number of Players',
			);
		}

		for (let i = 0; i < this.registeredMoves.length; i++) {
			const position = idToKoordinate(
				this.registeredMoves[i].getActual(),
			);
			const origin = this._getFieldFromCoordinates(
				position[0],
				position[1],
			);
			if (origin == null) {
				throw new IllegalMoveRegisteredException(
					'cannot find origin field',
				);
			}

			const pawn = origin.isOccupiedFrom();

			let destination: Fieldable | null;

			if (this.registeredMoves[i].getDirection() === Direction.UP) {
				destination = origin.getUpper();
			}
			if (this.registeredMoves[i].getDirection() === Direction.RIGHT) {
				destination = origin.getRight();
			}
			if (this.registeredMoves[i].getDirection() === Direction.DOWN) {
				destination = origin.getLower();
			}
			if (this.registeredMoves[i].getDirection() === Direction.LEFT) {
				destination = origin.getLeft();
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (destination == null) {
				throw new IllegalMoveRegisteredException(
					'no destination connection',
				);
			}
			if (destination.getFieldType() !== FieldTypes.PATH) {
				throw new IllegalMoveRegisteredException(
					'Destination must be a path',
				);
			}

			if (!destination.isOccupied()) {
				origin.setOccupier(null);
				destination.setOccupier(pawn);
				pawn?.setPostionAsId(destination.getId());
			}
		}
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
		let walker = this._ROOT;
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
