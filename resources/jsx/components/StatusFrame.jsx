import React from 'react';


export const StatusFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <br />
            <button className="btn btn-success"
                    onClick={props.resetGame}>
                Play Again!
            </button>
        </div>
    );
};