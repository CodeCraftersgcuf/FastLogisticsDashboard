import React, { useState } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import ItemGap from "../../components/ItemGap";
import { BookingsStats, deliveryData } from "../../constants/statisticsData";
import StatCard from "../../components/StatCard";
import SearchFilter from "../../components/SearchFilter";
import Dropdown from "../../components/Dropdown";
import { bookingStatus, bulkOptions, DateDropOptions } from "../../components/FilterData";
import Filter from "../../components/Filter";
import TableCan from "../../components/TableCan";
import BookingRow from "../transactions/component/BookingRow";

const Booking : React.FC = () => {
  const [filteredBookings, setFilteredBookings] = useState(deliveryData);
  const [activeStatus, setActiveStatus] = useState('all');
  // const [selectedDateRange, setSelectedDateRange] = useState('9999'); // Default to "All time"
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = (selectedStatus: string) => {
    setActiveStatus(selectedStatus);
    applyFilters(selectedStatus, searchQuery);
  };

  const handleDateFilter = (selectedRange: string) => {
    // setSelectedDateRange(selectedRange);
    applyFilters(activeStatus, searchQuery);
    console.log(selectedRange)
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(activeStatus, query);
  };

  const applyFilters = (status: string, query: string) => {
    let filteredData = deliveryData;

    // Filter by Status
    if (status !== "all") {
      filteredData = filteredData.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    // Filter by Search Query
    if (query) {
      filteredData = filteredData.filter(order =>
        order.username.toLowerCase().includes(query.toLowerCase()) ||
        order.rider_name?.toLowerCase().includes(query.toLowerCase()) ||
        order.orderId.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filtered data
    setFilteredBookings(filteredData);
  };

  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Bookings</h1>
        </HorizontalAlign>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BookingsStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <HorizontalAlign>
          <ItemGap>
            <Filter
              tabs={bookingStatus}
              activeTab={activeStatus}
              handleValue={handleFilter}
            />
            <Dropdown
              options={DateDropOptions}
              onChange={handleDateFilter}
              placeholder="Period"
              position="right-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={(value: string) => console.log('Bulk action:', value)}
              placeholder="Bulk Actions"
              position="right-0"
            />
          </ItemGap>
          <SearchFilter handleFunction={(e) => handleSearch(e)} />
        </HorizontalAlign>

        <TableCan
          heading="All Transactions"
          showHeading={true}
          headerTr={[
            "Order id",
            "username",
            "rider name",
            "pick&drop Address",
            "amount",
            "pickup date&time",
            "drop date&time",
            "status",
            "other"
          ]}
          dataTr={filteredBookings}
          TrName={BookingRow}
        />
      </div>
    </>
  );
};

export default Booking;
