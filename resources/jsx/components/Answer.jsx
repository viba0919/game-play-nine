import React from 'react';
import { Number } from './Number.jsx';


export const Answer = (props) => {
    return (
        <div>
            {props.numbers.map((number, i) =>
                <Number key={i}
                        value={number}
                        onClickHandler={props.unselectNumber} />
            )}
        </div>
    );
};