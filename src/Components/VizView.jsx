import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import BarChart from './BarChart';
import SunBurst from './SunburstComponent';

const VizComponent = () => {
    return(
        <div>
            <TimeContext.Consumer>
                {({getReportedTimesBasedOnTask}) => (
                    <>
                    <SunBurst data = {getReportedTimesBasedOnTask()} />
                    </>
                )}
            </TimeContext.Consumer>
        </div>
    )
} 

export default VizComponent;