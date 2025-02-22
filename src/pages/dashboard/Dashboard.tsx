import React from "react";
import StatCard from "../../components/StatCard";
import LatestBookings from "../../components/LatestBookings";
import SiteStatisticsChart from "./components/SiteStatisticsChart";
import RideStatisticsChart from "./components/RideStatisticsChart";
import { siteStats, rideStats } from "../../constants/statisticsData";
import images from "../../constants/images";

const bookingsData = [
  {
    user: "Qamarudeen Malik",
    rider: "Alex Adewale",
    customer: "Chris Richard",
    address: "No. 1, abcdefghijkl street, Lagos",
    payOnDelivery: "Yes",
    pickupTime: "21-02-2025 | 07:22 AM",
    dropTime: "21-02-2025 | 07:22 AM",
    status: "Active",
  },
  {
    user: "Sarah Johnson",
    rider: "Michael Smith",
    customer: "John Doe",
    address: "15, XYZ Street, Ikeja, Lagos",
    payOnDelivery: "No",
    pickupTime: "23-02-2025 | 06:15 AM",
    dropTime: "23-02-2025 | 06:45 AM",
    status: "Completed",
  },
];

const handleDetailsClick = (booking: any) => {
  console.log("View details for:", booking);
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Site & Ride Statistics (First Row - Two from Each) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/** Site Statistics (First 2) **/}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <img src={images.signal} alt="signal" className="w-6 h-6" />Site Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {siteStats.slice(0, 2).map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/** Ride Statistics (First 2) **/}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <img src={images.signal} alt="signal" className="w-6 h-6" />Ride Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {rideStats.slice(0, 2).map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Site & Ride Statistics (Second Row - Remaining Two from Each) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {siteStats.slice(2, 4).map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {rideStats.slice(2, 4).map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full h-auto overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <i className="bi bi-bar-chart-line"></i> Site Statistics
          </h2>
          <div className="w-full h-[350px] flex items-center justify-center">
            <SiteStatisticsChart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full h-auto overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <i className="bi bi-graph-up"></i> Ride Statistics
          </h2>
          <div className="w-full h-[350px] flex items-center justify-center">
            <RideStatisticsChart />
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <LatestBookings
        bookings={bookingsData}
        actionButton={{ text: "Details", onClick: handleDetailsClick }}
        title="Latest Bookings"
      />
    </div>
  );
};

export default Dashboard;
