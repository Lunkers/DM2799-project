import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';

const VizComponent = () => {
    return(
        <div>
            <TimeContext.Consumer>
                {({getReportedTimesBasedOnTask}) => (
                    <>
                    {getReportedTimesBasedOnTask()}
                    </>
                )}
            </TimeContext.Consumer>
        </div>
    )
} 

export default VizComponent;