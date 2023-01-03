import { TransferInterface } from './../../transfers/TransferInterface';
import { GameManageable } from './GameManageable';
import React from 'react';
import GameField from '../field/GameField';
import { Move } from '../Move/Move';
import { Direction } from '../Direction';
import { YellowPawn } from '../player/PawnLogic/YellowPawn';
import { RedPawn } from '../player/PawnLogic/RedPawn';
import { PinkPawn } from '../player/PawnLogic/PinkPawn';
import { CyanPawn } from '../player/PawnLogic/CyanPawn';
import { OrangePawn } from '../player/PawnLogic/OrangePawn';
import { PawnTypes } from '../../transfers/PawnTypes';
import { GameManagerException } from './GameManagerException';

export class GameManager implements GameManageable {
	private _uiUpdateHook: React.Dispatch<
		React.SetStateAction<TransferInterface>
	> | null = null;
	private _gamefield: GameField | null = null;

	private _userInput = Direction.RIGHT;

	private _yellowPawn = new YellowPawn();
	private _redPawn = new RedPawn();
	private _pinkPawn = new PinkPawn();
	private _cyanPawn = new CyanPawn();
	private _orangePawn = new OrangePawn();

	constructor(private uiInformation: TransferInterface) {
		this._gamefield = new GameField(
			uiInformation,
			this._yellowPawn,
			this._redPawn,
			this._pinkPawn,
			this._cyanPawn,
			this._orangePawn,
		);
		document.addEventListener('keypress', (e: KeyboardEvent) => {
			if (e.key === 'w') {
				this._userInput = Direction.UP;
			}
			if (e.key === 'd') {
				this._userInput = Direction.RIGHT;
			}
			if (e.key === 's') {
				this._userInput = Direction.DOWN;
			}
			if (e.key === 'a') {
				this._userInput = Direction.LEFT;
			}
		});
	}

	endGame(): void {
		throw new Error('not implemented yet');
	}

	holdGame(): void {
		throw new Error('not implemented yet');
	}

	runGame(): void {
		setInterval(() => this._tick(), 500);
		// this._tick();
		// this._tick();
	}

	setUiUpdateHook(
		hook: React.Dispatch<React.SetStateAction<TransferInterface>>,
	): void {
		this._uiUpdateHook = hook;
	}

	private _tick() {
		if (this._gamefield == null) {
			throw new GameManagerException(
				'Cannot perform game tick when gamefield is empty',
			);
		}
		this._gamefield.registerMove(
			new Move(
				this._gamefield.getBordInformations().getPositionOfYellow(),
				this._userInput,
			),
		);
		this._gamefield.registerMove(
			new Move(
				this._gamefield.getBordInformations().getPositionOfRed(),
				Math.floor(Math.random() * 5),
			),
		);
		this._gamefield.registerMove(
			new Move(
				this._gamefield.getBordInformations().getPositionOfPink(),
				Math.floor(Math.random() * 5),
			),
		);
		this._gamefield.registerMove(
			new Move(
				this._gamefield.getBordInformations().getPositionOfCyan(),
				this._cyanPawn.getNextDirection(
					this._gamefield.getBordInformations(),
				),
			),
		);
		this._gamefield.registerMove(
			new Move(
				this._gamefield.getBordInformations().getPositionOfOrange(),
				Math.floor(Math.random() * 5),
			),
		);
		this._gamefield.makeMoves();
		// this._gamefield.printInConsole(false);
		this._repaintPawnsOnUi();
	}

	private _repaintPawnsOnUi() {
		const pawnPositions = this.uiInformation.globals.pawnPositions;

		if (pawnPositions == null) {
			throw new GameManagerException(
				'Cannot Update Ui with empty pawn Positions',
			);
		}

		pawnPositions.find((pawn) => pawn.type === PawnTypes.Yellow)!.position =
			this._gamefield?.getBordInformations().getPositionOfYellow();

		pawnPositions.find((pawn) => pawn.type === PawnTypes.Red)!.position =
			this._gamefield?.getBordInformations().getPositionOfRed();

		pawnPositions.find((pawn) => pawn.type === PawnTypes.Pink)!.position =
			this._gamefield?.getBordInformations().getPositionOfPink();

		pawnPositions.find((pawn) => pawn.type === PawnTypes.Cyan)!.position =
			this._gamefield?.getBordInformations().getPositionOfCyan();

		pawnPositions.find((pawn) => pawn.type === PawnTypes.Orange)!.position =
			this._gamefield?.getBordInformations().getPositionOfOrange();

		this.uiInformation.globals.pawnPositions = pawnPositions;

		this._uiUpdateHook?.(JSON.parse(JSON.stringify(this.uiInformation)));
	}
}
