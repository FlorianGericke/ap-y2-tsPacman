import { TransferInterface } from './../../transfers/TransferInterface';
import { GameManageable } from './GameManageable';
import { Controllable } from '../Controllable';
import React from 'react';
import GameField from '../field/GameField';
import { Move } from '../Move/Move';
import { Direction } from '../Direction';
import { YellowPawn } from '../player/PawnLogic/YellowPawn';
import { RedPawn } from '../player/PawnLogic/RedPawn';
import { PinkPawn } from '../player/PawnLogic/PinkPawn';
import { CyanPawn } from '../player/PawnLogic/CyanPawn';
import { OrangePawn } from '../player/PawnLogic/OrangePawn';

export class GameManager implements GameManageable {
	constructor(private uiInformation: TransferInterface) {
		const temp = new GameField(
			uiInformation,
			new YellowPawn(),
			new RedPawn(),
			new PinkPawn(),
			new CyanPawn(),
			new OrangePawn(),
		);
		temp.printInConsole(false);
		console.log('');
		temp.registerMove(
			new Move(
				temp.getBordInformations().getPositionOfYellow(),
				Direction.UP,
			),
		);
		temp.registerMove(
			new Move(
				temp.getBordInformations().getPositionOfRed(),
				Direction.DOWN,
			),
		);
		temp.registerMove(
			new Move(
				temp.getBordInformations().getPositionOfPink(),
				Direction.LEFT,
			),
		);
		temp.registerMove(
			new Move(
				temp.getBordInformations().getPositionOfCyan(),
				Direction.RIGHT,
			),
		);
		temp.registerMove(
			new Move(
				temp.getBordInformations().getPositionOfOrange(),
				Direction.LEFT,
			),
		);
		temp.makeMoves();
		temp.printInConsole(false);
	}

	endGame(): void {
		throw new Error('not implemented yet');
	}

	getGameControls(): Controllable {
		throw new Error('not implemented yet');
		// return undefined;
	}

	holdGame(): void {
		throw new Error('not implemented yet');
	}

	runGame(): void {
		throw new Error('not implemented yet');
	}

	setUiUpdateHook(
		hook: React.Dispatch<React.SetStateAction<TransferInterface>>,
	): void {
		throw new Error('not implemented yet');
	}
}
