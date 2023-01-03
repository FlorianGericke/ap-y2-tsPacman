import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from '../../Direction';

export class RedPawn extends Player {
	constructor() {
		super(PawnTypes.Red);
	}
	getNextDirection(): () => Direction {
		throw new Error('not implemented yet');
	}
}
