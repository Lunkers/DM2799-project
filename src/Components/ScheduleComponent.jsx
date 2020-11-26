
import React, { useContext, useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import { Button, Divider, Table } from 'antd'
import tasks from '../Data/tasks';
import TaskScheduleComponent from './TaskScheduleComponent';
import './ScheduleComponent.css';
import {
    UpOutlined,
    DownOutlined
} from '@ant-design/icons'

const ScheduleComponent = () => {
    const {scheduled} = useContext(TimeContext)
    const [localScheduled, setLocalScheduled] = useState(scheduled)
    const [hiddenState, setHiddenState] = useState(
        Object.keys(tasks).reduce((obj, category) => ({
            ...obj,
            [category]: false
        }), {})
    )

    const deliverables = [
        {
            key: '1',
            name: 'Visualizing Group Matching',
            grade: "10%",
            type: "Individual",
            dueDate: "Jan 20"
        },
        {
            key: '2',
            name: 'World values survey visualization',
            grade: "30%",
            type: "Individual",
            dueDate: "Jan 29"
        },
        {
            key: '3',
            name: 'Project proposal',
            grade: "10%",
            type: "Group",
            dueDate: "Feb 8"
        },
        {
            key: '4',
            name: 'Hello world demo',
            grade: "15%",
            type: "Group",
            dueDate: "Feb 14"
        }
    ]

    const columns = [
        {
            title: "Assignment",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Grade %",
            dataIndex: "grade",
            key: "grade"
        },
        {
            title: "Due date",
            dataIndex: "dueDate",
            key: "dueDate"
        }
    ]

    const onChangeSchedule = (task, hours) => {
        const index = localScheduled.findIndex(item => item.task === task)
        console.log(index)
        if (index >= 0) {
            //task is already scheduled, change it
            const newScheduleItem = {
                ...localScheduled[index],
                hours: hours
            }
            let scheduleCopy = [...localScheduled]
            scheduleCopy[index] = newScheduleItem
            setLocalScheduled(scheduleCopy)
        }
        else {
            const newScheduleItem = {
                hours: hours,
                task: task
            }
            setLocalScheduled([...localScheduled, newScheduleItem])
        }
    }

    const getScheduledTimeForTask = (task, scheduledTimes) => {
        const scheduledObj = scheduledTimes.find(time => time.task === task)
        return scheduledObj ? scheduledObj.hours : 0
    }


    return (<div>
        <div className="container">
            <div className="schedule-container">
                <h3>Plan your learning for the week</h3>
                <TimeContext.Consumer>
                    {({ scheduled, addScheduledTime, removeScheduledTime }) => (
                        <div>
                            {
                                // scheduled.map(scheduleTime => (<div>
                                //     <p>{scheduleTime.task}</p>
                                //     <p>{scheduleTime.quarters} quarters.</p>
                                //     <button onClick={() => removeScheduledTime({id: scheduleTime.id})}>Remove task from schedule</button>
                                // </div>))
                            }
                            <div>
                                {Object.keys(tasks).map(category => (
                                    <div className="planner-container">
                                        <div className="category-name" onClick={() => setHiddenState({ ...hiddenState, [category]: !hiddenState[category] })}>
                                            <h2 >{category}</h2>
                                            <div >
                                                {hiddenState[category] ? <UpOutlined /> : <DownOutlined />}
                                            </div>
                                        </div>
                                        { hiddenState[category] && (
                                            <div>
                                                <div className="schedule-task-container">
                                                    <span>
                                                        <strong>Task</strong>
                                                    </span>
                                                    <span>
                                                        <strong>Planned Time (Hours)</strong>
                                                    </span>
                                                </div>
                                                {tasks[category].map(task => (
                                                    <TaskScheduleComponent addTime={onChangeSchedule} task={task} inputHours={getScheduledTimeForTask(task, scheduled)} />
                                                ))}
                                            </div>)}
                                        <Divider />

                                    </div>
                                ))}
                                <Button type="primary" onClick={() => addScheduledTime(localScheduled)}>Save Planning</Button>
                            </div>
                        </div>
                    )}

                </TimeContext.Consumer>
            </div>
            <div className="deliverables-container">
                <h3>Course assignments</h3>
                <Table dataSource={deliverables} columns={columns} />
            </div>
        </div>
    </div >
    );
}
export default ScheduleComponent;