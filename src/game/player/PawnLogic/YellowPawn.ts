import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from '../../Direction';

export class YellowPawn extends Player {
	constructor() {
		super(PawnTypes.Yellow);
	}

	getNextDirection(): () => Direction {
		throw new Error('not implemented yet');
	}
}
