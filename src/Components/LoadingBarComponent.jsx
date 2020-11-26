import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const LoadingBarComponent = ({ data, stacked = false, text }) => {
    const width = 450
    const height = 80;
    const margin = { left: 10, right: 10, top: 5, bottom: 5 }
    const [smallerName, setSmallerName] = useState('')
    const [largerName, setLargerName] = useState('')

    let propData = [{ type: "Planned", quarters: 10 }, { type: "Reported", quarters: 8 }]
    let loadingBarContainer = useRef(null);

    //render the chart
    //we use useffect and ref to make d3 work
    useEffect(() => {
        //avoid null pointers
        if (data && loadingBarContainer.current) {
            console.log("drawing bar chart")
            data.sort((a, b) => b.quarters - a.quarters)
            //assign data correctly
            const largerData = [data[0]]
            setLargerName(data[0].type)
            setSmallerName(data[1].type)
            const smallerData = [data[1]]

            d3.select(loadingBarContainer.current).selectAll('*').remove()

            const svg = d3.select(loadingBarContainer.current)
                .append('svg')
                .attr("width", width)
                .attr("height", height)

            const scale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.quarters)])
                .range([margin.left, width - margin.right])

            console.log('drawing larger bar')
            const largerBar = svg.selectAll(null)
                .data(largerData)
                .enter()
                .append('rect')
                .attr('x', margin.left)
                .attr('y', margin.top)
                .attr('height', 75)
                .attr('width', d => scale(d.quarters))
                .attr('rx', 5)
                .attr('ry', 5)
                .style('fill', '#232931')

            const smallerBar = svg.selectAll(null)
                .data(smallerData)
                .enter()
                .append('rect')
                .attr('x', margin.left)
                .attr('y', margin.top)
                .attr('height', 75)
                .attr('width', d => scale(d.quarters))
                .attr('rx', 5)
                .attr('ry', 5)
                .style('fill', '#67A890')
            console.log('finished drawing')
            console.log('finished drawing')


        }
    }, [loadingBarContainer.current]);

    return (
        <div>
            <div className="loadingBar" ref={loadingBarContainer}>

            </div>
            <p>{smallerName} / {largerName}</p>
        </div>
    )

}

export default LoadingBarComponent;