import React, { useContext, useEffect, useState } from 'react';
import { TimeContext } from '../Contexts/TimeContext';
import { Button, Calendar, Modal, message } from 'antd';
import { TimePicker, TreeSelect, Menu, Divider } from 'antd';
import tasks from '../Data/tasks';
import moment from 'moment';
import { TreeNode } from 'antd/lib/tree-select';
import { Prompt } from 'react-router-dom'
import LikertScale from './likert-component';

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
    const { reported, addReportedTime } = useContext(TimeContext);
    const onDateSelect = (date) => {
        setSelectedDate(date.toDate())
        setShowModal(true);
    }

    useEffect(() => {
        const reportedWithId = reported.map((report, idx) => ({ ...report, id: idx }))
        setRollingIdx(reported.length);
        setReports(reportedWithId);
    }, [reported])

    const onOk = () => {
        addReportedTime(reports);
        message.success("Report was saved!")
        setReports([])
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

    const changeReportReflection = (id, score) => {
        const idx = reports.findIndex(report => report.id === id);
        const newReport = {
            ...reports[idx],
            score
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
        const reportsForDate = getReportsFordate([...reports], value.toDate());
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

    return (<div className="report-component-container">
        <div className="calendar-container">
            <h1>Time reporting</h1>
            <h3>Report your worked time here.</h3>
            <TimeContext.Consumer>
                {({ reported, addReportedTime }) => (<>
                    <Calendar onSelect={onDateSelect} dateCellRender={dateCellRender} />
                    <Modal visible={showModal}
                        onCancel={onCancel}
                        onOk={onOk}
                    >
                        <h2>{selectedDate.toLocaleDateString()}</h2>
                        {getReportsFordate([...reports], selectedDate).map(report => (
                            <>
                                <RangePicker format={format} style={{ width: "100%" }} onChange={(dates, garbage) => changeTaskTime(report.id, dates[0].toDate(), dates[1].toDate())}
                                    value={[moment(report.startTime), moment(report.endTime)]} />
                                <DropdownMenu onTreeChange={value => changeReportTask(report.id, value)} value={report.task} />
                                <Divider />
                                <LikertScale question={"How did it go?"} onChange={(score) => changeReportReflection(report.id, score )} score={report.score}/>
                                <Divider />
                            </>
                        ))
                        }
                        <Button onClick={() => onAddTask(selectedDate)}>Add task</Button>
                    </Modal>
                </>
                )}
            </TimeContext.Consumer>
        </div>
        <Divider type="vertical" className="vert-divider" />
        <div className="report-info">
            <h1>How to use:</h1>
            <ul>
                <li>
                    Click on a date in the calendar
                    </li>
                <li>
                    Report what times you worked on different learning tasks
                    </li>
                <li>
                    Click "Ok" to save your report
                    </li>
            </ul>
        </div>
    </div >
    );
}
export default ReportComponent;