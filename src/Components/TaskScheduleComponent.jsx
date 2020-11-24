import React, {useState} from 'react';
import './ScheduleComponent.css';
import {Input, Button} from 'antd';

const TaskScheduleComponent = ({addTime, task, inputHours}) => {
    const [hours, setHours] = useState(inputHours)

    return (
        <div className="schedule-task-container">
            
            <div>
                {task}
            </div>
            <div>
                <Input onChange={(e) => {
                    setHours(e.target.value)
                    addTime(task, e.target.value)
                }} min={0} defaultValue={hours} style={{width:"5rem"}}/>
            </div>
            
        </div>
    )
}

export default TaskScheduleComponent;