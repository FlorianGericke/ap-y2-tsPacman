import { Playerable } from '../player/playerable';
import { FieldTypes } from './FieldTypes';

export interface Fieldable {
	getUpper: () => Fieldable | null;
	getLower: () => Fieldable | null;
	getLeft: () => Fieldable | null;
	getRight: () => Fieldable | null;

	getNumPath: () => number;

	getFieldType: () => FieldTypes;
	isOccupied: () => boolean;
	isOccupiedFrom: () => Playerable;

	equals: () => boolean;
	toLetter: (showNum: boolean) => string;
	toString: () => string;
}
