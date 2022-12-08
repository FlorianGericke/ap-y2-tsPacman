import { field } from '../../transfers/Types';

export interface iMove {
	getOrigin: () => field;
	getDestination: () => field;
	toString: () => string;
}
