import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const RideStatisticsChart: React.FC = () => {
  const data = {
    labels: ["Completed Rides", "Active Rides", "Scheduled Rides"],
    datasets: [
      {
        data: [25, 60, 15],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
  };

  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Pie data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default RideStatisticsChart;
