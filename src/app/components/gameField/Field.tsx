import React, {useState} from 'react';
import './scss/Field.scss'


export const Field: React.FC<{id: string; size?: number }> = props => {
    const [isWall, setWall] = useState(true);

    let style = {}

    if (props.size) {
        style = {
            width: `${props.size}rem`,
            height: `${props.size}rem`,
        }
    }

    return (
        <div style={{backgroundColor: "black"}}>
            <div id={props.id} onClick={() => setWall(!isWall)}
                 className={isWall ? 'field--wall' : 'field--path'}
                 style={style}>
                {isWall ? 'w' : 'p'}
            </div>
        </div>
    )
}