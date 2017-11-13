import React from 'react';


export const Number = (props) => {
    return (
        <span className={props.className}
              onClick={() => props.onClickHandler(props.value)}>
    	    {props.value}
        </span>
    );
};