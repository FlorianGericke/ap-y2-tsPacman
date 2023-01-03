import React from 'react';
import { TransferInterface } from '../../transfers/TransferInterface';

export interface GameManageable {
	runGame: () => void;
	holdGame: () => void;
	endGame: () => void;

	setUiUpdateHook: (
		hook: React.Dispatch<React.SetStateAction<TransferInterface>>,
	) => void;
}
