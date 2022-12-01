import { TransferInterface } from '../../TransferInterface';
import { GameManageable } from './GameManageable';
import { Controllable } from '../Controllable';
import { FieldableTemp } from '../../app/App';
import React from 'react';

export class GameManager implements GameManageable {
	constructor(private uiInformation: TransferInterface) {}

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
