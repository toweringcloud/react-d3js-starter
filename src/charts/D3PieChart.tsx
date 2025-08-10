import { useRef, useEffect } from "react";
import * as d3 from "d3";

import useDimensionStore from "../stores/dimension.store";

const data = [
  { name: "A", value: 30 },
  { name: "B", value: 80 },
  { name: "C", value: 45 },
  { name: "D", value: 60 },
  { name: "E", value: 20 },
];

const D3PieChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useDimensionStore();

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = (Math.min(width, height) / 2) * 0.8;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pieGenerator = d3.pie<(typeof data)[0]>().value((d) => d.value);
    const pieData = pieGenerator(data);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(0)
      .outerRadius(radius);

    g.selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => colorScale(d.data.name))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    g.selectAll("text")
      .data(pieData)
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 15)
      .style("fill", "white");
  }, [width, height]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default D3PieChart;
