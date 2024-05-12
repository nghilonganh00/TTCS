import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Độ chính xác",
    },
  },
};

interface LineChartProps {
  datasets: number[];
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { datasets } = props;

  const labels = datasets.map((item) => "");

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datasets,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="w-4/5">
      <Line options={options} data={data}></Line>
    </div>
  );
};

export default LineChart;
