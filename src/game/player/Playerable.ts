import { Direction } from '../Direction';
import { PawnTypes } from '../../transfers/PawnTypes';
import { Fieldable } from '../field/Fieldable';

export interface Playerable {
	getSpawnField: () => Fieldable;
	setSpawnField: (spawn: Fieldable) => void;
	getNextDirection(): () => Direction;
	getPawnType: () => PawnTypes;
	getPostionAsId: () => string;
	setPostionAsId: (postion: string) => void;
}
