import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import BarChart from './BarChart';
import SunBurst from './SunburstComponent';
import LoadingBar from './LoadingBarComponent';
import './VizView.css'
import { Divider } from 'antd';

const VizComponent = () => {
    return (
        <div>
            <h1>Visualizations</h1>
            <TimeContext.Consumer>
                {({ scheduled, reported, getReportedTimesBasedOnTask, getCategoryGroupedTaskTimes, getTaskBasedScheduledAndReported }) => (
                    <>
                        {(scheduled.length > 0 && reported.length > 0) ? (
                            <div className="viz-container">
                                
                                <div className="pie-container">
                                    <h2>Task Distribution</h2>
                                    <SunBurst data={getCategoryGroupedTaskTimes()} widthHeightValue={400} />
                                </div>
                                <div className="loading-container">
                                    <h2>Time worked (hours)</h2>
                                    {getTaskBasedScheduledAndReported().map(report => (
                                        <>
                                        <p><strong>
                                            {report.task}
                                            </strong></p>
                                        <LoadingBar data={report}/>
                                        <Divider/>
                                        </>
                                    ))}
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