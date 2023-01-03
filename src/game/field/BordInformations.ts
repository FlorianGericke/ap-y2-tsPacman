import { Fieldable } from './Fieldable';

export interface BordInformations {
	getPositionOfYellow: () => string;
	getPositionOfRed: () => string;
	getPositionOfPink: () => string;
	getPositionOfCyan: () => string;
	getPositionOfOrange: () => string;
	getFieldOfId: (id: string) => Fieldable;
	getFieldOfCoordinate: (x: number, y: number) => Fieldable;
}
