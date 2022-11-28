import React, {useState} from 'react';
import './scss/Field.scss'


export const Field: React.FC<{size?: number}> = props => {
    const [isWall, setWall] = useState(true);

    let style = {}

    if(props.size){
        style ={
            width: `${props.size}rem`,
            height: `${props.size}rem`,
        }
    }

    return (
        <div onClick={() => setWall(!isWall)}
            className={isWall? 'field--wall':'field--path'}
            style={style}>
            {isWall? 'w' : 'p'}
        </div>
    )
}