import React, { useState } from 'react';
import './scss/Field.scss';

export const Field: React.FC<{ id: string; isPath: boolean; size?: number }> = (
	props,
) => {
	const [isPath, setPath] = useState(props.isPath);

	let style = {};

	if (props.size) {
		style = {
			width: `${props.size}rem`,
			height: `${props.size}rem`,
		};
	}

	return (
		<div style={{ backgroundColor: 'black' }}>
			<div
				id={props.id}
				onClick={() => setPath(!isPath)}
				className={isPath ? 'Div-field--path' : 'Div-field--wall'}
				style={style}
			>
				{isPath ? 'p' : 'w'}
			</div>
		</div>
	);
};
