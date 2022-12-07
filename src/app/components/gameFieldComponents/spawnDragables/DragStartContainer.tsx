import React from 'react';
import { Draggable } from './Draggable';
import { PawnTypes } from '../../../../transfers/PawnTypes';
import { TransferInterface } from '../../../../transfers/TransferInterface';
import { Button } from '../../button/Button';

import './scss/DrafStartContainer.scss';

interface DragStartContainer {
	gameFieldInformation: TransferInterface;
	className?: string;
	resetButtonClick?: () => void;
}

export const DragStartContainer: React.FC<DragStartContainer> = (props) => {
	return (
		<div className={props.className}>
			<div className={'Div-DragContainer'}>
				<div className={'DragContainerHeader'}>
					<p>Drag an Drop Pawn spawn into the Gamefield</p>
					<Button
						className={'ResetButton'}
						onClick={props.resetButtonClick}
					>
						Reset
					</Button>
				</div>
				<div className={'Div-DragStartContainer'}>
					{!props.gameFieldInformation.globals.pawnPositions?.find(
						(p) => p.type === PawnTypes.Yellow,
					)?.spawn && <Draggable type={PawnTypes.Yellow} />}
					{!props.gameFieldInformation.globals.pawnPositions?.find(
						(p) => p.type === PawnTypes.Red,
					)?.spawn && <Draggable type={PawnTypes.Red} />}
					{!props.gameFieldInformation.globals.pawnPositions?.find(
						(p) => p.type === PawnTypes.Pink,
					)?.spawn && <Draggable type={PawnTypes.Pink} />}
					{!props.gameFieldInformation.globals.pawnPositions?.find(
						(p) => p.type === PawnTypes.Cyan,
					)?.spawn && <Draggable type={PawnTypes.Cyan} />}
					{!props.gameFieldInformation.globals.pawnPositions?.find(
						(p) => p.type === PawnTypes.Orange,
					)?.spawn && <Draggable type={PawnTypes.Orange} />}
				</div>
			</div>
		</div>
	);
};
