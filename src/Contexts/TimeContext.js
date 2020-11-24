import React, { useState } from 'react';
import tasks from '../Data/tasks';
import moment from 'moment';
import * as d3 from 'd3';

export const TimeContext = React.createContext()

function TimeProvider(props) {
    //some default states for testing purposes
    const [scheduled, setScheduled] = useState([])
    const [reported, setReported] = useState([])
    const [index, setIndex] = useState(1);

    const provided = {
        scheduled,
        reported,
        addScheduledTime: (schedule) => {
            const scheduledWork = schedule.map(item => ({
                hours: item.hours,
                task: item.task,
                quarters: item.hours * 4
            }))
            setScheduled(scheduledWork) //overwrite at the moment, why the fuck not?
            //setIndex(index + 1);
        },
        addReportedTime: (reports) => {
            const newReports = reports.map(report => {
                //let [startTime, endTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime] //make sure earliest time is always first
                const startMoment = moment(report.startTime);
                const endMoment = moment(report.endTime);
                const duration = moment.duration(endMoment.diff(startMoment))
                const quarters = Math.round(duration.asHours() * 4)
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
        },
        getReportedTimesBasedOnTask:() => {
            // Get reported time grouped on a task basis
            const grouped = d3.rollup(reported, v => d3.sum(v, d=>d.quarters), d => d.task )
            console.log(grouped)
            return grouped;
        }

    };
    return (
        <TimeContext.Provider value={provided}>
            {props.children}
        </TimeContext.Provider>
    );
};

export default TimeProvider;