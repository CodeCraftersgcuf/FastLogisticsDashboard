import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Button from '../../components/buttons/Button';
import Dropdown from '../../components/Dropdown';
import SearchFilter from '../../components/SearchFilter';
import { bulkOptions, DateDropOptions } from '../../components/FilterData';
import TableCan from '../../components/TableCan';
import NotificationRow from './component/NotificationRow';
import { notificationStatics } from '../../constants/statisticsData';
import NotificationModal, { NotificationFormValues } from './component/NotificationModal';
import DeleteConfirmationModal from './component/DeleteConfirmationModal';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationFormValues | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  // New state for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('9999'); // Default to 'All time'
  const [filteredNotifications, setFilteredNotifications] = useState(notificationStatics);

  // Filter notifications based on search term and period
  useEffect(() => {
    const now = new Date();
    const filterNotifications = () => {
      return notificationStatics.filter(notification => {
        // Search filter
        const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Period filter
        const notificationDate = new Date(notification.created_at);
        const daysDifference = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60 * 24));
        const withinPeriod = daysDifference <= parseInt(selectedPeriod);

        return matchesSearch && withinPeriod;
      });
    };

    setFilteredNotifications(filterNotifications());
  }, [searchTerm, selectedPeriod]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handlePeriodChange = (period: any) => {
    setSelectedPeriod(period);
  };

  const handleNotificationSubmit = (values: NotificationFormValues) => {
    console.log('Notification values:', values);
    // Implement create/update logic here
    setIsNotificationModalOpen(false);
    setSelectedNotification(null);
  };

  const handleEdit = (notification: NotificationFormValues) => {
    setSelectedNotification(notification);
    setModalMode('edit');
    setIsNotificationModalOpen(true);
  };

  const handleDelete = (notification: NotificationFormValues) => {
    setSelectedNotification(notification);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNotification) {
      console.log('Deleting notification:', selectedNotification.id);
      // Implement delete logic here
    }
    setIsDeleteModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <>
      <div className='bg-white'>
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">
            <span className='text-gray-400'>Admin Management</span> / Role Management
          </h1>
          <div className="px-6">
            <ItemGap>
              <Button handleFunction={() => navigate('/notifications')}>
                In App Notifications
              </Button>
              <Button handleFunction={() => navigate('/notifications/banners')}>
                In App Banners
              </Button>
            </ItemGap>
          </div>
        </HorizontalAlign>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <HorizontalAlign>
          <ItemGap>
            <Dropdown
              options={DateDropOptions}
              onChange={(e) => handlePeriodChange(e)}
              placeholder="Period"
              position="left-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={() => { }}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <Button handleFunction={() => {
              setModalMode('create');
              setSelectedNotification(null);
              setIsNotificationModalOpen(true);
            }}>
              Send Notification
            </Button>
            <SearchFilter handleFunction={handleSearch} />
          </ItemGap>
        </HorizontalAlign>

        <TableCan
          heading="Latest Notifications"
          showHeading={true}
          headerTr={['Notification', 'Image', 'Location', 'Date', 'Actions']}
          dataTr={filteredNotifications}
          TrName={NotificationRow}
          TrPropsName={{
            onEdit: { handleEdit },
            onDelete: { handleDelete }
          }}
        />
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => {
          setIsNotificationModalOpen(false);
          setSelectedNotification(null);
        }}
        onSubmit={handleNotificationSubmit}
        initialValues={selectedNotification || undefined}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedNotification(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Notification;