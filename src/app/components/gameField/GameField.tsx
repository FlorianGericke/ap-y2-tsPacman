import React from 'react';
import { Field } from './Field';
import './scss/GameField.scss';
import { koordinateToId } from '../../../transfers/ProjectUtils';
import { TransferInterface } from '../../../transfers/TransferInterface';
import { FieldTypes } from '../../../game/field/FieldTypes';

interface GameField {
	width: number;
	height: number;
	fieldSize?: number;
	className?: string;
	gamefieldInformation: TransferInterface;
	liftInformationUp: (id: string) => void;
}

export const GameField: React.FC<GameField> = (props) => {
	const fieldSize = props.fieldSize;

	const width = props.gamefieldInformation.globals.width ?? props.width;
	const height = props.gamefieldInformation.globals.height ?? props.height;
	const fields = props.gamefieldInformation.specifics.gameField;

	props.liftInformationUp(width.toString());
	props.liftInformationUp(height.toString());

	if (width > 100 || width < 0) {
		throw new Error('width must be greater than zero and smaller than 100');
	}
	if (height > 100 || height < 0) {
		throw new Error('width must be greater than zero and smaller than 100');
	}

	const colum = [];
	for (let y = 0; y < height; y++) {
		const row = [];
		for (let x = 0; x < width; x++) {
			const key = koordinateToId(x, y);

			const field = fields.find((field) => field!.id == key);
			let isPath = false;
			if (field) {
				isPath = field.fieldType === FieldTypes.PATH;
			}

			row.push(
				<Field
					isPath={isPath}
					id={key}
					size={fieldSize}
					key={parseInt(key)}
				/>,
			);

			props.liftInformationUp(koordinateToId(x, y));
		}
		colum.push(row);
	}

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
