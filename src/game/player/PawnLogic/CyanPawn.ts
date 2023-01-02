import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from 'tty';

export class CyanPawn extends Player {
	constructor() {
		super(PawnTypes.Cyan);
	}
	getNextDirection(): () => Direction {
		throw new Error('not implemented yet');
	}
}
