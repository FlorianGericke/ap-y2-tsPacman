import React, { useState } from 'react';
import './scss/List.scss';

interface Listable {
	className?: string;
}

export const List: React.FC<Listable> = (props) => {
	const [elements, setElementsState] = useState<JSX.Element[]>([]);
	const [activeElement, setActive] = useState('0');

	function isClassNameActive(activeId: string): string {
		return activeId === activeElement
			? 'Div-ListItems--active'
			: 'Div-ListItems';
	}

	// function setElements(elements: string[]) {
	// 	const inserts: JSX.Element[] = [];
	//
	// 	for (let i = 0; i < elements.length; i++) {
	// 		inserts.push(
	// 			<div
	// 				className={isClassNameActive(`${i + 1}`)}
	// 				onClick={() => setActive(`${i + 1}`)}
	// 				id={`${i + 1}`}
	// 			>
	// 				{elements[i]}
	// 			</div>,
	// 		);
	// 	}
	// 	setElementsState(inserts);
	// }

	return (
		<div className={props.className}>
			<div style={{ backgroundColor: 'black' }} className={'Div-List'}>
				{elements.map((e) => e)}
			</div>
		</div>
	);
};
