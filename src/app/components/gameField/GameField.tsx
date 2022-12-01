import React from 'react';
import { Field } from './Field';
import './scss/GameField.scss';
import { FieldableTemp } from '../../App';
import { koordinateToId } from '../../../transfers/ProjectUtils';

interface GameField {
	width: number;
	height: number;
	fieldSize?: number;
	className?: string;
	updateFieldInformation: (string: string) => void;
	gamefieldInformation: FieldableTemp;
}

export const GameField: React.FC<GameField> = (props) => {
	const fieldSize = props.fieldSize;
	const updateFieldInformation = props.updateFieldInformation;

	let width = props.width;
	let height = props.height;
	let fields: string[][] = [];

	if (props.gamefieldInformation.mapName !== '-1') {
		width = parseInt(props.gamefieldInformation.width);
		height = parseInt(props.gamefieldInformation.height);
		fields = props.gamefieldInformation.fields;
	}

	if (width > 100 || width < 0) {
		throw new Error('width must be greater than zero and smaller than 100');
	}
	if (height > 100 || height < 0) {
		throw new Error('width must be greater than zero and smaller than 100');
	}

	updateFieldInformation(width.toString());
	updateFieldInformation(height.toString());

	const colum = [];
	for (let y = 0; y < height; y++) {
		const row = [];
		for (let x = 0; x < width; x++) {
			const key = koordinateToId(x, y);

			const field = fields.find((field) => field[0] == key);
			let isPath = false;
			if (field) {
				console.log(field);
				isPath = field[1] === 'Div-field--path';
			}

			row.push(
				<Field
					isPath={isPath}
					id={key}
					size={fieldSize}
					key={parseInt(key)}
				/>,
			);
			updateFieldInformation(key);
		}
		colum.push(row);
	}

	console.log(props.gamefieldInformation);

	return (
		<div className={props.className}>
			{colum.map((colum) => (
				<div key={Math.random()} className={'Div-gameFieldRow'}>
					{colum}
				</div>
			))}
		</div>
	);
};
