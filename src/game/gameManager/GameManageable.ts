import { Controllable } from './Controllable';
import React from 'react';
import { FieldableTemp } from '../app/App';

export interface GameManageable {
	runGame: () => void;
	holdGame: () => void;
	endGame: () => void;

	getGameControls: () => Controllable;

	setUiUpdateHook: (
		hook: React.Dispatch<React.SetStateAction<FieldableTemp>>,
	) => void;
}
