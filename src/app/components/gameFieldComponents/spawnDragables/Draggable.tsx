import React from 'react';
import { PawnTypes } from '../../../../transfers/PawnTypes';
import { useDrag } from 'react-dnd';

interface Draggable {
	type: PawnTypes;
	className?: string;
}

export const Draggable: React.FC<Draggable> = (props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'pawn',
		item: { type: props.type },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className={props.className}
			style={{
				opacity: isDragging ? 0.5 : 1,
			}}
		>
			<div
				className={`Div-field--${props.type}`} // using Style from Game-field/Field StyleSheet
			></div>
		</div>
	);
};
