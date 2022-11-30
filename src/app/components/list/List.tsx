import React from 'react';

interface Listable {
    className?: string;
}

export const List: React.FC<Listable> = props => {
    return (
        <div className={props.className}>

        </div>

    )
};