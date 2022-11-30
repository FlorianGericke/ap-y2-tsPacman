import React from 'react';
import {GameField} from "./components/gameField/GameField";
import './styles/scss/App.scss';
import {Button} from "./components/button/Button";


const fieldInformation: string[] = [];

function updateHandler(e: string) {
    fieldInformation.push(e);
}

function onSave() {
    let saveName = document.getElementById('saveNameInput') as HTMLInputElement;
    if(!saveName.value) {
        alert('Please enter a valid save name');
        return;
    }
    let GamefieldInformation = {
        saveName: saveName.value,
        width: fieldInformation[0],
        height: fieldInformation[1],
    }
    for (let i = 2; i < fieldInformation.length; i++) {
        let insert = JSON.parse(`{"${fieldInformation[i]}":"${document.getElementById(fieldInformation[i])!.className}"}`);
        GamefieldInformation = Object.assign(GamefieldInformation, insert);
    }

    localStorage.setItem(saveName.value, JSON.stringify(GamefieldInformation));
}

export const App: React.FC = () => {
    return (
        <div className={'Main'}>
            <GameField updateFieldInformation={updateHandler}  width={20} height={20}  className={'GameField'}/>
            <div style={{display: "flex", height: "fit-content"}}>
                <Button  onClick={onSave}  className={'Button'}> Save </Button>
                <input style={{marginLeft: '15px'}} placeholder={'SaveName'} id={'saveNameInput'} type={'text'}/>
            </div>
        </div>
    )
}