import { timeSaturday } from 'd3';
import React, { useContext, useState } from 'react';
import TimeProvider, { TimeContext } from '../Contexts/TimeContext';

const ScheduleComponent = () => {

    return (<div>
        <div>
            <h2>Schedule your week!</h2>
            <p>IVIS21</p>
            <TimeContext.Consumer>
                {({ scheduled, addScheduledTime, removeScheduledTime }) => (
                    <div>
                        {
                            scheduled.map(scheduleTime => (<div>
                                <p>{scheduleTime.task}</p>
                                <p>{scheduleTime.startTime.toTimeString()} - {scheduleTime.endTime.toTimeString()}</p>
                                <p>{scheduleTime.quarters} quarters.</p>
                                <button onClick={() => removeScheduledTime({ startTime: scheduleTime.startTime, endTime: scheduleTime.endTime, task: scheduleTime.task })}>Remove task from schedule</button>
                            </div>))}
                        <button onClick={() => {
                            const startTime = new Date() //init to now
                            const endTime = new Date()
                            endTime.setHours(startTime.getHours() + 1)
                            addScheduledTime({ startTime, endTime, task: "Created Slides" })
                        }}>Add time to schedule</button>
                    </div>
                )}

            </TimeContext.Consumer>
        </div>
    </div >
    );
}
export default ScheduleComponent;