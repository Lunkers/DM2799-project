import { useD3 } from '../hooks/useD3';
import React, { component, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import tasks from '../Data/tasks'

const categoriesByTask = Object.fromEntries(
  Object
    .entries(tasks)
    .flatMap(([category, categoryTasks]) => categoryTasks.map(categoryTask => [category, []]))
);

const transitionDuration = 900;

const SunburstComponent = ({widthHeightValue = 300, data}) => {

	const margin = { top: 50, right: 0, bottom: 0, left: 0 };
	const width = widthHeightValue - margin.left - margin.right - margin.top;
    const height = widthHeightValue - margin.top - margin.bottom;

    data = Array.from(data, ([key, value]) => ({key,value}));

    /*data = data.map(d => {
    	const container = {}

    	container.key = d.key;
    	container.value = d.value;
    	container.category = categoriesByTask[d.key];
    	container.children = [];

    	return container;
    });

    /*let root;
    categoriesByTask.forEach(el => {
 		 // Handle the root element
  		if (el.category === null) {
    		root = el;
    		return;
  		}
  		// Use our mapping to locate the parent element in our data array
  		const parentEl = data[idMapping[el.category]];
  		// Add our current el to its parent's `children` array
  		parentEl.children = [...(parentEl.children || []), el];
	});

    console.log("testing data");
    console.log(data);
    //data[data.length - 1].key = "root";
    //data[data.length - 1].value = 0;
    //data[data.length - 1].category = null;

    const idMapping = data.reduce((acc, el, i) => {
  				acc[el.key] = i;
  				return acc;
			}, {});
	
	console.log("idmap");
	console.log(idMapping);

	/*let root;
	data.forEach(el => {
 		 // Handle the root element
  		if (el.category === null) {
    		root = el;
    		return;
  		}
  		// Use our mapping to locate the parent element in our data array
  		const parentEl = data[idMapping[el.category]];
  		// Add our current el to its parent's `children` array
  		parentEl.children = [...(parentEl.children || []), el];
	});

	console.log("root");
	console.log(root);
	console.log("child");
	console.log(root.children);*/

    let d3Container = useRef(null);

    useEffect (( ) => {
    	    if(data && d3Container.current) {

    	    	// JSON data
			    const nodeData = {
			        "name": "categories", 
			        "children": [{
			            			"name": "Project Management",
			            			"children": [{"name": "Coordinated Meetings", "size": 4}, {"name": "Created Slides", "size": 4}]
			        			}, {
			            			"name": "Research",
			            			"children": [{"name": "Researched related work", "size": 3}, {"name": "Brainstorming", "size": 3}, {"name": "Researched Tools", "size": 3}]
			        			}, {
			            			"name": "Data Management",
			            			"children": [{"name": "Gathered raw data", "size": 4}, {"name": "Processed raw data", "size": 4}]
			        			}]
			    };

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
			    const dataroot = d3.hierarchy(nodeData)
			        .sum(function (d) { return d.size});

			    // Size arcs
			    partition(dataroot);
			    const arc = d3.arc()
			        .startAngle(function (d) { return d.x0 })
			        .endAngle(function (d) { return d.x1 })
			        .innerRadius(function (d) { return d.y0 })
			        .outerRadius(function (d) { return d.y1 });

			    const div = d3.select("body").append("div")
     				.attr("class", "tooltip-donut")
     				.style("opacity", 0);

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
               			div.transition()
               				.duration(50)
               				.style("opacity", 1);

     				})

     				.on('mouseleave', function (d, i) {
          				d3.select(this).transition()
               				.duration('50')
               				.attr('opacity', '1');
               			div.transition()
               				.duration('50')
               				.style("opacity", 0);
    				});

			    g.selectAll(".node")  // <-- 1
    				.append("text")  // <-- 2
    				.attr("transform", function(d) {
        				return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; }) // <-- 3
    				.attr("dx", "-20")  // <-- 4
    				.attr("dy", ".5em")  // <-- 5
    				.text(function(d) { return d.parent ? d.data.name : "" });  // <-- 6

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