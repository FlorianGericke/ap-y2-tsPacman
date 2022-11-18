import React from 'react';
import {Button} from "./components/Button";

export const App: React.FC = () => (
    <>
     <h1>Hello React</h1>
        <Button onClick={() => alert('Clicked')}>Click me please</Button>
    </>
);