import React from 'react'
import { OrderDetails, OrderDetailsType } from './OrderDetails';
import HorizontalAlign from '../../../components/HorizontalAlign';
import Button from '../../../components/buttons/Button';
import MapContainer from '../../../components/MapContainer';

const BookingDetail : React.FC = () => {
  const sampleOrder: OrderDetailsType = {
    orderId: 'ORD-12345678',
    pickupAddress: 'No 1, abcdfeff street, ibadan, Oyo State',
    deliveryAddress: 'No 1, abcdfeff street, ibadan, Oyo State',
    riderName: 'Adewale Simon',
    customerName: 'Adebisi Lateefat',
    pickupDateTime: '22/02/25 - 11:24 PM',
    deliveryDateTime: '22/02/25 - 11:40 PM',
    packageName: 'Nokia Smartphone',
    packageCategory: 'Adewale Simon',
    packageValue: 'N100,000 - N200,000',
    description: 'Nil',
    payOnDelivery: true,
    podAmount: 20000,
    deliveryFeePayment: 'User',
    paymentMethod: 'Wallet',
    deliveryFee: 2,
    total: 22000,
    deliveryStatus: 'Completed'
  };
  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6"><span className='text-black opacity-50'>Bookings Detail</span> / ORD-12345678</h1>
        </HorizontalAlign>
      </div>

      <div className='p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <OrderDetails order={sampleOrder} />
          <div className='relative '>
            <div className='sticky top-10 space-y-2'>
              <MapContainer
                origin={{ lat: 40.719526, lng: -73.952255 }} // example: McCarren Park
                destination={{ lat: 40.744679, lng: -73.948542 }} // example: LaGuardia Community College
              />
              <Button>
                View Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default BookingDetail