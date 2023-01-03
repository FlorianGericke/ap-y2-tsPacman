import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from 'tty';
import { BordInformations } from '../../field/BordInformations';

export class PinkPawn extends Player {
	constructor() {
		super(PawnTypes.Pink);
	}
	getNextDirection(info: BordInformations): Direction {
		throw new Error('not implemented yet');
	}
}
