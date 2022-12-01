import { Direction } from './Direction';

export interface Controllable {
	setUserMoveInput: (direction: Direction) => void;
}
