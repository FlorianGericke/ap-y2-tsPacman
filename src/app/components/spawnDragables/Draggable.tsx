import React from 'react';
import { PawnTypes } from '../../../transfers/PawnTypes';
import { useDrag } from 'react-dnd';

interface Draggable {
	type: PawnTypes;
}

export const Draggable: React.FC<Draggable> = (props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'pawn',
		item: { type: props.type },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 25,
				fontWeight: 'bold',
				cursor: 'move',
			}}
		>
			<div className={`Div-field--${props.type}`}></div>
		</div>
	);
};
