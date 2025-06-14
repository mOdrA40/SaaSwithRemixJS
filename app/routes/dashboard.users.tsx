import type { MetaFunction } from "react-router"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import {
    UserPlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    ShieldCheckIcon,
    ShieldExclamationIcon,
    UserIcon,
} from "@heroicons/react/24/outline"
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
// import { Input } from "~/components/ui/Input"
import { DataTable, createSelectColumn, createActionsColumn } from "~/components/ui/DataTable"
import { queryKeys } from "~/lib/queryClient"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `User Management - ${COMPANY_INFO.name}` },
        { name: "description", content: "Kelola pengguna dan tim dengan mudah" },
    ]
}

// Types
interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: 'admin' | 'user' | 'moderator'
    status: 'active' | 'inactive' | 'pending'
    subscription: 'basic' | 'pro' | 'enterprise'
    lastLogin: Date
    createdAt: Date
    totalProjects: number
    storageUsed: number // in MB
}

interface UserModalData {
    type: 'create' | 'edit' | 'view' | 'delete'
    user?: User
}

// Mock API functions
const fetchUsers = async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 1200))

    return [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: undefined,
            role: 'admin',
            status: 'active',
            subscription: 'pro',
            lastLogin: new Date('2024-01-15T10:30:00'),
            createdAt: new Date('2023-06-15'),
            totalProjects: 15,
            storageUsed: 2500,
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: undefined,
            role: 'user',
            status: 'active',
            subscription: 'basic',
            lastLogin: new Date('2024-01-14T15:45:00'),
            createdAt: new Date('2023-08-22'),
            totalProjects: 8,
            storageUsed: 1200,
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            avatar: undefined,
            role: 'moderator',
            status: 'active',
            subscription: 'enterprise',
            lastLogin: new Date('2024-01-13T09:15:00'),
            createdAt: new Date('2023-04-10'),
            totalProjects: 25,
            storageUsed: 5800,
        },
        {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            avatar: undefined,
            role: 'user',
            status: 'pending',
            subscription: 'basic',
            lastLogin: new Date('2024-01-12T14:20:00'),
            createdAt: new Date('2024-01-12'),
            totalProjects: 2,
            storageUsed: 150,
        },
        {
            id: '5',
            name: 'Alex Brown',
            email: 'alex@example.com',
            avatar: undefined,
            role: 'user',
            status: 'inactive',
            subscription: 'pro',
            lastLogin: new Date('2023-12-28T11:30:00'),
            createdAt: new Date('2023-09-05'),
            totalProjects: 12,
            storageUsed: 3200,
        },
    ]
}

const deleteUser = async (userId: string) => {
    console.log('Deleting user:', userId)
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, make API call
    return { success: true }
}

const updateUserStatus = async (userId: string, status: User['status']) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return { success: true, userId, status }
}

export default function UserManagement() {
    const [modal, setModal] = useState<UserModalData | null>(null)
    const [selectedUsers] = useState<string[]>([])
    const queryClient = useQueryClient()

    // Queries
    const { data: users = [], isLoading } = useQuery({
        queryKey: queryKeys.users,
        queryFn: fetchUsers,
    })

    // Mutations
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onMutate: async (userId: string) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.users })

            // Snapshot the previous value
            const previousUsers = queryClient.getQueryData(queryKeys.users)

            // Optimistically update to the new value
            queryClient.setQueryData(queryKeys.users, (old: User[] | undefined) => {
                return old?.filter(user => user.id !== userId) || []
            })

            // Return a context object with the snapshotted value
            return { previousUsers }
        },
        onError: (_err, _userId, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            queryClient.setQueryData(queryKeys.users, context?.previousUsers)
            toast.error('Gagal menghapus user')
        },
        onSuccess: () => {
            toast.success('User berhasil dihapus')
            setModal(null)
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey: queryKeys.users })
        },
    })

    const updateStatusMutation = useMutation({
        mutationFn: ({ userId, status }: { userId: string; status: User['status'] }) =>
            updateUserStatus(userId, status),
        onMutate: async ({ userId, status }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.users })

            // Snapshot the previous value
            const previousUsers = queryClient.getQueryData(queryKeys.users)

            // Optimistically update to the new value
            queryClient.setQueryData(queryKeys.users, (old: User[] | undefined) => {
                return old?.map(user =>
                    user.id === userId
                        ? { ...user, status }
                        : user
                ) || []
            })

            // Return a context object with the snapshotted value
            return { previousUsers }
        },
        onError: (_err, _variables, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            queryClient.setQueryData(queryKeys.users, context?.previousUsers)
            toast.error('Gagal mengubah status user')
        },
        onSuccess: () => {
            toast.success('Status user berhasil diubah')
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey: queryKeys.users })
        },
    })

    // Table columns
    const columns: ColumnDef<User>[] = [
        createSelectColumn<User>(),
        {
            accessorKey: 'name',
            header: 'User',
            cell: ({ row }) => {
                const user = row.original
                return (
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            {user.avatar ? (
                                <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => {
                const role = row.getValue('role') as string
                const roleConfig = {
                    admin: { label: 'Admin', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', icon: ShieldExclamationIcon },
                    moderator: { label: 'Moderator', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: ShieldCheckIcon },
                    user: { label: 'User', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400', icon: UserIcon },
                }
                const config = roleConfig[role as keyof typeof roleConfig]
                const Icon = config.icon

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {config.label}
                    </span>
                )
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                const statusConfig = {
                    active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
                    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' },
                    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
                }
                const config = statusConfig[status as keyof typeof statusConfig]

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label}
                    </span>
                )
            },
        },
        {
            accessorKey: 'subscription',
            header: 'Plan',
            cell: ({ row }) => {
                const plan = row.getValue('subscription') as string
                const planConfig = {
                    basic: { label: 'Basic', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
                    pro: { label: 'Pro', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' },
                    enterprise: { label: 'Enterprise', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400' },
                }
                const config = planConfig[plan as keyof typeof planConfig]

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label}
                    </span>
                )
            },
        },
        {
            accessorKey: 'totalProjects',
            header: 'Projects',
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        <span className="font-medium">{row.getValue('totalProjects')}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: 'storageUsed',
            header: 'Storage',
            cell: ({ row }) => {
                const storageUsed = row.getValue('storageUsed') as number
                const storageGB = (storageUsed / 1024).toFixed(1)

                return (
                    <div className="text-right">
                        <span className="font-medium">{storageGB} GB</span>
                    </div>
                )
            },
        },
        {
            accessorKey: 'lastLogin',
            header: 'Last Login',
            cell: ({ row }) => {
                const lastLogin = row.getValue('lastLogin') as Date
                return (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format(lastLogin, 'dd MMM yyyy', { locale: id })}
                    </div>
                )
            },
        },
        createActionsColumn<User>([
            {
                label: 'View',
                icon: EyeIcon,
                variant: 'ghost',
                onClick: (user) => setModal({ type: 'view', user }),
            },
            {
                label: 'Edit',
                icon: PencilIcon,
                variant: 'ghost',
                onClick: (user) => setModal({ type: 'edit', user }),
            },
            {
                label: 'Delete',
                icon: TrashIcon,
                variant: 'ghost',
                onClick: (user) => setModal({ type: 'delete', user }),
            },
        ]),
    ]

    const handleBulkAction = (action: string) => {
        if (selectedUsers.length === 0) {
            toast.error('Pilih user terlebih dahulu')
            return
        }

        switch (action) {
            case 'activate':
                selectedUsers.forEach(userId => {
                    updateStatusMutation.mutate({ userId, status: 'active' })
                })
                break
            case 'deactivate':
                selectedUsers.forEach(userId => {
                    updateStatusMutation.mutate({ userId, status: 'inactive' })
                })
                break
            case 'delete':
                if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
                    selectedUsers.forEach(userId => {
                        deleteUserMutation.mutate(userId)
                    })
                }
                break
        }
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        👥 User Management
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Kelola pengguna dan tim dengan mudah
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {/* Bulk Actions */}
                    {selectedUsers.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBulkAction('activate')}
                            >
                                Activate ({selectedUsers.length})
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBulkAction('deactivate')}
                            >
                                Deactivate ({selectedUsers.length})
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleBulkAction('delete')}
                            >
                                Delete ({selectedUsers.length})
                            </Button>
                        </div>
                    )}

                    <Button
                        variant="gradient"
                        onClick={() => setModal({ type: 'create' })}
                    >
                        <UserPlusIcon className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <UserIcon className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {users.filter(u => u.status === 'active').length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {((users.filter(u => u.status === 'active').length / users.length) * 100).toFixed(1)}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pro Users</CardTitle>
                        <ShieldCheckIcon className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {users.filter(u => u.subscription === 'pro').length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Premium subscribers
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                        <UserIcon className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(users.reduce((acc, user) => acc + user.storageUsed, 0) / 1024).toFixed(1)} GB
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total storage usage
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        Manage your team members and their access levels
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={users}
                        loading={isLoading}
                        selectable={true}
                        searchable={true}
                        filterable={true}
                        pagination={true}
                        pageSize={10}
                        onRowClick={(user) => setModal({ type: 'view', user })}
                        emptyMessage="No users found. Add your first team member."
                    />
                </CardContent>
            </Card>

            {/* Modal for User Actions */}
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-6">
                            {modal.type === 'delete' && (
                                <>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                        Delete User
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                        Are you sure you want to delete <strong>{modal.user?.name}</strong>?
                                        This action cannot be undone.
                                    </p>
                                    <div className="flex justify-end space-x-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => setModal(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => modal.user && deleteUserMutation.mutate(modal.user.id)}
                                            disabled={deleteUserMutation.isPending}
                                        >
                                            {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </div>
                                </>
                            )}

                            {modal.type === 'view' && modal.user && (
                                <>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                        User Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                                <span className="text-white font-medium">
                                                    {modal.user.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {modal.user.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {modal.user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">Role</span>
                                                <p className="text-gray-900 dark:text-white capitalize">{modal.user.role}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">Status</span>
                                                <p className="text-gray-900 dark:text-white capitalize">{modal.user.status}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">Plan</span>
                                                <p className="text-gray-900 dark:text-white capitalize">{modal.user.subscription}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">Projects</span>
                                                <p className="text-gray-900 dark:text-white">{modal.user.totalProjects}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">Storage Used</span>
                                                <p className="text-gray-900 dark:text-white">{(modal.user.storageUsed / 1024).toFixed(1)} GB</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-500 dark:text-gray-400">Last Login</span>
                                                <p className="text-gray-900 dark:text-white">
                                                    {format(modal.user.lastLogin, 'dd MMM yyyy HH:mm', { locale: id })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <Button onClick={() => setModal(null)}>Close</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 