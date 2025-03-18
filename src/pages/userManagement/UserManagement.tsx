import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import HorizontalAlign from "../../components/HorizontalAlign";
import { bulkOptions, DateDropOptions, onlineStatus } from "../../components/FilterData";
import { userStatic, userTableStatic } from '../../constants/statisticsData'
import StatCard from "../../components/StatCard";
import Button from "../../components/buttons/Button";
import ItemGap from "../../components/ItemGap";
import SearchFilter from "../../components/SearchFilter";
import TableCan from "../../components/TableCan";
import UsersRow from "./components/UsersRow";
import AddUserModal from "./components/AddUserModal";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = (booking: any) => {
    console.log("View details for:", booking);
  };

  const handleAddUser = (values: any) => {
    console.log("New user data:", values);
    // Handle the new user data here (e.g., API call)
  };

  return (
    <div className="">
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">User Management</h1>
          <div className="px-6">
            <Dropdown
              options={DateDropOptions}
              onChange={handleDetailsClick}
              placeholder="This Week"
              position="right-0"
            />
          </div>
        </HorizontalAlign>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {userStatic.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <HorizontalAlign>
          <ItemGap>
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
          heading="Users"
          showHeading={true}
          headerTr={['Username','Email','Phone No','Wallet Balance','Status','Actions','Other']}
          dataTr={userTableStatic}
          TrName={UsersRow}
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

export default UserManagement;