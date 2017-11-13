import React from 'react';
import _ from 'lodash';
import { Number } from './Number.jsx';


export const Numbers = (props) => {
    const getClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }

        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };

    return (
        <div className="numbers text-center">
            {Numbers.list.map((number, i) =>
                <Number key={i}
                        value={number}
                        className={getClassName(number)}
                        onClickHandler={props.selectNumber} />
            )}
        </div>
    );
};

Numbers.list = _.range(1, 10);