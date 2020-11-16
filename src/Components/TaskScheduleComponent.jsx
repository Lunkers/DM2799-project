import React, {useState} from 'react';
import './ScheduleComponent.css';
import {Input, Button} from 'antd';

const TaskScheduleComponent = ({addTime, task}) => {
    const [hours, setHours] = useState(0)

    return (
        <div className="schedule-task-container">
            
            <div>
                {task}
            </div>
            <div>
                <Input onChange={setHours} min={0} defaultValue={hours} style={{width:"5rem"}}/>
            </div>
            
        </div>
    )
}

export default TaskScheduleComponent;