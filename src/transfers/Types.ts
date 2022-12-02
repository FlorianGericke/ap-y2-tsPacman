import { FieldTypes } from '../game/field/FieldTypes';

export type playerPostion = number;
export type ghostPosition = { id: number; position: number };
export type field = {
	id: string;
	fieldType: FieldTypes;
	collected: boolean;
} | null;
