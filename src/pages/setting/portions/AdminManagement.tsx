import React, { useState, useMemo } from "react";
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
import AdminRow from "../component/AdminRow";
import AddAdminModal from "../component/AddAdminModal";
import { useNavigate } from "react-router-dom";

const AdminManagement  : React.FC= () => {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter users based on status and search query
    const filteredUsers = useMemo(() => {
        return adminUsers.filter(user => {
            const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus.toLowerCase();
            const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [selectedStatus, searchQuery]);

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

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
                        onChange={handleStatusChange}
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
                        <SearchFilter handleFunction={handleSearch} />
                    </ItemGap>
                </HorizontalAlign>
                <TableCan
                    heading="Users"
                    showHeading={true}
                    headerTr={['Username', 'Role', 'date joined', 'status', 'actions']}
                    dataTr={filteredUsers}
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