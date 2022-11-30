import React from 'react';
import { Field } from './Field';
import './scss/GameField.scss';

interface GameField {
	width: number;
	height: number;
	fieldSize?: number;
	className?: string;
	updateFieldInformation: (string: string) => void;
}

export const GameField: React.FC<GameField> = (props) => {
	if (props.width > 100 || props.width < 0) {
		throw new Error('width must be greater than zero and smaller than 100');
	}
	if (props.height > 100 || props.height < 0) {
		throw new Error('width must be greater than zero and smaller than 100');
	}

	props.updateFieldInformation(props.width.toString());
	props.updateFieldInformation(props.height.toString());

	const colum = [];
	for (let y = 0; y < props.height; y++) {
		const row = [];
		for (let x = 0; x < props.width; x++) {
			const key = `${`0${x}`.slice(-2)}${`0${y}`.slice(-2)}`;
			row.push(
				<Field id={key} size={props.fieldSize} key={parseInt(key)} />,
			);
			props.updateFieldInformation(key);
		}
		colum.push(row);
	}

	return (
		<div className={props.className}>
			{colum.map((colum) => (
				<div key={Math.random()} className={'gameFieldRow'}>
					{colum}
				</div>
			))}
		</div>
	);
};
