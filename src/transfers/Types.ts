export type playerPostion = number;
export type ghostPosition = { id: number; position: number };
export type field = {
	id: number;
	fieldType: 'wall' | 'path';
	collected: boolean;
};
