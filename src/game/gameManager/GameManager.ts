import { TransferInterface } from './../../transfers/TransferInterface';
import { GameManageable } from './GameManageable';
import { Controllable } from '../Controllable';
import React from 'react';
import GameField from '../field/GameField';

export class GameManager implements GameManageable {
	constructor(private uiInformation: TransferInterface) {
		const temp = new GameField(uiInformation);
		temp.printInConsole(false);
		console.log('');
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
		hook: React.Dispatch<React.SetStateAction<TransferInterface>>,
	): void {
		throw new Error('not implemented yet');
	}
}
