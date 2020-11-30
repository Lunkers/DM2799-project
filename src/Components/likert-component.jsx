import React, { useState } from 'react';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import './likert-component.css';
import { color } from 'd3';

const LikertScaleComponent = ({ onChange, question, score }) => {
    const [selected, setSelected] = useState(score);
    return (
        <div className="likert-container">
            <h3>{question}</h3>
            <div className="emoji-container">
                <FrownOutlined style={{ fontSize: "2rem",  color:selected === -1 ? "#005ccc": "#000"}} onClick={() => {
                    onChange(-1)
                    setSelected(-1)}}/>
                <MehOutlined style={{ fontSize: "2rem" , color:selected === 0 ? "#005ccc": "#000"}}  onClick={() => {
                    onChange(0)
                    setSelected(0)}}/>
                <SmileOutlined style={{ fontSize: "2rem", color:selected === 1 ? "#005ccc": "#000"}}  onClick={() => {
                    onChange(1)
                    setSelected(1)}}/>
            </div>
        </div>
    )
}

export default LikertScaleComponent;