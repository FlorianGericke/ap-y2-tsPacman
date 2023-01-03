import { Direction } from '../Direction';
import { PawnTypes } from '../../transfers/PawnTypes';
import { BordInformations } from '../field/BordInformations';

export interface Playerable {
	getSpawnAsId: () => string;
	setSpawnAsId: (postion: string) => void;
	getNextDirection: (info: BordInformations) => Direction;
	getPawnType: () => PawnTypes;
	getPostionAsId: () => string;
	setPostionAsId: (postion: string) => void;
}
