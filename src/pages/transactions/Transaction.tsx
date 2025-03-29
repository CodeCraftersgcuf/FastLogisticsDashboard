import React, { useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Filter from '../../components/Filter';
import Dropdown from '../../components/Dropdown';
import { bulkOptions, DateDropOptions, rolestabs, transactionstatus, typeOptions } from '../../components/FilterData';
import StatCard from '../../components/StatCard';
import {  transactions, transactionsData } from '../../constants/statisticsData';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import TransactionsRow from './component/TransactionsRow';


const Transaction : React.FC = () => {
  // const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activePeriod, setActivePeriod] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((transaction: any) => {
      // Role filter
      if (activeRole !== 'All' && transaction.role.toLowerCase() !== activeRole.toLowerCase()) {
        return false;
      }

      // Type filter
      if (activeType !== 'All' && transaction.payment_method.toLowerCase() !== activeType.toLowerCase()) {
        return false;
      }

      // Status filter
      if (activeStatus !== 'All' && transaction.status.toLowerCase() !== activeStatus.toLowerCase()) {
        return false;
      }

      // Period filter
      if (activePeriod !== 'All') {
        const transactionDate = new Date(transaction.date);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

        switch (activePeriod) {
          case 'Today':
            return daysDiff === 0;
          case 'Last 7 days':
            return daysDiff <= 7;
          case 'Last 30 days':
            return daysDiff <= 30;
          case 'Last 90 days':
            return daysDiff <= 90;
          default:
            return true;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const searchLower = searchQuery.toLowerCase().trim();
        return (
          transaction.username.toLowerCase().includes(searchLower) ||
          transaction.transactionId.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [activeRole, activeType, activeStatus, activePeriod, searchQuery]);

  const handleRoleFilter = (value: string) => {
    setActiveRole(value);
  };

  const handleTypeFilter = (value: string) => {
    setActiveType(value);
  };

  const handleStatusFilter = (value: string) => {
    setActiveStatus(value);
  };

  const handlePeriodFilter = (value: string) => {
    setActivePeriod(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Transactions</h1>
          <ItemGap className="px-6">
            <Filter
              tabs={rolestabs}
              activeTab={activeRole}
              handleValue={handleRoleFilter}
            />
          </ItemGap>
        </HorizontalAlign>
      </div>
      <div className='flex flex-col gap-4 p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {transactions.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <HorizontalAlign>
          <ItemGap>
            <Filter
              tabs={typeOptions}
              activeTab={activeType}
              handleValue={handleTypeFilter}
            />
            <Dropdown
              options={transactionstatus}
              onChange={handleStatusFilter}
              placeholder="All"
              position="right-0"
            />
            <Dropdown
              options={DateDropOptions}
              onChange={handlePeriodFilter}
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
          heading='All Transactions'
          showHeading={true}
          headerTr={['name', 'transaction id', 'amount', 'status', 'payment method', 'Date&Time', 'other']}
          dataTr={filteredTransactions}
          TrName={TransactionsRow}
        />
      </div>
    </>
  );
};

export default Transaction;