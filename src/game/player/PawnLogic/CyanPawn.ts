import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { BordInformations } from '../../field/BordInformations';
import { Direction } from '../../Direction';

export class CyanPawn extends Player {
	private _counter = 0;
	private current = Direction.UP;

	constructor() {
		super(PawnTypes.Cyan);
	}

	getNextDirection(info: BordInformations): Direction {
		// info.getFieldOfId(this.getPostionAsId()).setOccupier(null);
		// info.getFieldOfCoordinate(1, 1).setOccupier(this);
		// this._counter++;
		return Math.floor(Math.random() * 5);
	}
}
