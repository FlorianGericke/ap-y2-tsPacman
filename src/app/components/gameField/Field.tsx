import React, { useState } from 'react';
import './scss/Field.scss';
import { PawnTypes } from '../../../transfers/PawnTypes';
import { useDrop } from 'react-dnd';
import { GamePhase } from '../../../transfers/GamePhase';

export const Field: React.FC<{
	id: string;
	isPath: boolean;
	size?: number;
	setOccupiedPawnType?: PawnTypes;
	setSpawn?: (type: PawnTypes, id: string) => void;
	gamePhase: GamePhase;
}> = (props) => {
	const [isPath, setPath] = useState(props.isPath);

	let style = {};

	const [, drop] = useDrop(() => ({
		accept: 'pawn',
		drop: (item: { type: PawnTypes }) =>
			props.setSpawn(item.type, props.id),
	}));

	function getClassName() {
		if (props.setOccupiedPawnType == null) {
			const hover = `${
				props.gamePhase === GamePhase.CONFIG ? '--hover' : ''
			}`;
			return isPath
				? `Div-field--path${hover}`
				: `Div-field--wall${hover}`;
		}
		return `Div-field--${props.setOccupiedPawnType}`;
	}

	if (props.size) {
		style = {
			width: `${props.size}rem`,
			height: `${props.size}rem`,
		};
	}

	return (
		<div ref={drop} style={{ backgroundColor: 'black' }}>
			<div
				id={props.id}
				onClick={() => setPath(!isPath)}
				className={getClassName()}
				style={style}
			>
				{props.setOccupiedPawnType === null && (isPath ? 'p' : 'w')}
			</div>
		</div>
	);
};
