import { useRef, useEffect } from "react";
import * as d3 from "d3";

import useDimensionStore from "../stores/dimension.store";

const data = [
  { date: new Date(2023, 0, 1), value: 100 },
  { date: new Date(2023, 1, 1), value: 120 },
  { date: new Date(2023, 2, 1), value: 150 },
  { date: new Date(2023, 3, 1), value: 130 },
  { date: new Date(2023, 4, 1), value: 180 },
  { date: new Date(2023, 5, 1), value: 210 },
];

const D3LineChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensionStore();

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));

    const lineGenerator = d3
      .line<(typeof data)[0]>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "tomato")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default D3LineChart;
