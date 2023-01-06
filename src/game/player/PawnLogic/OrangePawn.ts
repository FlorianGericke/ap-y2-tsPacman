import { Player } from '../Player';

import { PawnTypes } from '../../../transfers/PawnTypes';
import { BordInformations } from '../../field/BordInformations';
import { Direction } from '../../Direction';

export class OrangePawn extends Player {
	constructor() {
		super(PawnTypes.Orange);
	}
	getNextDirection(info: BordInformations): Direction {
		// info.getFieldOfId(this.getPostionAsId()).setOccupier(null);
		// info.getFieldOfCoordinate(1, 1).setOccupier(this);
		// this._counter++;
		return Math.floor(Math.random() * 5);
	}
}
