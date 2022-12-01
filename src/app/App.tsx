import React, { useState } from 'react';
import { GameField } from './components/gameField/GameField';
import './styles/scss/App.scss';
import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { GameManager } from '../game/gameManager/GameManager';
import { ghostPosition } from '../transfers/Types';
import { FieldTypes } from '../game/field/FieldTypes';

export type FieldableTemp = {
	mapName: string;
	width: string;
	height: string;
	fields: string[][];
};

export const App: React.FC = () => {
	const [gameFieldInformation, setGameFieldInformation] =
		useState<FieldableTemp>({
			mapName: '-1',
			width: '-1',
			height: '-1',
			fields: [],
		});
	const fieldInformation: string[] = [];

	function updateHandler(e: string) {
		fieldInformation.push(e);
	}

	function onSave() {
		const saveName = document.getElementById(
			'saveNameInput',
		) as HTMLInputElement;
		if (!saveName.value) {
			alert('Please enter a valid save name');
			return;
		}

		const gamefieldInformation: FieldableTemp = {
			mapName: saveName.value,
			width: fieldInformation[0],
			height: fieldInformation[1],
			fields: [],
		};

		const fields: string[][] = [];
		for (let i = 2; i < fieldInformation.length; i++) {
			fields.push([
				fieldInformation[i],
				document.getElementById(fieldInformation[i])!.className,
			]);
		}
		gamefieldInformation.fields = fields;

		let savedMaps: FieldableTemp[] | string | null =
			localStorage.getItem('savedMaps');

		if (!savedMaps) {
			savedMaps = '[]';
		}

		savedMaps = JSON.parse(savedMaps) as [];

		const index = savedMaps.findIndex(
			(field) => field.mapName === gamefieldInformation.mapName,
		);

		if (index !== -1) {
			savedMaps[index] = gamefieldInformation;
		} else {
			savedMaps.push(gamefieldInformation);
		}
		localStorage.setItem('savedMaps', JSON.stringify(savedMaps));
		setGameFieldInformation(gamefieldInformation);
	}
	return (
		<div className="Main">
			<GameField
				updateFieldInformation={updateHandler}
				width={4}
				height={4}
				className="GameField"
				gamefieldInformation={gameFieldInformation}
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
					clickHandler={(element) => {
						let savedMaps: FieldableTemp[] | string | null =
							localStorage.getItem('savedMaps');

						if (savedMaps) {
							savedMaps = JSON.parse(savedMaps) as [];

							const i = savedMaps.find(
								(map) => map.mapName === element,
							);

							setGameFieldInformation(i!);
						}
					}}
					className={'List'}
				/>
				<Button
					onClick={() => {
						new GameManager({
							globals: {
								width: 4,
								height: 4,

								playerPostion: null,
								ghostPositions: null,
							},
							specifics: {
								gameField: [
									{
										id: '0000',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0100',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0200',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0300',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0001',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0101',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0201',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0301',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0002',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0102',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0202',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0302',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0003',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0103',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
									{
										id: '0203',
										fieldType: FieldTypes.PATH,
										collected: false,
									},
									{
										id: '0303',
										fieldType: FieldTypes.WALL,
										collected: false,
									},
								],
							},
						});
					}}
					className={'CreateGameButton'}
				>
					Create Game
				</Button>
			</div>
		</div>
	);
};
