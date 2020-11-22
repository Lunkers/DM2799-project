import { useD3 } from '../hooks/useD3';
import React, { component, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function SunburstComponent({ data }) {
  const ref = useD3(
    (svg) => {
    	const width = 450;
    	const height = 450;
    	const margin = { top: 40, right: 60, bottom: 60, left: 80 };;

    	const radius = Math.min(width, height) / 2 - margin;

    	svg = d3.select("#my_dataviz")
	  			.append("svg")
	    		.attr("width", width)
	    		.attr("height", height);

	    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	    const color = d3.scaleOrdinal()
  						.domain(data)
  						.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

  		const pie = d3.pie();

  		const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

        const arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc")

  		arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

	   },
	   [data]
	); 

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
    		<g className="#my_dataviz" />
    </svg>
  );
}

export default SunburstComponent;