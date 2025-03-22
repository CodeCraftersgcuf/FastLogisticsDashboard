import React, { useState } from 'react'
import ProfileHeader from '../component/ProfileHeader'
import BookingRow from '../../pages/transactions/component/BookingRow';
import TableCan from '../../components/TableCan';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Dropdown from '../../components/Dropdown';
import { bookingStatus, bulkOptions, DateDropOptions } from '../../components/FilterData';
import Filter from '../../components/Filter';
import SearchFilter from '../../components/SearchFilter';
import StatCard from '../../components/StatCard';
import { BookingsStats, deliveryData } from '../../constants/statisticsData';

const UserBooking = () => {
    const handleDetailsClick = (e: any) => {
        console.log(e.target.value);
    }
    const [filteredBookings, setFilteredBookings] = useState(deliveryData);
    const [activeStatus, setActiveStatus] = useState('All');
    const [selectedDateRange, setSelectedDateRange] = useState('9999'); // Default to "All time"
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilter = (selectedStatus: string) => {
        setActiveStatus(selectedStatus);
        applyFilters(selectedStatus, selectedDateRange, searchQuery);
    };

    const handleDateFilter = (selectedRange: string) => {
        setSelectedDateRange(selectedRange);
        applyFilters(activeStatus, selectedRange, searchQuery);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters(activeStatus, selectedDateRange, query);
    };

    const applyFilters = (status: string, dateRange: string, query: string) => {
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
            <ProfileHeader url='bookings' handlePeriod={handleDetailsClick} />
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
                    TrName={(props) => <BookingRow {...props} />}
                />
            </div>
        </>

    )
}

export default UserBooking