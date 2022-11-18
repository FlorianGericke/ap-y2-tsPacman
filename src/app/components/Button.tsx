import React from "react";
import './../styles/index.scss';

interface Clickable{
    onClick: () => void;
    children: React.ReactNode
}
export const Button: React.FC<Clickable> = props => {
    return (
       <div className={'divButton'} onClick={props.onClick}>
           {props.children}
       </div>
    )
}