import React, { useState } from 'react';
import './scss/List.scss';

interface Listable {
	className?: string;
}

export const List: React.FC<Listable> = (props) => {
	const [elements, setElements] = useState([]);
	const [activeElement, setActive] = useState('0');

	function isClassNameActive(activeId: string): string {
		return activeId === activeElement
			? 'Div-ListItems--active'
			: 'Div-ListItems';
	}

	return (
		<div className={props.className}>
			<div style={{ backgroundColor: 'black' }} className={'Div-List'}>
				<div
					className={isClassNameActive('1')}
					onClick={() => setActive('1')}
					id={'1'}
				>
					Map1
				</div>
				<div
					className={isClassNameActive('2')}
					onClick={() => setActive('2')}
					id={'2'}
				>
					Map2
				</div>
				<div
					className={isClassNameActive('3')}
					onClick={() => setActive('3')}
					id={'3'}
				>
					Map3
				</div>
			</div>
		</div>
	);
};
