import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SiteStatisticsChart: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Earnings",
        data: [1000, 800, 1200, 900, 700, 1100, 500, 1300, 400, 1000, 1200, 1300],
        backgroundColor: "green",
      },
      {
        label: "Rides",
        data: [200, 150, 300, 250, 100, 400, 180, 320, 120, 500, 450, 550],
        backgroundColor: "purple",
      },
    ],
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default SiteStatisticsChart;
