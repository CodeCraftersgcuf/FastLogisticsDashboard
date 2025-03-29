import React from 'react'
import ProfileHeader from '../component/ProfileHeader'
import RiderProfile from '../component/RiderProfile';
import DocumentViewer from '../component/DocumentViewer';

const Verification : React.FC = () => {
    const handleDetailsClick = (e: any) => {
        console.log(e.target.value);
    }
    const profileData = {
        tier: 3,
        balance: 105000,
        completionPercentage: 75,
        personalDetails: {
            firstName: "Abdul malik",
            lastName: "Qamardeen",
            email: "qamardeenoladimeji@gmail.com",
            phoneNumber: "07012345678",
            address: "No 2, abcdffttg street, ibadan, oyo",
            ninNumber: "1245676533",
        },
        vehicleDetails: {
            vehicleType: "Motorcycle",
            plateNumber: "1245676533",
            permitNumber: "1245676533",
            color: "Blue",
        },
        isApproved: false,
        completedSteps: {
            personalInformation: true,
            vehicleInformation: true,
            uploads: false,
            tierPayment: false,
        },
    };

    const documents = [
        {
            type: 'image' as const,
            title: 'Passport',
            url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop',
        },
        {
            type: 'image' as const,
            title: 'Riders Permit',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        },
        {
            type: 'video' as const,
            title: 'Vehicle Video',
            url: 'https://player.vimeo.com/external/517090081.sd.mp4?s=60b8a49192c8ae3e08e7d3a47f5879a681591497&profile_id=165&oauth2_token_id=57447761',
        },
    ];
    return (
        <>
            <ProfileHeader url='verification' handlePeriod={handleDetailsClick} />
            <div className='p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                    <div className='lg:col-span-8'>
                        <RiderProfile {...profileData} />
                    </div>
                    <div className='lg:col-span-4'>
                        <DocumentViewer documents={documents} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verification