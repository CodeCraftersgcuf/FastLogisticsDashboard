import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import HorizontalAlign from "../../components/HorizontalAlign";
import { bulkOptions, DateDropOptions, onlineStatus, riderStatus, tierStatus } from "../../components/FilterData";
import { riderStats, riderTableStatic, userStatic, userTableStatic } from '../../constants/statisticsData'
import StatCard from "../../components/StatCard";
import Button from "../../components/buttons/Button";
import ItemGap from "../../components/ItemGap";
import SearchFilter from "../../components/SearchFilter";
import TableCan from "../../components/TableCan";
import AddUserModal from "../userManagement/components/AddUserModal";
import UsersRow from "../userManagement/components/UsersRow";
import RiderRow from "./component/RiderRow";
import { useNavigate } from "react-router-dom";

const RiderManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = (booking: any) => {
    console.log("View details for:", booking);
  };

  const handleAddUser = (values: any) => {
    console.log("New user data:", values);
    // Handle the new user data here (e.g., API call)
  };
  const navigate = useNavigate()

  return (
    <div className="">
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Rider Management</h1>
          <div className="px-6">
            <ItemGap>
              <Button handleFunction={() => navigate('/rider/management/tiers')}>
                Manage Tiers
              </Button>
              <Dropdown
                options={DateDropOptions}
                onChange={handleDetailsClick}
                placeholder="This Week"
                position="right-0"
              />
            </ItemGap>
          </div>
        </HorizontalAlign>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {riderStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <HorizontalAlign>
          <ItemGap>
            <Dropdown
              options={riderStatus}
              onChange={handleDetailsClick}
              placeholder="All"
              position="left-0"
            />
            <Dropdown
              options={tierStatus}
              onChange={handleDetailsClick}
              placeholder="Tiers"
              position="left-0"
            />
            <Dropdown
              options={onlineStatus}
              onChange={handleDetailsClick}
              placeholder="Status"
              position="left-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={handleDetailsClick}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <Button handleFunction={() => setIsModalOpen(true)}>
              Add New User
            </Button>
            <SearchFilter/>
          </ItemGap>
        </HorizontalAlign>

        <TableCan
          heading="All Riders"
          showHeading={true}
          headerTr={['Rider Name','Email','Phone No','Wallet Balance','Status','tier','Actions','Other']}
          dataTr={riderTableStatic}
          TrName={RiderRow}
        />

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
        />
      </div>
    </div>
  );
};

export default RiderManagement;