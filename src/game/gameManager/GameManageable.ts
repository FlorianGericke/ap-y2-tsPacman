import { Controllable } from './../Controllable';
import React from 'react';
import { TransferInterface } from '../../transfers/TransferInterface';

export interface GameManageable {
	runGame: () => void;
	holdGame: () => void;
	endGame: () => void;

	getGameControls: () => Controllable;

	setUiUpdateHook: (
		hook: React.Dispatch<React.SetStateAction<TransferInterface>>,
	) => void;
}
