import { Direction } from '../Direction';
import { Fieldable } from '../field/Fieldable';

export interface iMove {
	getActual: () => string;
	getDirection: () => Direction;
	toString: () => string;
	equals: (other: iMove) => boolean;
}
