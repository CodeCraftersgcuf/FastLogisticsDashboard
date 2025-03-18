import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HorizontalAlign from '../../../components/HorizontalAlign';
import ItemGap from '../../../components/ItemGap';
import Filter from '../../../components/Filter';

// list of props handlePeriodFunctionDropdown,url
interface props {
    url?: string,
}


const SettingHeader: React.FC<props> = ({ url }) => {
    const navigate = useNavigate();
    const tabs = [
        { value: '/settings/general', name: 'General' },
        { value: '/setting/admin', name: 'Admin Management' },
    ];
    const handleNavigate = ( e : string) => {
        navigate(e)
        // console.log(e)
    }
    return (
        <div className="bg-white">
            <HorizontalAlign havsShadow={true}>
                <h1 className="text-2xl font-semibold px-6">Settings</h1>
                <ItemGap className="px-6">
                    <Filter
                        tabs={tabs}
                        activeTab={tabs[0].name}
                        handleValue={(value: string) => handleNavigate(value)}
                    />
                </ItemGap>
            </HorizontalAlign>
        </div>
    )
}

export default SettingHeader;