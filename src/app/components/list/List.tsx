import React, { useState } from 'react';
import './scss/List.scss';
import { TransferInterface } from '../../../transfers/TransferInterface';

interface Listable {
	className?: string;
	clickHandler: (element: string) => void;
}

export const List: React.FC<Listable> = (props) => {
	const [activeElement, setActive] = useState('0');

	function isClassNameActive(activeId: string): string {
		return activeId === activeElement
			? 'Div-ListItems--active'
			: 'Div-ListItems';
	}

	function arrayToDivs(elements: string[]) {
		const inserts: JSX.Element[] = [];
		for (let i = 0; i < elements.length; i++) {
			inserts.push(
				<div
					className={isClassNameActive(`${i + 1}`)}
					onClick={() => {
						setActive(`${i + 1}`);
						props.clickHandler(elements[i]);
					}}
					id={`${i + 1}`}
					key={`${i + 1}`}
				>
					{elements[i]}
				</div>,
			);
		}
		return inserts;
	}

	const localStorageValue: string | null = localStorage.getItem('savedMaps');

	const savedMaps: TransferInterface[] = localStorageValue
		? (JSON.parse(localStorageValue) as TransferInterface[])
		: (JSON.parse('[]') as TransferInterface[]);

	let elements: JSX.Element[] = [];

	if (savedMaps) {
		const s: string[] = [];
		for (let i = 0; i < savedMaps.length; i++) {
			s.push(savedMaps[i].globals.mapName);
		}
		elements = arrayToDivs(s);
	}

	return (
		<div className={props.className}>
			<div style={{ backgroundColor: 'black' }} className={'Div-List'}>
				{elements.map((e) => e)}
			</div>
		</div>
	);
};
