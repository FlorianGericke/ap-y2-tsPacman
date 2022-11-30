import React from 'react';
import { GameField } from './components/gameField/GameField';
import './styles/scss/App.scss';
import { Button } from './components/button/Button';
import { List } from './components/list/List';

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

	type Fielddable = {
		mapName: string;
		width: string;
		height: string;
		fields: string[][];
	};

	const gamefieldInformation: Fielddable = {
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

	let savedMaps: Fielddable[] | string | null =
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
}

export const App: React.FC = () => (
	<div className="Main">
		<GameField
			updateFieldInformation={updateHandler}
			width={20}
			height={20}
			className="GameField"
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
			<List className={'List'} />
		</div>
	</div>
);
