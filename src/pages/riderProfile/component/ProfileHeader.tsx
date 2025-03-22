import React from 'react'
import { useNavigate } from 'react-router-dom';
import HorizontalAlign from '../../../components/HorizontalAlign';
import ItemGap from '../../../components/ItemGap';
import Dropdown from '../../../components/Dropdown';
import { DateDropOptions } from '../../../components/FilterData';
import Filter from '../../../components/Filter';

// list of props handlePeriodFunctionDropdown,url
interface props {
    handlePeriod: (value: string) => void,
    url: string,
    isRider?:boolean;
}


const ProfileHeader: React.FC<props> = ({ handlePeriod, url }) => {
    const navigate = useNavigate();
    const tabs = [
        { value: '/rider/management/alex/customer/detail', name: 'activity' },
        { value: '/rider/management/alex/customer/bookings', name: 'bookings' },
        { value: '/rider/management/alex/customer/transactions', name: 'transaction' },
        { value: '/rider/management/alex/customer/verification', name: 'verification' },
        { value: '/rider/management/alex/customer/chat', name: 'chat' },
    ];
    
    const handleNavigate = (e: string) => {
        navigate(e)
        // console.log(e)
    }
    return (
        <div className="bg-white">
            <HorizontalAlign havsShadow={true}>
                <h1 className="text-2xl font-semibold px-6 capitalize"><span className='text-gray-400'>User Management</span> / {url || 'Customer Detail'}</h1>
                <ItemGap className="px-6">
                    <Filter
                        tabs={tabs}
                        activeTab={url}
                        handleValue={(value: string) => handleNavigate(value)}
                    />
                    <Dropdown
                        options={DateDropOptions}
                        onChange={handlePeriod}
                        placeholder="This Week"
                        position="right-0"
                    />
                </ItemGap>
            </HorizontalAlign>
        </div>
    )
}

export default ProfileHeader