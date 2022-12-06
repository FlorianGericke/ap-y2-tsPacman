import { FieldTypes } from '../game/field/FieldTypes';
import { PawnTypes } from './PawnTypes';

export type pawn = {
	type: PawnTypes;
	spawn?: string;
	position?: string;
};

export type field = {
	id: string;
	fieldType: FieldTypes;
	collected: boolean;
} | null;
