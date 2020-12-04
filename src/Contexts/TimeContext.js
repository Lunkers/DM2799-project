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
    const getTaskBasedScheduledAndReported =() => {
        const groupedScheduled = Object.fromEntries(d3.rollup(scheduled, v => d3.sum(v, d=>d.quarters), d => d.task))
        const groupedReported = Object.fromEntries(d3.rollup(reported, v => d3.sum(v, d=>d.quarters), d => d.task))
        const reportedOrScheduledTasks = new Set([...Object.keys(groupedReported), ...Object.keys(groupedScheduled)])
        
        const groupedCompArr = [...reportedOrScheduledTasks].map(v => ({
            task: v, 
            reported: groupedReported[v] ? groupedReported[v] : 0,
            scheduled: groupedScheduled[v] ? groupedScheduled[v] : 0
        }))
        console.log(groupedCompArr)
        return groupedCompArr
    }
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
            setReported(newReports)
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
        },
        getReportedAndScheduledReduced:() =>{
            const reportedSum = d3.sum(reported, r => r.quarters)
            const scheduledSum = d3.sum(scheduled, s => s.quarters)

            return {reported: {type: "Reported", quarters: reportedSum}, scheduled: {type: "Scheduled", quarters: scheduledSum}}
        },
        getTaskBasedScheduledAndReported:() => {
            const groupedScheduled = Object.fromEntries(d3.rollup(scheduled, v => d3.sum(v, d=>d.quarters), d => d.task))
            const groupedReported = Object.fromEntries(d3.rollup(reported, v => d3.sum(v, d=>d.quarters), d => d.task))
            const reportedOrScheduledTasks = new Set([...Object.keys(groupedReported), ...Object.keys(groupedScheduled)])
            
            const groupedCompArr = [...reportedOrScheduledTasks].map(v => ({
                task: v, 
                reported: groupedReported[v] ? groupedReported[v] : 0,
                scheduled: groupedScheduled[v] ? groupedScheduled[v] : 0
            }))
            return groupedCompArr
        },
        getCategoryGroupedTaskTimes:() => {
            let retObj = {
                "name": "categories",
                children: []
            }
            const taskCategories = Object.keys(tasks);

            //for some reason i can't reference the other function, I'll just copy paste to save time lmao
            const groupedReported = Object.fromEntries(d3.rollup(reported, v => d3.sum(v, d=>d.quarters), d => d.task))

            const groupedWithName = Object.keys(groupedReported).map(key => (
                {
                    name: key,
                    value: groupedReported[key],
                    children: []
                }
            ))
            // beautiful nested for-loop: O(n^3) is not dangerous
            taskCategories.map(category => {
                const tasksInCategory = tasks[category]
                
                const reportedInCategory = groupedWithName.filter(r => tasksInCategory.includes(r.name))
                const catRetObj = {
                    "name": category,
                    //"value": reportedInCategory ? d3.sum(reportedInCategory, report => report.value): 0,
                    "children": reportedInCategory
                } 
                console.log(reportedInCategory);
                if (catRetObj.children.length > 0) retObj.children = [...retObj.children, catRetObj]
            })
            console.log(retObj);
            return retObj;
        }

    };
    return (
        <TimeContext.Provider value={provided}>
            {props.children}
        </TimeContext.Provider>
    );
};

export default TimeProvider;