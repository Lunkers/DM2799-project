import { useD3 } from '../hooks/useD3';
import React, { component, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SunburstComponent = ({data}) => {
	const width = 450;
    const height = 450;
    const margin = { top: 40, right: 60, bottom: 60, left: 80 };

    let d3Container = useRef(null);

    useEffect (( ) => {
    	    if(data && d3Container.current) {
    	    	data = Array.from(data, ([key, value]) => ({key,value}));
    	    	console.log(data);

        		const radius = Math.min(width, height) / 2 ;

        		console.log(radius);
		    	const svg = d3.select(d3Container.current)
			  			.append("svg")
			    		.attr("width", width)
			    		.attr("height", height);

			    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			    const color = d3.scaleOrdinal()
		  						.domain(data.map(d => d.key))
		  						.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

		  		const pie = d3.pie().value(d => d.value)

		  		const arc = d3.arc()
		                .innerRadius(0)
		                .outerRadius(radius);

		        const arcData = pie(data);       
		        
		        const arcs = g.selectAll("path")
		                .data(arcData)
		                .join("path")
		                .attr("fill", d=>color(d.key))
		                .attr("d",arc);
    		}




    },[data, d3Container.current]);




	return (
  	<div id="sunBurst" ref={d3Container}>

  	</div>
  );
};

export default SunburstComponent;