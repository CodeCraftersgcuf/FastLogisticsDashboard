import React from 'react'
import { useLocation } from 'react-router-dom'
import ProfileHeader from './component/ProfileHeader';
import UserProfile from './component/UserProfile';
import ActivityRow from './component/ActivityRow';
import ItemGap from '../../components/ItemGap';
import Dropdown from '../../components/Dropdown';
import TableCan from '../../components/TableCan';
import { userActivities } from '../../constants/statisticsData';
import { bulkOptions, onlineStatus } from '../../components/FilterData';

const RiderProfile : React.FC = () => {
  const url = useLocation();
  console.log(url);
  const handleDetailsClick = (e: any) => {
    console.log(e.target.value);
  }
  const userData = {
    name: 'Qamardeen AbdulMalik',
    email: 'qamardeenola@gmail.com',
    phoneNumber: '07012345678',
    location: 'Lagos, Nigeria',
    lastLogin: '23/02/25 - 11:22 AM',
    accountCreation: '10/02/25 - 07:21 AM',
    walletBalance: 25000,
    status: 'online' as const,
  };

  return (
    <>
      <ProfileHeader url='activity' handlePeriod={handleDetailsClick} />
      <div className='flex flex-col gap-6 p-6'>
        <UserProfile isRider={true} userData={userData} />
        <ItemGap>
          <Dropdown
            options={onlineStatus}
            onChange={handleDetailsClick}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkOptions}
            onChange={handleDetailsClick}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemGap>
        <TableCan
          heading='User Activity'
          showHeading={true}
          headerTr={['activity','date']}
          dataTr={userActivities}
          TrName={ActivityRow}
        />
      </div>
    </>
  )
}

export default RiderProfile