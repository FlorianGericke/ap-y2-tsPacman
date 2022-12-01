import { TransferInterface } from './../../transfers/TransferInterface';
import { GameManageable } from './GameManageable';
import { Controllable } from '../Controllable';
import { FieldableTemp } from '../../app/App';
import React from 'react';
import GameField from '../field/GameField';

export class GameManager implements GameManageable {
	constructor(private uiInformation: TransferInterface) {
		const temp = new GameField(uiInformation);
		console.log(temp.toArray());
		temp.printInConsole(false);
		temp.printInConsole(true);
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
		hook: React.Dispatch<React.SetStateAction<FieldableTemp>>,
	): void {
		throw new Error('not implemented yet');
	}
}
