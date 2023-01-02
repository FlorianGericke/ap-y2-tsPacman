import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from 'tty';

export class OrangePawn extends Player {
	constructor() {
		super(PawnTypes.Orange);
	}
	getNextDirection(): () => Direction {
		throw new Error('not implemented yet');
	}
}
