import React from "react";

const chartMenus = [
  "Bar Chart",
  "BCG Matrix Chart",
  "Bubble Chart",
  "Candlestick Chart",
  "Forecast Chart",
  "Funnel Chart",
  "Graph Chart",
  "Heatmap Chart",
  "Line Chart",
  "Mixed Chart",
  "Parallel Coordinates Chart",
  "Pie Chart",
  "Radar Chart",
  "Risk Matrix Chart",
  "Sankey Diagram Chart",
  "Scatter Chart",
  "Sunburst Chart",
  "Treemap Chart",
  "Word Cloud Chart",
];

interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <aside className="w-64 bg-white text-black p-4 shadow-md overflow-y-auto">
      <span className="text-xl font-bold mb-4">D3.js Examples</span>
      <nav>
        <ul>
          {chartMenus.map((menu) => (
            <li
              key={menu}
              className={`p-2 hover:bg-blue-200 hover:text-black cursor-pointer rounded ${
                selectedMenu === menu
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-gray-500 "
              }`}
              onClick={() => setSelectedMenu(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
