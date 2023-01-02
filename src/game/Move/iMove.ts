import { Direction } from '../Direction';
import { Fieldable } from '../field/Fieldable';

export interface iMove {
	getActual: () => Fieldable;
	getDirection: () => Direction;
	getDestination: () => Fieldable;
	toString: () => string;
	equals: (other: iMove) => boolean;
}
