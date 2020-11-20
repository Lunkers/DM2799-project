import React, { useState } from 'react';
import tasks from '../Data/tasks';

export const TimeContext = React.createContext()

function TimeProvider(props) {
    //some default states for testing purposes
    const [scheduled, setScheduled] = useState([])
    const [reported, setReported] = useState([])
    const [index, setIndex] = useState(1);

    const provided = {
        scheduled,
        reported,
        addScheduledTime: ({ hours, task }) => {
            const quarters = hours * 4
            setScheduled([...scheduled, {
                quarters,
                task,
                id: index
            }])
            setIndex(index + 1);
        },
        addReportedTime: (reports) => {
            const newReports = reports.map(report => {
                //let [startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
                const hours = (report.endTime - report.startTime) / 3.6e6 // get difference in hours between timestamps
                const quarters = hours / 4
                report.quarters = quarters
                return report
            })
            //console.log(reported)
            console.log(newReports)
            setReported([...reported, ...reports])
        },
        removeScheduledTime: ({ id }) => {
            //[startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
            setScheduled(scheduled.filter(time => !(time.id === id)))
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