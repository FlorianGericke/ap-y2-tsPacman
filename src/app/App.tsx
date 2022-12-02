import React, { useState } from 'react';
import { GameField } from './components/gameField/GameField';
import './styles/scss/App.scss';
import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { TransferInterface } from '../transfers/TransferInterface';
import { FieldTypes } from '../game/field/FieldTypes';
import { GameManager } from '../game/gameManager/GameManager';

export const App: React.FC = () => {
	const [gameFieldInformation, setGameFieldInformation] =
		useState<TransferInterface>({
			globals: {
				width: null,
				height: null,

				mapName: null,

				playerPostion: null,
				ghostPositions: null,
			},
			specifics: {
				gameField: [],
			},
		});

	const upliftedIds: string[] = [];

	function onSave() {
		const saveName = document.getElementById(
			'saveNameInput',
		) as HTMLInputElement;
		if (!saveName.value) {
			alert('Please enter a valid save name');
			return;
		}

		const insertNewSaveMap: TransferInterface = {
			globals: {
				mapName: saveName.value,
				width: parseInt(upliftedIds[0]),
				height: parseInt(upliftedIds[1]),
			},
			specifics: {
				gameField: [],
			},
		};

		for (let i = 2; i < upliftedIds.length; i++) {
			const fieldType: FieldTypes =
				document.getElementById(upliftedIds[i]).className ===
				'Div-field--wall'
					? FieldTypes.WALL
					: FieldTypes.PATH;

			insertNewSaveMap.specifics.gameField.push({
				id: upliftedIds[i],
				fieldType: fieldType,
				collected: false,
			});
		}

		const localStorageValue: string | null =
			localStorage.getItem('savedMaps');

		const savedMaps: TransferInterface[] = localStorageValue
			? (JSON.parse(localStorageValue) as TransferInterface[])
			: (JSON.parse('[]') as TransferInterface[]);

		const index = savedMaps.findIndex((map) => {
			return map.globals.mapName === insertNewSaveMap.globals.mapName;
		});

		if (index !== -1) {
			savedMaps[index] = insertNewSaveMap;
		} else {
			savedMaps.push(insertNewSaveMap);
		}
		localStorage.setItem('savedMaps', JSON.stringify(savedMaps));

		setGameFieldInformation(insertNewSaveMap);
	}

	function listClickHandler(element: string) {
		console.log(element);
		const localStorageValue: string | null =
			localStorage.getItem('savedMaps');

		const savedMaps: TransferInterface[] = localStorageValue
			? (JSON.parse(localStorageValue) as TransferInterface[])
			: (JSON.parse('[]') as TransferInterface[]);

		const i = savedMaps.find((map) => map.globals.mapName === element);

		setGameFieldInformation(i);
	}

	return (
		<div className="Main">
			<GameField
				width={16}
				height={16}
				className="GameField"
				gamefieldInformation={gameFieldInformation}
				liftInformationUp={(e) => upliftedIds.push(e)}
			/>
			<div style={{ marginLeft: '20px' }}>
				<div
					style={{
						display: 'flex',
					}}
				>
					<Button onClick={onSave} className="Button">
						Save
					</Button>

					<input
						style={{ marginLeft: '15px' }}
						placeholder="SaveName"
						id="saveNameInput"
						type="text"
					/>
				</div>
				<List
					clickHandler={(element) => listClickHandler(element)}
					className={'List'}
				/>
				<Button
					onClick={() => {
						new GameManager(gameFieldInformation);
					}}
					className={'CreateGameButton'}
				>
					Create Game
				</Button>
			</div>
		</div>
	);
};
