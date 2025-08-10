import { useEffect, useRef, useState } from "react";

import D3BarChart from "./charts/D3BarChart";
import D3LineChart from "./charts/D3LineChart";
import D3PieChart from "./charts/D3PieChart";

import Contents from "./layouts/Contents";
import Sidebar from "./layouts/Sidebar";

import useDimensionStore from "./stores/dimension.store";

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState("Bar Chart");
  const { setDimensions } = useDimensionStore();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  // 컨테이너 크기가 변경될 때마다 Zustand 스토어 업데이트
  useEffect(() => {
    const container = chartContainerRef.current;
    if (container) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]) {
          const { width, height } = entries[0].contentRect;
          setDimensions(width, height);
        }
      });
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
  }, [setDimensions]);

  const renderChart = () => {
    switch (selectedMenu) {
      case "Bar Chart":
        return <D3BarChart />;
      case "Line Chart":
        return <D3LineChart />;
      case "Pie Chart":
        return <D3PieChart />;
      // ... 다른 D3 차트 컴포넌트 추가
      default:
        return <D3BarChart />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <Contents>
        <span className="text-xl font-bold mb-4">{selectedMenu}</span>
        <div
          ref={chartContainerRef}
          className="bg-white w-full h-full p-4 rounded-lg shadow-md overflow-hidden"
        >
          {renderChart()}
        </div>
      </Contents>
    </div>
  );
};

export default App;
