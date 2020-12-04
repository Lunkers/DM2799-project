import { useD3 } from '../hooks/useD3';
import React, { component, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import tasks from '../Data/tasks'

const transitionDuration = 900;

const SunburstComponent = ({widthHeightValue = 600, data}) => {

	  const margin = { top: 10, right: 0, bottom: 0, left: 0 };
	  const width = widthHeightValue - margin.left - margin.right - margin.top;
    const height = widthHeightValue - margin.top - margin.bottom;

    let d3Container = useRef(null);

    useEffect (( ) => {
    	    if(data && d3Container.current) {

			    // constiables
			    const radius = Math.min(width, height) / 2 ;
			    const color = d3.scaleOrdinal(["#232931","#32505C","#417B7D","#67A890","#A9D198","#FFF5A5"]);

			    // Create primary <g> element
			    d3.select(d3Container.current).selectAll('*').remove();
			    const svg = d3.select(d3Container.current)
			  			.append("svg")
			    		.attr("width", width)
			    		.attr("height", height);

			    const g = svg.append('g')
			        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

			    // Data strucure
			    const partition = d3.partition()
			        .size([2 * Math.PI, radius]);

			    // Find data root
			    const dataroot = d3.hierarchy(data)
			        .sum(function (d) { return d.value});

			    // size arcs
			    partition(dataroot);
			    const arc = d3.arc()
			        .startAngle(function (d) { return d.x0 })
			        .endAngle(function (d) { return d.x1 })
			        .innerRadius(function (d) { return d.y0 })
			        .outerRadius(function (d) { return d.y1 });

     			console.log(dataroot.descendants());

			    // Put it all together
			    g.selectAll('g')
			        .data(dataroot.descendants())
			        .enter().append('g').attr('class','node')
			        .append('path')
			        .attr("display", function (d) { return d.depth ? null : "none"; })
			        .attr("d", arc)
			        .style('stroke', '#fff')
			        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })

			        .on('mouseenter', function (d, i) {
          				d3.select(this).transition()
               				.duration('50')
               				.attr('opacity', '.85');
                  var name;
                  var sum;
                  console.log(i.data);
                  if(i.data.children.length > 0) { sum = (i.data.children ? d3.sum(i.data.children, sum => sum.value): 0); name = i.data.name; }
                  else { sum = i.data.value; name = i.parent.data.name; }
                  d3.selectAll(".center_text_title").text(name)
                        .style("font-size", "15px")
                        .style("font-weight", 400);
                  d3.selectAll(".center_text").text(sum / 4 + "h")
                        .style("font-size", "30px")
                        .style("font-weight", 750);
     				})

     				.on('mouseleave', function (d, i) {
          				d3.select(this).transition()
               				.duration('50')
               				.attr('opacity', '1');
                  d3.selectAll(".center_text").text("");
                  d3.selectAll(".center_text_title").text("");
    				});

			    g.selectAll(".node")
    				.append("text")
    				.attr("transform", function(d) {
        				return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
    				.attr("dx", "0")
    				.attr("dy", ".5em")
    				.style("text-anchor", "middle")
    				.text(function(d) { return d.parent ? d.data.name : "" });

          g.selectAll("g")
            .append("text")
            .attr('class', 'center_text')
            .style("text-anchor", "middle")
            .attr('y', 20)
            .text("");

          g.selectAll("g")
            .append("text")
            .attr('class', 'center_text_title')
            .style("text-anchor", "middle")
            .attr('y', -20)
            .text("");

    			function computeTextRotation(d) {
        			const angle = (d.x0 + d.x1) / Math.PI * 90;
        			return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
    			}
    		}
    },[data, d3Container.current]);




	return (
  	<div id="sunBurst" ref={d3Container}>

  	</div>
  );
};

export default SunburstComponent;