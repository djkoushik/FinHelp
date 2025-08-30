import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MindMap = ({ data }) => {
    const svgRef = useRef(null);
    
    const processData = (rawData) => {
        // Convert the analysis data into a hierarchical structure
        return {
            name: data.companyName || "Company Analysis",
            children: [
                {
                    name: "Financial Health",
                    children: [
                        {
                            name: "Overall Score",
                            value: data.analysis?.overallHealth,
                            size: 1
                        },
                        {
                            name: "Key Metrics",
                            children: Object.entries(data.metrics || {}).map(([key, value]) => ({
                                name: key,
                                value: value.value,
                                benchmark: value.benchmark,
                                status: value.status,
                                size: 1
                            }))
                        }
                    ]
                },
                {
                    name: "Sector Analysis",
                    children: [
                        {
                            name: data.sector,
                            children: [
                                {
                                    name: "Primary Ratios",
                                    children: data.analysis?.primaryRatios?.map(ratio => ({
                                        name: ratio.name,
                                        value: ratio.value,
                                        status: ratio.status,
                                        size: 1
                                    })) || []
                                },
                                {
                                    name: "Industry Benchmarks",
                                    children: data.analysis?.benchmarks?.map(benchmark => ({
                                        name: benchmark.name,
                                        value: benchmark.value,
                                        size: 1
                                    })) || []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Recommendations",
                    children: (data.analysis?.recommendations || []).map(rec => ({
                        name: rec,
                        size: 1
                    }))
                }
            ]
        };
    };

    useEffect(() => {
        if (!data || !svgRef.current) return;

        // Clear previous visualization
        d3.select(svgRef.current).selectAll("*").remove();

        const width = 1200;
        const height = 800;
        const margin = { top: 20, right: 120, bottom: 20, left: 120 };

        // Create the tree layout
        const tree = d3.tree()
            .size([height - margin.top - margin.bottom, width - margin.right - margin.left]);

        // Create the SVG container
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Process the data into hierarchical format
        const hierarchicalData = d3.hierarchy(processData(data));
        const nodes = tree(hierarchicalData);

        // Create links
        const link = svg.selectAll(".link")
            .data(nodes.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .style("fill", "none")
            .style("stroke", "#ccc")
            .style("stroke-width", "1.5px");

        // Create nodes
        const node = svg.selectAll(".node")
            .data(nodes.descendants())
            .enter()
            .append("g")
            .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // Add circles to nodes
        node.append("circle")
            .attr("r", 5)
            .style("fill", d => {
                if (d.data.status === 'good') return "#4caf50";
                if (d.data.status === 'warning') return "#ff9800";
                if (d.data.status === 'alert') return "#f44336";
                return "#999";
            });

        // Add labels to nodes
        node.append("text")
            .attr("dy", ".31em")
            .attr("x", d => d.children ? -10 : 10)
            .style("text-anchor", d => d.children ? "end" : "start")
            .text(d => {
                let label = d.data.name;
                if (d.data.value) label += `: ${d.data.value}`;
                if (d.data.benchmark) label += ` (Benchmark: ${d.data.benchmark})`;
                return label;
            })
            .style("font-size", "12px")
            .style("font-family", "Arial");

        // Add tooltips
        node.append("title")
            .text(d => {
                let tooltip = d.data.name;
                if (d.data.value) tooltip += `\nValue: ${d.data.value}`;
                if (d.data.benchmark) tooltip += `\nBenchmark: ${d.data.benchmark}`;
                if (d.data.status) tooltip += `\nStatus: ${d.data.status}`;
                return tooltip;
            });

    }, [data]);

    return (
        <div className="mind-map-container">
            <h3>Financial Analysis Mind Map</h3>
            <div className="mind-map-wrapper">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default MindMap;
