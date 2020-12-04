import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const LoadingBarComponent = ({ data, stacked = false, text }) => {
    const width = 450
    const height = 100;
    const margin = { left: 10, right: 10, top: 10, bottom: 10 }
    const [smallerName, setSmallerName] = useState('')
    const [largerName, setLargerName] = useState('')

    let propData = [{ type: "Planned", quarters: 10 }, { type: "Reported", quarters: 8 }]
    let loadingBarContainer = useRef(null);

    //render the chart
    //we use useffect and ref to make d3 work
    useEffect(() => {
        //avoid null pointers
        if (data && loadingBarContainer.current) {
            const scheduledData = data.scheduled;
            const reportedData = data.reported

            d3.select(loadingBarContainer.current).selectAll('*').remove()

            const svg = d3.select(loadingBarContainer.current)
                .append('svg')
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr("transform", `translate(${margin.left}, 0)`)
            

            const scale = d3.scaleLinear()
                .domain([0, d3.max([scheduledData, reportedData])]).nice()
                .range([0, width - margin.right - margin.left])

            console.log(scale(scale.domain()[1]))
            console.log('drawing larger bar')
            const backgroundBar = svg
                .data([scheduledData])
                .append('rect')
                .attr("class", "background-rect")
                .attr('x', scale(0))
                .attr('y', margin.top)
                .attr('height', height -  2 * margin.bottom - margin.top)
                .attr('width', d => scale(d))
                .style('fill', '#232931')

            const smallerBar = svg.selectAll(null)
                .data([reportedData])
                .enter()
                .append('rect')
                .attr('x', scale(0))
                .attr('y', margin.top)
                .attr('height', height - 2*margin.bottom - margin.top)
                .attr('width', d => scale(d))
                .style('fill', '#A9D198')

            console.log(scale(reportedData))
            const axis = d3.axisBottom(scale)
            console.log(scale.ticks().map(t => t/4))
            axis.tickFormat(t => t % 4 == 0 ? t / 4 : "" )
            
            const drawnLine = svg.append('line')
            .attr('x1', scale(scheduledData))
            .attr('x2', scale(scheduledData))
            .attr('y1', height - 2 * margin.bottom)
            .attr('y2', margin.top)
            .attr('stroke', () => scheduledData > reportedData ? 'red' : 'green')
            .attr('stroke-width', 2)

            const drawnAxis = svg.append('g')
            .attr('transform', `translate(${0}, ${height -  2* margin.bottom})`)
            .call(axis)

        }
    }, [loadingBarContainer.current]);

    return (
        <div>
            <div className="loadingBar" ref={loadingBarContainer}>

            </div>
        </div>
    )

}

export default LoadingBarComponent;