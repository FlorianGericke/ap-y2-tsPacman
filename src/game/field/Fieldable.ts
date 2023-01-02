import { FieldTypes } from './FieldTypes';
import { Playerable } from '../player/Playerable';

export interface Fieldable {
	getUpper: () => Fieldable | null;
	getLower: () => Fieldable | null;
	getLeft: () => Fieldable | null;
	getRight: () => Fieldable | null;

	getNumPath: () => number;

	getFieldType: () => FieldTypes;
	isOccupied: () => boolean;
	isOccupiedFrom: () => Playerable | null;
	setOccupier: (occupier: Playerable) => void;

	equals: (other: Fieldable) => boolean;
	toLetter: (showNum: boolean) => string;
	toString: () => string;
}
