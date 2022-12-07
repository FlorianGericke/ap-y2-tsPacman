import { Exception } from 'sass';

export default class GamePhaseError extends Error {
	constructor(message: string) {
		super(message);
	}
}
