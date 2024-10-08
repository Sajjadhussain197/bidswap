import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3, 4, 2 ,20, 16, 17, 12],
        backgroundColor: "rgba(75, 192, 192, 0.8)"
      },
      {
        label: 'Expenses',
        data: [8, 10, 6, 4, 3, 2, 4,1, 5,7,11, 2 ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
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
    }
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default ChartComponent;