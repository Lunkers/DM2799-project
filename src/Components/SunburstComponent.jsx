import { useD3 } from '../hooks/useD3';
import React, { component, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import categories from '../Data/tasks'

const transitionDuration = 900;

const SunburstComponent = ({widthHeightValue = 300, data}) => {

	const margin = { top: 50, right: 0, bottom: 0, left: 0 };
	const width = widthHeightValue - margin.left - margin.right - margin.top;
    const height = widthHeightValue - margin.top - margin.bottom;

    let d3Container = useRef(null);

    useEffect (( ) => {
    	    if(data && d3Container.current) {
    	    	data = Array.from(data, ([key, value]) => ({key,value}));

        		const radius = Math.min(width, height) / 2 ;

				d3.select(d3Container.current).selectAll('*').remove();
		    	const svg = d3.select(d3Container.current)
			  			.append("svg")
			    		.attr("width", width)
			    		.attr("height", height);

			    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			    const color = d3.scaleOrdinal()
		  						.domain(data.map(d => d.key))
		  						.range(["#204051", "#3B5070", "#675C88", "#996694", "#C97190","#ED8382","#FFA06F"])

		  		const pie = d3.pie().value(d => d.value)

		  		const arc = d3.arc()
		                .innerRadius(0)
		                .outerRadius(radius);

		        const arcData = pie(data);       
		        
		        const arcs = g.selectAll("path")
		                .data(arcData)
		                .join("path")
		                .attr("fill", d=>color(d.key))
		                .attr("stroke", "white")
		                .attr("d",arc);

		        const newarc = d3.arc()
		        				.innerRadius(2 * radius / 3)
		        				.outerRadius(radius);

		        arcs.append("text")
		        	.attr("transform", d => {
		        		return "translate(" + newarc.centroid(d) + ")";
		        	})
		        	.attr("text-anchor", "middle")
		        	.attr("fill", "white")
		        	.text(d => d.key);
    		}




    },[data, d3Container.current]);




	return (
  	<div id="sunBurst" ref={d3Container}>

  	</div>
  );
};

export default SunburstComponent;