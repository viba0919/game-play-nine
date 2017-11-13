import React from 'react';
import _ from 'lodash';
import { Icon } from './Icon.jsx';


export const Stars = (props) => {
    return (
        <div>
            {_.range(props.numberOfStars).map(i =>
                <Icon key={i} className='fa-star' />
            )}
        </div>
    );
};