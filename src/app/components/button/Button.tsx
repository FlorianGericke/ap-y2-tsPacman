import React, { useState } from 'react';
import './scss/Button.scss';

interface Clickable {
	className?: string;
	onClick?: () => void;
	children?: string;
}

export const Button: React.FC<Clickable> = (props) => {
	const [mouseDown, setMouseDown] = useState(false); // OnKlick Style Effect

	return (
		<div className={props.className}>
			<div
				className={
					mouseDown ? 'Div-buttonInner--mousedown' : 'Div-buttonInner'
				}
				onClick={props.onClick}
				onMouseDown={() => setMouseDown(true)}
				onMouseUp={() => setMouseDown(false)}
			>
				{props.children}
			</div>
		</div>
	);
};
