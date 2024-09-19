import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const chartData = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3, 4],
        borderColor: "rgba(146, 255, 192, 0.7)",
        backgroundColor: "rgba(146, 255, 192, 0.2)",
        fill: true
      },
      {
        label: 'Expenses',
        data: [8, 10, 6, 4, 3, 2, 3],
        borderColor: 'rgba(175, 71, 210, 1)',
        backgroundColor: 'rgba(175, 71, 210, 0.2)',
        fill: true
      },
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
    },
    scales: {
      x: {
        type: "category",
        grid: {
          display: true
        }
      },
      y: {
        grid: {
          display: true
        },
        ticks: {
          beginAtZero: true
        }
      }
    }
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
