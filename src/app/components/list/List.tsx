import React, { useState } from 'react';
import { getLocalStoredMaps } from '../../../transfers/ProjectUtils';
import './scss/List.scss';

interface Listable {
	className?: string;
	clickHandler: (element: string) => void;
}

export const List: React.FC<Listable> = (props) => {
	const [activeElement, setActive] = useState('0');

	function isClassNameActive(activeId: string): string {
		return activeId === activeElement
			? 'Div-ListItem--active'
			: 'Div-ListItem';
	}

	function ElementClick(elementCount: number, elements: string[]) {
		setActive(`${elementCount + 1}`);
		props.clickHandler(elements[elementCount]);
	}

	function arrayToDivs(elements: string[]) {
		const inserts: JSX.Element[] = [];
		for (let i = 0; i < elements.length; i++) {
			inserts.push(
				<div
					className={isClassNameActive(`${i + 1}`)}
					onClick={() => ElementClick(i, elements)}
					id={`${i + 1}`}
					key={`${i + 1}`}
				>
					{elements[i]}
				</div>,
			);
		}
		return inserts;
	}

	let elements: JSX.Element[] = [];
	const savedMaps = getLocalStoredMaps();

	const mapNames: string[] = [];
	for (let i = 0; i < savedMaps.length; i++) {
		mapNames.push(savedMaps[i].globals.mapName ?? '');
	}
	elements = arrayToDivs(mapNames);

	return (
		<div className={props.className}>
			<div className={'Div-ListItems'}>{elements.map((e) => e)}</div>
		</div>
	);
};
