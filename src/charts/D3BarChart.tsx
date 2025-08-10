import { useRef, useEffect } from "react";
import * as d3 from "d3";

import useDimensionStore from "../stores/dimension.store";

const data = [
  { name: "A", value: 30 },
  { name: "B", value: 80 },
  { name: "C", value: 45 },
  { name: "D", value: 60 },
  { name: "E", value: 20 },
  { name: "F", value: 90 },
  { name: "G", value: 55 },
];

const D3BarChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensionStore();

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    // SVG 요소 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 리렌더링 시 기존 요소 제거

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // X축 스케일 (Band scale for categorical data)
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    // Y축 스케일 (Linear scale for numerical data)
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X축 그리기
    const xAxis = d3.axisBottom(xScale);
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "12px");

    // Y축 그리기
    const yAxis = d3.axisLeft(yScale);
    g.append("g").call(yAxis).selectAll("text").attr("font-size", "12px");

    // 막대 그래프 그리기
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name)!)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", "steelblue");
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default D3BarChart;
