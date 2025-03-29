import React from 'react'
import { dummyImage,  formatCreatedAt } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import { useNavigate, useNavigation } from 'react-router-dom';
import images from '../../../constants/images';

interface props {
    displayData: {
        id: number;
        profile_image?: string;
        username: string;
        email:string;
        role:string;
        created_at:string;
        status: string;
    };
}


const AdminRow: React.FC<props> = ({ displayData }) => {
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
            <td className="p-2">{displayData.role}</td>
            <td className="p-2 text-center">{formatCreatedAt(displayData.created_at)}</td>
            <td className="p-2">
                <div className='flex justify-center items-center'>
                    <div className={` ${displayData.status == 'active' ? 'bg-green-500' : 'bg-red-500'} rounded-full w-6 h-6`}></div>
                </div>
            </td>
            <td className='p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <Button handleFunction={() => navigate(`/settings/admin/${displayData.id}/detail`)} >
                        Admin Details
                    </Button>
                    <button className='p-2 border border-gray-200 rounded-md'>
                        <img src={images.editBlack} alt="edit admin" className='size-[20px]' />
                    </button>
                    <button className='p-2 border border-gray-200 rounded-md'>
                        <img src={images.delBlack} alt="edit admin" className='size-[20px]' />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default AdminRow