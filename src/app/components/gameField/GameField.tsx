import React from 'react';
import { Field } from './Field';
import './scss/GameField.scss';
import { koordinateToId } from '../../../transfers/ProjectUtils';
import { TransferInterface } from '../../../transfers/TransferInterface';
import { FieldTypes } from '../../../game/field/FieldTypes';
import { PawnTypes } from '../../../transfers/PawnTypes';
import { pawn } from '../../../transfers/Types';
import { GamePhase } from '../../../transfers/GamePhase';
import GamePhaseError from '../../../transfers/GamePhaseError';

interface GameField {
	width: number;
	height: number;
	fieldSize?: number;
	className?: string;
	gamefieldInformation: TransferInterface;
	setGameFieldInformation: (gameFieldInformation: TransferInterface) => void;
	liftInformationUp: (id: string) => void;
	gamePhase: GamePhase;
}

export const GameField: React.FC<GameField> = (props) => {
	function setSpawn(type: PawnTypes, id: string) {
		if (props.gamePhase === GamePhase.PLAY) {
			throw new GamePhaseError(
				'Cannot setSpawn when gamePhase is GamePhase.PLAY',
			);
		}
		if (
			!props.gamefieldInformation.globals.pawnPositions.find(
				(p: pawn) => p.type === type,
			)
		) {
			props.gamefieldInformation.globals.pawnPositions.push({
				type: type,
				spawn: id,
				position: id,
			});
		}
		props.setGameFieldInformation(props.gamefieldInformation);
	}
	const fieldSize = props.fieldSize;

	const width = props.gamefieldInformation.globals.width ?? props.width;
	const height = props.gamefieldInformation.globals.height ?? props.height;
	const fields = props.gamefieldInformation.specifics.gameField;
	const pawnPositions = props.gamefieldInformation.globals.pawnPositions;

	if (props.gamePhase === GamePhase.CONFIG) {
		props.liftInformationUp(width.toString());
		props.liftInformationUp(height.toString());
		props.liftInformationUp(JSON.stringify(pawnPositions));

		if (width > 100 || width < 0) {
			throw new Error(
				'width must be greater than zero and smaller than 100',
			);
		}
		if (height > 100 || height < 0) {
			throw new Error(
				'width must be greater than zero and smaller than 100',
			);
		}
	}

	const colum = [];
	for (let y = 0; y < height; y++) {
		const row = [];
		for (let x = 0; x < width; x++) {
			const key = koordinateToId(x, y);

			const field = fields.find((field) => field!.id == key);
			let isPath = false;
			let isOcupiedPawnId: PawnTypes | null = null;

			if (field) {
				isPath = field.fieldType === FieldTypes.PATH;
			}

			isOcupiedPawnId =
				pawnPositions.find((p) => p.position === koordinateToId(x, y))
					?.type ?? null;

			row.push(
				<Field
					isPath={isPath}
					id={key}
					setOccupiedPawnType={isOcupiedPawnId}
					size={fieldSize}
					key={parseInt(key)}
					setSpawn={setSpawn}
					gamePhase={props.gamePhase}
				/>,
			);
			if (props.gamePhase === GamePhase.CONFIG) {
				props.liftInformationUp(koordinateToId(x, y));
			}
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
