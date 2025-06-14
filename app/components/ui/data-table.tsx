import React, { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type FilterFn,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    type RowSelectionState,
} from '@tanstack/react-table'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { Button } from './button'
import { Input } from './input'

// Global filter function
const globalFilterFn: FilterFn<unknown> = (row, columnId, value) => {
    const search = value.toLowerCase()

    return Boolean(
        row.getValue(columnId)?.toString?.().toLowerCase().includes(search) ||
        Object.values(row.original as Record<string, unknown>).some((field) =>
            field?.toString?.().toLowerCase().includes(search)
        )
    )
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchable?: boolean
    filterable?: boolean
    selectable?: boolean
    pagination?: boolean
    pageSize?: number
    onRowClick?: (row: TData) => void
    loading?: boolean
    emptyMessage?: string
    className?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchable = true,
    filterable = true,
    selectable = false,
    pagination = true,
    pageSize = 10,
    onRowClick,
    loading = false,
    emptyMessage = "Tidak ada data untuk ditampilkan.",
    className = "",
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [globalFilter, setGlobalFilter] = useState('')
    const [showColumnVisibility, setShowColumnVisibility] = useState(false)

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            global: globalFilterFn,
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        enableRowSelection: selectable,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
    })

    const selectedRows = table.getFilteredSelectedRowModel().rows
    const isFiltered = table.getState().columnFilters.length > 0 || globalFilter.length > 0

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                    {/* Global Search */}
                    {searchable && (
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search all columns..."
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="pl-9 w-64"
                            />
                        </div>
                    )}

                    {/* Selected rows indicator */}
                    {selectable && selectedRows.length > 0 && (
                        <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <span className="text-sm text-blue-700 dark:text-blue-300">
                                {selectedRows.length} baris dipilih
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setRowSelection({})}
                                className="h-6 px-2 text-blue-700 dark:text-blue-300"
                            >
                                Clear
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {/* Filter indicator */}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setColumnFilters([])
                                setGlobalFilter('')
                            }}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <span className="ml-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                                {table.getState().columnFilters.length + (globalFilter ? 1 : 0)}
                            </span>
                        </Button>
                    )}

                    {/* Column visibility */}
                    {filterable && (
                        <div className="relative">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowColumnVisibility(!showColumnVisibility)}
                                className="h-8"
                            >
                                <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                                View
                            </Button>

                            {showColumnVisibility && (
                                <div className="absolute right-0 top-10 z-50 w-48 rounded-md border bg-white dark:bg-gray-800 shadow-lg">
                                    <div className="p-4 space-y-2">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                            Toggle columns
                                        </div>
                                        {table
                                            .getAllColumns()
                                            .filter((column) => column.getCanHide())
                                            .map((column) => {
                                                return (
                                                    <label key={column.id} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={column.getIsVisible()}
                                                            onChange={(e) =>
                                                                column.toggleVisibility(e.target.checked)
                                                            }
                                                            className="rounded border-gray-300"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                                            {column.id}
                                                        </span>
                                                    </label>
                                                )
                                            })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={`flex items-center space-x-2 ${header.column.getCanSort()
                                                                ? 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200'
                                                                : ''
                                                            }`}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault()
                                                                header.column.getToggleSortingHandler()?.(e)
                                                            }
                                                        }}
                                                        role="button"
                                                        tabIndex={header.column.getCanSort() ? 0 : -1}
                                                    >
                                                        <span>
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        </span>
                                                        {header.column.getCanSort() && (
                                                            <span className="text-gray-400">
                                                                {header.column.getIsSorted() === 'asc' && (
                                                                    <ChevronUpIcon className="h-4 w-4" />
                                                                )}
                                                                {header.column.getIsSorted() === 'desc' && (
                                                                    <ChevronDownIcon className="h-4 w-4" />
                                                                )}
                                                                {!header.column.getIsSorted() && (
                                                                    <div className="h-4 w-4" />
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                // Loading skeleton
                                Array.from({ length: pageSize }).map((_, index) => (
                                    <tr key={index}>
                                        {columns.map((_, colIndex) => (
                                            <td key={colIndex} className="px-4 py-4">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`
                      ${row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
                      ${onRowClick ? 'cursor-pointer' : ''}
                      transition-colors
                    `}
                                        onClick={() => onRowClick?.(row.original)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="h-24 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <span>
                            Page {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span>
                            {table.getFilteredRowModel().rows.length} total rows
                        </span>
                        {selectable && selectedRows.length > 0 && (
                            <>
                                <span className="text-gray-500">•</span>
                                <span>{selectedRows.length} selected</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Page size selector */}
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-sm"
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>

                        {/* Pagination buttons */}
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronDoubleLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronDoubleRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Export utility functions for column definitions
export const createSelectColumn = <TData,>(): ColumnDef<TData> => ({
    id: 'select',
    header: ({ table }) => (
        <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            className="rounded border-gray-300"
        />
    ),
    cell: ({ row }) => (
        <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            className="rounded border-gray-300"
        />
    ),
    enableSorting: false,
    enableHiding: false,
})

export const createActionsColumn = <TData,>(
    actions: Array<{
        label: string
        onClick: (row: TData) => void
        icon?: React.ComponentType<{ className?: string }>
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    }>
): ColumnDef<TData> => ({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
        <div className="flex items-center space-x-2">
            {actions.map((action, index) => {
                const Icon = action.icon
                return (
                    <Button
                        key={index}
                        variant={action.variant || 'ghost'}
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            action.onClick(row.original)
                        }}
                        className="h-8 px-2"
                    >
                        {Icon && <Icon className="h-4 w-4 mr-1" />}
                        {action.label}
                    </Button>
                )
            })}
        </div>
    ),
    enableSorting: false,
}) 