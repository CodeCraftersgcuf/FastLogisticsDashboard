import React from 'react'
import ProfileHeader from '../component/ProfileHeader'
import SupportHeader from '../../pages/support/components/SupportHeader';
import { dummyImage } from '../../constants/help';
import ChatCan from '../../pages/support/ChatComponents/ChatCan';

const UserChat : React.FC = () => {
    const handleDetailsClick = (e: any) => {
        console.log(e.target.value);
    }
    return (
        <>
            <ProfileHeader url='chat' handlePeriod={handleDetailsClick} />
            <div className='p-6'>
                <div className='md:col-span-8'>
                    <SupportHeader username={'Alex'} ProfileImg={dummyImage()} />
                    <ChatCan  notShowInputCan={true} />
                </div>
            </div>
        </>
    )
}

export default UserChat