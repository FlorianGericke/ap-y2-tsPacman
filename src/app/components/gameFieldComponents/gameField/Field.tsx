import React, { useState } from 'react';
import './scss/Field.scss';
import { PawnTypes } from '../../../../transfers/PawnTypes';
import { useDrop } from 'react-dnd';
import { GamePhase } from '../../../../transfers/GamePhase';

interface Field {
	id: string;
	isPath: boolean;
	size?: number;
	setOccupiedPawnType: PawnTypes | null;
	setSpawn: (type: PawnTypes, id: string) => void;
	gamePhase: GamePhase;
}

export const Field: React.FC<Field> = (props) => {
	const [isPath, setPath] = useState(props.isPath);
	const [, drop] = useDrop(() => ({
		accept: 'pawn',
		drop: (item: { type: PawnTypes }) =>
			props.setSpawn(item.type, props.id),
	}));

	let style = {};

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

	function fieldClickHandler() {
		setPath(!isPath);
	}

	return (
		<div ref={drop} style={{ backgroundColor: 'black' }}>
			<div
				id={props.id}
				onClick={fieldClickHandler}
				className={getClassName()}
				style={style}
			>
				{props.setOccupiedPawnType === null && (isPath ? 'p' : 'w')}
			</div>
		</div>
	);
};
