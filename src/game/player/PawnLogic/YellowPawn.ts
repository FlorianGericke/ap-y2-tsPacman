import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from '../../Direction';
import { BordInformations } from '../../field/BordInformations';

export class YellowPawn extends Player {
	constructor() {
		super(PawnTypes.Yellow);
	}
	getNextDirection(info: BordInformations): Direction {
		throw new Error('not implemented yet');
	}
}
