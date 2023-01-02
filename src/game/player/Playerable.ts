import { Direction } from '../Direction';
import { PawnTypes } from '../../transfers/PawnTypes';

export interface Playerable {
	goBackToSpawn: () => void;
	getNextDirection(): () => Direction;
	getPawnType: () => PawnTypes;
}
