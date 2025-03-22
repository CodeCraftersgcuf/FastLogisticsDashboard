import React, { useState } from "react";
import SettingHeader from "../component/SettingHeader";
import { adminStatics, adminUsers } from "../../../constants/statisticsData";
import StatCard from "../../../components/StatCard";
import HorizontalAlign from "../../../components/HorizontalAlign";
import Dropdown from "../../../components/Dropdown";
import { onlineStatus } from "../../../components/FilterData";
import ItemGap from "../../../components/ItemGap";
import Button from "../../../components/buttons/Button";
import SearchFilter from "../../../components/SearchFilter";
import TableCan from "../../../components/TableCan";
import UsersRow from "../../userManagement/components/UsersRow";
import AdminRow from "../component/AdminRow";
import AddAdminModal from "../component/AddAdminModal";
import { useNavigate } from "react-router-dom";

const AdminManagement = () => {
    const navigate = useNavigate();
    const handleDetailsClick = (e) => {
        console.log("Status selected:", e.target.value);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAdmin = (values: any) => {
        console.log('New admin values:', values);
        setIsModalOpen(false);
    };
    return (
        <>
            <SettingHeader url={'Admin Management'} />
            <div className="flex p-6 flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {adminStatics.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <HorizontalAlign>
                    <Dropdown
                        options={onlineStatus}
                        onChange={handleDetailsClick}
                        placeholder="Status"
                        position="left-0"
                    />
                    <ItemGap>
                        <Button handleFunction={() => setIsModalOpen(true)}>
                            Add New
                        </Button>
                        <Button handleFunction={() => navigate('/settings/admin/management')}>
                            Role Management
                        </Button>
                        <SearchFilter />
                    </ItemGap>
                </HorizontalAlign>
                <TableCan
                    heading="Users"
                    showHeading={true}
                    headerTr={['Username', 'Role', 'date joined', 'status', 'actions']}
                    dataTr={adminUsers}
                    TrName={AdminRow}
                />
                <AddAdminModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddAdmin}
                />
            </div>
        </>
    );
};

export default AdminManagement;
