import React, { useState } from 'react';
import './scss/Button.scss';

interface Clickable {
	className?: string;
	onClick?: (event?: MouseEvent) => void;
	children?: string;
}

export const Button: React.FC<Clickable> = (props) => {
	const [mouseDown, setMouseDown] = useState(false);

	return (
		<div
			className={props.className}
			onClick={() => props.onClick && props.onClick()}
		>
			<div
				className={
					mouseDown ? 'buttonInnerDiv--mousedown' : 'buttonInnerDiv'
				}
				onMouseDown={() => setMouseDown(true)}
				onMouseUp={() => setMouseDown(false)}
			>
				{props.children}
			</div>
		</div>
	);
};
