import React, { useState } from 'react';
import { GameField } from './components/gameFieldComponents/gameField/GameField';
import './styles/scss/App.scss';
import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { TransferInterface } from '../transfers/TransferInterface';
import { FieldTypes } from '../game/field/FieldTypes';
import { GameManager } from '../game/gameManager/GameManager';
import { DragStartContainer } from './components/gameFieldComponents/spawnDragables/DragStartContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { pawn } from '../transfers/Types';
import { GamePhase } from '../transfers/GamePhase';
import {
	getIndexOfStoredMap,
	getLocalStoredMap,
	getLocalStoredMaps,
} from '../transfers/ProjectUtils';

export const App: React.FC = () => {
	const [[dimensionWidth, dimensionHeight], setDimensions] = useState([
		16, 16,
	]);
	const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.CONFIG);
	const [gameFieldInformation, setGameFieldInformation] =
		useState<TransferInterface>({
			globals: {
				width: null,
				height: null,

				mapName: null,

				pawnPositions: [],
			},
			specifics: {
				gameField: [],
			},
		});

	const upliftedIds: string[] = [];

	function getLocalCopy(): TransferInterface {
		const re: TransferInterface = {
			globals: {
				mapName: null,
				width: parseInt(upliftedIds[0]),
				height: parseInt(upliftedIds[1]),

				pawnPositions: JSON.parse(upliftedIds[2]) as pawn[],
			},
			specifics: {
				gameField: [],
			},
		};

		for (let i = 3; i < upliftedIds.length; i++) {
			const fieldType: FieldTypes =
				document.getElementById(upliftedIds[i]).className ===
				'Div-field--wall--hover'
					? FieldTypes.WALL
					: FieldTypes.PATH;

			re.specifics.gameField.push({
				id: upliftedIds[i],
				fieldType: fieldType,
				collected: false,
			});
		}
		return re;
	}

	function onSave() {
		const saveName = document.getElementById(
			'saveNameInput',
		) as HTMLInputElement;
		if (!saveName.value) {
			alert('Please enter a valid save name');
			return;
		}

		const insertNewSaveMap = getLocalCopy();
		insertNewSaveMap.globals.mapName = saveName.value;
		for (let i = 3; i < upliftedIds.length; i++) {
			const fieldType: FieldTypes =
				document.getElementById(upliftedIds[i]).className ===
				'Div-field--wall--hover'
					? FieldTypes.WALL
					: FieldTypes.PATH;

			insertNewSaveMap.specifics.gameField.push({
				id: upliftedIds[i],
				fieldType: fieldType,
				collected: false,
			});
		}

		const savedMaps = getLocalStoredMaps();
		const index = getIndexOfStoredMap(insertNewSaveMap);
		if (index !== -1) {
			savedMaps[index] = insertNewSaveMap;
		} else {
			savedMaps.push(insertNewSaveMap);
		}
		localStorage.setItem('savedMaps', JSON.stringify(savedMaps));

		setGameFieldInformation(insertNewSaveMap);
	}

	function listClickHandler(element: string) {
		setGameFieldInformation(getLocalStoredMap(element));
	}

	function applyDimensionsButtonClickHandler() {
		const width = (document.getElementById('width')! as HTMLInputElement)
			.value;
		const height = (document.getElementById('height')! as HTMLInputElement)
			.value;

		setDimensions([parseInt(width), parseInt(height)]);
	}

	function dragResetButtonClickHandler() {
		const old = getLocalCopy();
		old.globals.pawnPositions = [];
		setGameFieldInformation(old);
	}

	function createGameButtonClickHandler() {
		if (!gameFieldInformation.globals.mapName) {
			alert('No Map selected!');
			return;
		}
		setGamePhase(GamePhase.PLAY);
		new GameManager(gameFieldInformation);
	}

	return (
		<div className="Main">
			<DndProvider backend={HTML5Backend}>
				<GameField
					width={dimensionWidth}
					height={dimensionHeight}
					className="GameField"
					gamefieldInformation={gameFieldInformation}
					liftInformationUp={(e) => upliftedIds.push(e)}
					setGameFieldInformation={(e) => {
						const old = getLocalCopy();
						old.globals.pawnPositions = e.globals.pawnPositions;
						setGameFieldInformation(
							JSON.parse(JSON.stringify(old)),
						);
					}}
					gamePhase={gamePhase}
				/>
				{gamePhase === GamePhase.CONFIG && (
					<div className={'ConfigurationContainer'}>
						<div className={'ConfigurationContainer--Column'}>
							<Button
								className={'InputApplyButton'}
								onClick={applyDimensionsButtonClickHandler}
							>
								Apply
							</Button>

							<input
								className={'ConfigurationContainer--Input'}
								type={'number'}
								placeholder={'width'}
								id={'width'}
							/>
							<input
								className={'ConfigurationContainer--Input'}
								type={'number'}
								placeholder={'height'}
								id={'height'}
							/>
						</div>
						<div className={'ConfigurationContainer--Column'}>
							<Button
								onClick={onSave}
								className={'InputApplyButton'}
							>
								Save
							</Button>

							<input
								className={'ConfigurationContainer--Input'}
								placeholder="SaveName"
								id="saveNameInput"
								type="text"
							/>
						</div>

						<DragStartContainer
							className={'DraggableList'}
							gameFieldInformation={gameFieldInformation}
							resetButtonClick={dragResetButtonClickHandler}
						/>

						<List
							clickHandler={listClickHandler}
							className={'List'}
						/>
						<Button
							onClick={createGameButtonClickHandler}
							className={'CreateGameButton'}
						>
							Create Game
						</Button>
					</div>
				)}
			</DndProvider>
		</div>
	);
};
