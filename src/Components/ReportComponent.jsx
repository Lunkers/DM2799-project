import React, { useContext, useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import { Button, Calendar, Modal, Badge } from 'antd';
import { TimePicker, TreeSelect, Menu, Divider } from 'antd';
import tasks from '../Data/tasks';
import moment from 'moment';
import { TreeNode } from 'antd/lib/tree-select';
import { Prompt } from 'react-router-dom'

import './ReportComponent.css'
const { RangePicker } = TimePicker;
const { SubMenu } = Menu;
const format = "HH:mm";

const DropdownMenu = ({ onTreeChange, value }) => (
    <TreeSelect style={{ width: "100%" }} onChange={value => onTreeChange(value)} value={value}>
        {Object.keys(tasks).map(cat => (
            <TreeNode value={cat} title={cat} selectable={false}>
                {tasks[cat].map(task => (
                    <TreeNode value={task} title={task} />
                ))}
            </TreeNode>
        ))}
    </TreeSelect>
)

const ReportComponent = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reports, setReports] = useState([])
    const [rollingIdx, setRollingIdx] = useState(0);
    const { reported } = useContext(TimeContext);
    const onDateSelect = (date) => {
        setSelectedDate(date.toDate())
        setShowModal(true);
    }

    const onOk = () => {
        setShowModal(false)
    }

    const onCancel = () => {
        setShowModal(false)
    }

    const changeTaskTime = (id, startTime, endTime) => {
        const idx = reports.findIndex(report => report.id === id);
        const newReport = {
            ...reports[idx],
            startTime,
            endTime
        }
        let reportCopy = [...reports]
        reportCopy[idx] = newReport
        setReports(reportCopy)
    }

    const changeReportTask = (id, task) => {
        const idx = reports.findIndex(report => report.id === id);
        const newReport = {
            ...reports[idx],
            task: task
        }
        let reportCopy = [...reports]
        reportCopy[idx] = newReport
        setReports(reportCopy)
    }

    const getReportsFordate = (reports, date) => {
        const momentDate = moment(date)
        let reportsForDate = reports.filter(report => (report.startTime === null) || (moment(report.startTime).isSame(momentDate, 'day')))

        // if(reportsForDate.length === 0){
        //     const newReport = {id: rollingIdx+1, startTime: date, endTime: date}
        //     setReports([...reports, newReport])
        //     setRollingIdx(rollingIdx+1)
        //     reportsForDate = [newReport]
        // }
        return reportsForDate;
    }

    const onAddTask = (date) => {
        setReports([...reports, { id: rollingIdx + 1, startTime: date, endTime: date }])
        setRollingIdx(rollingIdx + 1);
    }

    const dateCellRender = (value) => {
        const reportsForDate = getReportsFordate([...reported, ...reports], value.toDate());
        reportsForDate.sort((a, b) => a.startTime - b.startTime)
        //if i sort in a lambda i won't need to write documentation, yeehaw!
        return (<ul className="events">
            {reportsForDate.map(report => <li >
                <div style={{ display: "block", backgroundColor: "green", color: "white", marginBottom: "0.05rem", borderRadius: "5%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {`${moment(report.startTime).format("HH:mm")}: ${report.task}`}
                </div>
                {/* <Badge text={`${moment(report.startTime).format("HH:mm")}: ${report.task}`} status={'success'}/> */}
            </li>)}
        </ul>
        )
    }

    return (<div>
        <div className="calendar-container">
            <h1>Time reporting</h1>
            <h3>Report your worked time here.</h3>
            <Prompt when={reports.length > 0} message="You have unsaved changes! Are you sure you want to leave?" />
            <TimeContext.Consumer>
                {({ reported, addReportedTime }) => (<>
                    <Calendar onSelect={onDateSelect} dateCellRender={dateCellRender} />
                    <Modal visible={showModal}
                        onCancel={onCancel}
                        onOk={onOk}
                    >
                        <h2>{selectedDate.toLocaleDateString()}</h2>
                        {getReportsFordate([...reported, ...reports], selectedDate).map(report => (
                            <>
                                <RangePicker format={format} style={{ width: "100%" }} onChange={(dates, garbage) => changeTaskTime(report.id, dates[0].toDate(), dates[1].toDate())}
                                    value={report.startTime ? [moment(report.startTime), moment(report.endTime)] : [null, null]} />
                                <DropdownMenu onTreeChange={value => changeReportTask(report.id, value)} value={report.task} />
                                <Divider />
                            </>
                        ))
                        }
                        <Button onClick={() => onAddTask(selectedDate)}>Add task</Button>
                    </Modal>
                    <Button className="fixed-button" type="primary" onClick={() => { addReportedTime(reports); setReports([]) }}>Save report</Button>
                </>
                )}
            </TimeContext.Consumer>
        </div>
    </div >
    );
}
export default ReportComponent;