import React from 'react'
import HorizontalAlign from '../../components/HorizontalAlign'
import Dropdown from '../../components/Dropdown'
import { DateDropOptions } from '../../components/FilterData';
import Filter from '../../components/Filter';
import { useNavigate } from 'react-router-dom';
import ItemGap from '../../components/ItemGap';

// list of props handlePeriodFunctionDropdown,url
interface props {
    handlePeriod: (value: string) => void,
    url?: string,
}


const ProfileHeader: React.FC<props> = ({ handlePeriod, url }) => {
    const navigate = useNavigate();
    const tabs = [
        { value: 'Activity', name: 'activity' },
        { value: 'bookings', name: 'bookings' },
        { value: 'transaction', name: 'transaction' },
        { value: 'chat', name: 'chat' },
    ];
    const handleNavigate = ( e : string) => {
        // navigate(e)
        console.log(e)
    }
    return (
        <div className="bg-white">
            <HorizontalAlign havsShadow={true}>
                <h1 className="text-2xl font-semibold px-6"><span className='text-gray-400'>User Management</span> / {url || 'Customer Detail'}</h1>
                <ItemGap className="px-6">
                    <Filter
                        tabs={tabs}
                        activeTab={tabs[0].name}
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