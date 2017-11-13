import React from 'react';
import { Icon } from './Icon.jsx';


export const ButtonGroup = (props) => {
    let button;

    switch(props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success"
                        onClick={props.acceptAnswer} >
                    <Icon className='fa-check' />
                </button>
            break;
        case false:
            button =
                <button className="btn btn-danger">
                    <Icon className='fa-times' />
                </button>
            break;
        default:
            button =
                <button className="btn"
                        onClick={props.checkAnswer}
                        disabled={props.selectedNumbers.length === 0} >
                    <Icon className='fa-navicon' />
                </button>
            break;
    }

    return (
        <div className="text-center">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm"
                    onClick={props.redraw}
                    disabled={props.redraws === 0} >
                <Icon className='fa-refresh' />&nbsp;&nbsp;
                {props.redraws}
            </button>
        </div>
    );
};