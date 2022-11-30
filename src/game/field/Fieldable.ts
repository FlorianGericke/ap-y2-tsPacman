import { Playerable } from '../player/playerable';
import { FieldTypes } from './FieldTypes';

export interface Fieldable {
	getUpper: () => Fieldable | null;
	getLower: () => Fieldable | null;
	getLeft: () => Fieldable | null;
	getRight: () => Fieldable | null;

	getFieldType: () => FieldTypes;
	isOccupied: () => boolean;
	isOccupiedFrom: () => Playerable;

	getFieldCoordinates: () => [number, number];

	equals: () => boolean;
	toString: () => string;
}
