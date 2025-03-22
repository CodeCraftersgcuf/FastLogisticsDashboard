export const DateDropOptions = [
    { name: 'This week', value: '7' },
    { name: 'Last month', value: '30' },
    { name: 'Last 6 month', value: '180' },
    { name: 'Last year', value: '365' },
    { name: 'All time', value: '9999' },
];

export const onlineStatus = [
    { name: 'All', value: 'all' },
    { name: 'Online', value: 'online' },
    { name: 'Offline', value: 'offline' },
]

export const bulkOptions = [
    { name: 'Export as CSV', value: 'csv' },
    { name: 'Export as PDF', value: 'pdf' },
    { name: 'delete', value: 'delete', isdanger: true }
]

export const roles = [
    { id: '1', name: 'User', permissions: ['dashboard', 'view'] },
    { id: '2', name: 'Admin', permissions: ['dashboard', 'create', 'update', 'delete'] },
];

export const rolestabs = [
    { value: 'all', name: 'All' },
    { value: 'user', name: 'Users' },
    { value: 'rider', name: 'Riders' },
];

export const typeOptions = [
    { value: 'all', name: 'All' },
    { value: 'topup', name: 'topup' },
    { value: 'withdrawal', name: 'withdrawal' },
]

export const transactionstatus = [
    { value: 'all', name: 'All' },
    { value: 'pending', name: 'Pending' },
    { value: 'success', name: 'Success' },
    { value: 'failed', name: 'Failed' },
]

export const bookingStatus = [
    { value: 'all', name: 'All' },
    { value: 'active', name: 'active' },
    { value: 'completed', name: 'completed' },
    { value: 'Scheduled', name: 'Scheduled' },
]



export const riderStatus = [
    { "value": "all", "name": "All" },
    { "value": "activated", "name": "Activated" },
    { "value": "pending", "name": "Pending" },
    { "value": "rejected", "name": "Rejected" }
]

export const tierStatus = [
    { "value": "tier1", "name": "Tier 1" },
    { "value": "tier2", "name": "Tier 2" },
    { "value": "tier3", "name": "Tier 3" },
    { "value": "tier4", "name": "Tier 4" },
    { "value": "tier5", "name": "Tier 5" },
    { "value": "tier6", "name": "Tier 6" }
]

export const tierstatus = [
    { "value": "all", "name": "all" },
    { "value": "active", "name": "active" },
    { "value": "inactive", "name": "inactive" },
]