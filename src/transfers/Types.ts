import { FieldTypes } from '../game/field/FieldTypes';

export type playerPostion = number | null;
export type ghostPosition = { id: number; position: number } | null;
export type field = {
	id: string;
	fieldType: FieldTypes;
	collected: boolean;
} | null;
