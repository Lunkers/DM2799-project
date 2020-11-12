import React, { useState } from 'react';
import tasks from '../Data/tasks';

export const TimeContext = React.createContext()

function TimeProvider(props) {
    //some default states for testing purposes
    const [scheduled, setScheduled] = useState([{
        startTime: new Date("2020-11-09T08:00"),
        endTime: new Date("2020-11-09T10:00"),
        quarters: 8,
        task: tasks.programming[1]
    }])
    const [reported, setReported] = useState([])

    const provided = {
        scheduled,
        reported,
        addScheduledTime: ({ startTime, endTime, task }) => {
            [startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
            const hours = (endTime - startTime) / 3.6e6 // get difference in hours between timestamps
            const quarters = hours * 4
            setScheduled([...scheduled, {
                startTime,
                endTime,
                quarters,
                task
            }])
        },
        addReportedTime: ({ startTime, endTime, task }) => {
            [startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
            const hours = (endTime - startTime) / 3.6e6 // get difference in hours between timestamps
            const quarters = hours / 4
            setReported([...reported, {
                startTime,
                endTime,
                quarters,
                task
            }])
        },
        removeScheduledTime: ({ startTime, endTime, task }) => {
            [startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
            setScheduled(scheduled.filter(time => !(time.startTime === startTime && time.endTime === endTime && time.task === task)))
        },
        removeReportedTime: ({ startTime, endTime, task }) => {
            [startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
            setScheduled(scheduled.filter(time => time.startTime === startTime && time.endTime === endTime && time.task === task))
        }

    };
    return (
        <TimeContext.Provider value={provided}>
            {props.children}
        </TimeContext.Provider>
    );
};

export default TimeProvider;