import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { BordInformations } from '../../field/BordInformations';
import { Direction } from '../../Direction';

export class PinkPawn extends Player {
	constructor() {
		super(PawnTypes.Pink);
	}
	getNextDirection(info: BordInformations): Direction {
		return Math.floor(Math.random() * 5);
	}
}
