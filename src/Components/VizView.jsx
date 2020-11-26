import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import BarChart from './BarChart';
import SunBurst from './SunburstComponent';
import LoadingBar from './LoadingBarComponent';
import './VizView.css'

const VizComponent = () => {
    return (
        <div>
            <h2>Visualizations</h2>
            <TimeContext.Consumer>
                {({ scheduled, reported, getReportedTimesBasedOnTask, getReportedAndScheduledReduced }) => (
                    <>
                        {(scheduled.length > 0 && reported.length > 0) ? (
                            <div className="viz-container">
                                <div className="pie-container">
                                    <SunBurst data={getReportedTimesBasedOnTask()} />
                                </div>
                                <div className="loading-container">
                                    <LoadingBar data={getReportedAndScheduledReduced()} />
                                </div>
                            </div>)
                            : (
                                <p>You need to schedule and report work to see charts!</p>
                            )}
                    </>
                )}
            </TimeContext.Consumer>
        </div>
    )
}

export default VizComponent;