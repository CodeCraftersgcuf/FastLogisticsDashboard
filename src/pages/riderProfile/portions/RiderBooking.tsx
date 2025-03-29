import React, { useState, useMemo } from 'react'
import ProfileHeader from '../component/ProfileHeader'
import BookingRow from '../../transactions/component/BookingRow';
import TableCan from '../../../components/TableCan';
import HorizontalAlign from '../../../components/HorizontalAlign';
import ItemGap from '../../../components/ItemGap';
import Dropdown from '../../../components/Dropdown';
import { bookingStatus, bulkOptions, DateDropOptions } from '../../../components/FilterData';
import Filter from '../../../components/Filter';
import SearchFilter from '../../../components/SearchFilter';
import StatCard from '../../../components/StatCard';
import { BookingsStats, deliveryData } from '../../../constants/statisticsData';

const RiderBooking : React.FC = () => {
    const [activeStatus, setActiveStatus] = useState('all');
    const [selectedDateRange, setSelectedDateRange] = useState('9999');
    const [searchQuery, setSearchQuery] = useState('');

    // Use useMemo to compute filtered bookings
    const filteredBookings = useMemo(() => {
        return deliveryData.filter(booking => {
            // Status filter
            const matchesStatus = 
                activeStatus.toLowerCase() === 'all' || 
                booking.status.toLowerCase() === activeStatus.toLowerCase();

            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === '' || (
                (booking.username?.toLowerCase().includes(searchLower)) ||
                (booking.rider_name?.toLowerCase().includes(searchLower)) ||
                (booking.orderId?.toLowerCase().includes(searchLower))
            );

            // Date range filter
            const matchesDate = selectedDateRange === '9999' || (
                booking.pickup_date && (() => {
                    const bookingDate = new Date(booking.pickup_date).getTime();
                    const now = new Date().getTime();
                    const daysAgo = (now - bookingDate) / (1000 * 60 * 60 * 24);
                    return daysAgo <= parseInt(selectedDateRange);
                })()
            );

            return matchesStatus && matchesSearch && matchesDate;
        });
    }, [activeStatus, searchQuery, selectedDateRange]);

    const handleFilter = (status: string) => {
        setActiveStatus(status.toLowerCase());
    };

    const handleDateFilter = (range: string) => {
        setSelectedDateRange(range);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleBulkAction = (action: string) => {
        console.log('Bulk action:', action);
        // Implement bulk actions here
    };

    return (
        <>
            <ProfileHeader url='bookings' handlePeriod={(e) => console.log(e)} />
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
                            value={selectedDateRange}
                        />
                        <Dropdown
                            options={bulkOptions}
                            onChange={handleBulkAction}
                            placeholder="Bulk Actions"
                            position="right-0"
                        />
                    </ItemGap>
                    <SearchFilter 
                        handleFunction={handleSearch}
                        value={searchQuery}
                    />
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
    )
}

export default RiderBooking