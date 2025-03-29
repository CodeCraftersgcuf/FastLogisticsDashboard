import React, { useState, useEffect } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import ItemGap from "../../components/ItemGap";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import SearchFilter from "../../components/SearchFilter";
import { bulkOptions, DateDropOptions } from "../../components/FilterData";
import TableCan from "../../components/TableCan";
import BannerRow from "./component/BannerRow";
import { BannerStatics } from "../../constants/statisticsData";
import BannerModal from "./component/BannerModal";
import DeleteConfirmationModal from "./component/DeleteConfirmationModal";

const InAppBanner: React.FC = () => {
  const navigate = useNavigate();
  const [isBannerModalOpen, setBannerModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('9999');
  const [filteredBanners, setFilteredBanners] = useState(BannerStatics);

  useEffect(() => {
    const now = new Date();
    const filterBanners = () => {
      return BannerStatics.filter(banner => {
        // Search filter
        const matchesSearch = banner.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Period filter
        const bannerDate = new Date(banner.created_at);
        const daysDifference = Math.floor((now.getTime() - bannerDate.getTime()) / (1000 * 60 * 60 * 24));
        const withinPeriod = daysDifference <= parseInt(selectedPeriod);

        return matchesSearch && withinPeriod;
      });
    };

    setFilteredBanners(filterBanners());
  }, [searchTerm, selectedPeriod]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePeriodChange = (period: any) => {
    setSelectedPeriod(period);
  };

  const handleBannerSubmit = (values: any) => {
    console.log('Banner values:', values);
    // Implement create/update logic here
    setBannerModalOpen(false);
    setSelectedBanner(null);
  };

  const handleEdit = (banner: any) => {
    setSelectedBanner(banner);
    setModalMode('edit');
    setBannerModalOpen(true);
  };

  const handleDelete = (banner: any) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBanner) {
      console.log('Deleting banner:', selectedBanner.id);
      // Implement delete logic here
    }
    setIsDeleteModalOpen(false);
    setSelectedBanner(null);
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
            <Button
              handleFunction={() => {
                setModalMode('create');
                setSelectedBanner(null);
                setBannerModalOpen(true);
              }}
            >
              Add New In App Banner
            </Button>
            <SearchFilter handleFunction={handleSearch} />
          </ItemGap>
        </HorizontalAlign>
        <TableCan
          heading="Latest Banners"
          showHeading={true}
          headerTr={['Banner image', 'Location', 'Date', 'Actions']}
          dataTr={filteredBanners}
          TrName={BannerRow}
          TrPropsName={{
            onEdit: { handleEdit },
            onDelete: { handleDelete }
          }}
        //   <BannerRow 
        //     {...props} 
        //     onEdit={handleEdit} 
        //     onDelete={handleDelete}
        //   />
        // )}
        />
      </div>

      <BannerModal
        isOpen={isBannerModalOpen}
        onClose={() => {
          setBannerModalOpen(false);
          setSelectedBanner(null);
        }}
        onSubmit={handleBannerSubmit}
        initialValues={selectedBanner}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBanner(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default InAppBanner;