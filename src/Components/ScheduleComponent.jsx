
import React, { useContext, useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import { Button, Divider } from 'antd'
import tasks from '../Data/tasks';
import TaskScheduleComponent from './TaskScheduleComponent';
import './ScheduleComponent.css';
import {
    UpOutlined,
    DownOutlined
} from '@ant-design/icons'

const ScheduleComponent = () => {
    const [hiddenState, setHiddenState] = useState(
        Object.keys(tasks).reduce((obj, category) => ({
            ...obj,
            [category]: false
        }), {})
    )

    return (<div>
        <div>
            <h2>What will you work on this week?</h2>
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
                                    <div className="category-name">
                                        <h2 >{category}</h2>
                                        <div onClick={() => setHiddenState({ ...hiddenState, [category]: !hiddenState[category] })}>
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
                                                    <strong>Planned Time</strong>
                                                </span>
                                            </div>
                                            {tasks[category].map(task => (
                                                <TaskScheduleComponent addTime={addScheduledTime} task={task} />
                                            ))}
                                        </div>)}
                                    <Divider />

                                </div>
                            ))}
                            <Button type="primary">Save Planning</Button>
                        </div>
                    </div>
                )}

            </TimeContext.Consumer>
        </div>
    </div >
    );
}
export default ScheduleComponent;