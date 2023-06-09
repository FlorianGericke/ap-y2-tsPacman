import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { Direction } from '../../Direction';
import { BordInformations } from '../../field/BordInformations';

export class RedPawn extends Player {
	constructor() {
		super(PawnTypes.Red);
	}
	getNextDirection(info: BordInformations): Direction {
		return Math.floor(Math.random() * 5);
	}
}
