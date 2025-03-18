import React from 'react'
import { dummyImage, formatAmount } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import MoreDropdown from '../../../components/MoreDropdown';
import { useNavigate, useNavigation } from 'react-router-dom';

interface props {
    displayData: {
        id: number;
        profile_image?: string;
        username: string;
        email: string;
        phone: string;
        wallet_balance: number | string;
        status: string;
    };
    index: number;
}


const UsersRow: React.FC<props> = ({ displayData, index }) => {
    const navigate =  useNavigate();
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
            <td className='p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <Button handleFunction={() => navigate(`/user/management/${displayData.username}/customer/detail`)}>
                        Customer Details
                    </Button>
                    <Button bgColor='bg-black' TextColor='text-white'>
                        Transactions
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

export default UsersRow