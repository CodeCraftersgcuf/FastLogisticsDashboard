import React, { useState } from 'react'
import { dummyImage, formatAmount } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import MoreDropdown from '../../../components/MoreDropdown';
import { useNavigate } from 'react-router-dom';

interface props {
    displayData: {
        id: number;
        profile_image?: string;
        username: string;
        email: string;
        phone: string;
        wallet_balance: number | string;
        tier: string;
        status: string;
        verify: string;
    };
    index: number;
}


const RiderRow: React.FC<props> = ({ displayData, index }) => {
    const navigate = useNavigate();
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (parseInt(displayData.verify) / 100) * circumference;

    const getColor = (value: string) => {
        const getvalue = parseInt(value);
        if (getvalue <= 50) return 'orange';
        if (getvalue > 75 && getvalue <= 80) return 'purple';
        if (getvalue > 80) return 'green';
        return 'orange'; // default color for 51-75%
    };
    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-2 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2">
                <div className='flex items-center gap-2'>
                    <img src={displayData.profile_image || dummyImage()} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.username}
                </div>
            </td>
            <td className="p-2">{displayData.email}</td>
            <td className="p-2">{displayData.phone}</td>
            <td className="p-2 text-center">N {formatAmount(displayData.wallet_balance)}</td>
            <td className="p-2">
                <div className='flex justify-center items-center'>
                    <div className={` ${displayData.status == 'active' ? 'bg-green-500' : 'bg-red-500'} rounded-full w-6 h-6`}></div>
                </div>
            </td>
            <td className="p-2 text-center">{displayData.tier}</td>
            <td className='p-2'>
                <div className='flex flex-col justify-center gap-2'>
                    <button className="relative flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
                        <span className="font-medium text-sm tracking-wide">Verification</span>
                        <div className="relative w-[40px] h-[40px]">
                            {/* Background circle - size matches wrapper */}
                            <div className="absolute inset-0 rounded-full border-2 border-gray-700"></div>
                            <div className="absolute inset-0">
                                <svg className="w-[40px] h-[40px] transform -rotate-90">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="18"
                                        stroke={getColor(displayData.verify)} // Use dynamic color here
                                        strokeWidth="2"
                                        fill="transparent"
                                        strokeDasharray={circumference} // Use calculated circumference
                                        strokeDashoffset={dashOffset} // Use calculated dash offset
                                        className="transition-all duration-700 ease-in-out"
                                    />
                                </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-medium">{displayData.verify}%</span> {/* Use dynamic percentage */}
                            </div>
                        </div>
                    </button>
                    <Button handleFunction={() => navigate(`/rider/management/${displayData.username}/customer/detail`)}>
                        Rider Details
                    </Button>
                </div>
            </td>
            <td className='p-2'>
                <MoreDropdown
                    iconClass="bi bi-three-dots-vertical"
                    menuClass="bg-theme-dark min-w-[300px]"
                >
                    hamza
                </MoreDropdown>
            </td>
        </tr>
    )
}

export default RiderRow