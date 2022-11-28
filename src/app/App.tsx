import React from 'react';
import {GameField} from "./components/gameField/GameField";
import './styles/scss/App.scss';

export const App: React.FC = () => {
    return (
        <>
            <GameField   height={20} width={20} className={'GameField'}/>
        </>
    );
}