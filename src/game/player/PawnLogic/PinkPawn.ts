import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from 'tty';

export class PinkPawn extends Player {
	constructor() {
		super(PawnTypes.Pink);
	}
	getNextDirection(): () => Direction {
		throw new Error('not implemented yet');
	}
}
