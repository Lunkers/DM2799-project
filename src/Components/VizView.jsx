import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';

const VizComponent = () => {
    return(
        <div>
            <h2>Visualizations should go here</h2>
            <div>
                <p>Here we can visualize task distribution</p>
            </div>
            <div>
                <p>Here we could show discrepancy between scheduled time and reported time?</p>
            </div>
            <div>
                <p>Maybe a progress chart here?</p>
            </div>
        </div>
    )
} 

export default VizComponent;