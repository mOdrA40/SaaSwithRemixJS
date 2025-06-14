import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Command } from 'cmdk'
import {
    MagnifyingGlassIcon,
    HomeIcon,
    ChartBarIcon,
    UsersIcon,
    CogIcon,
    DocumentIcon,
    FolderIcon,
    BellIcon,
    UserPlusIcon,
    PlusIcon,
    ArrowRightIcon,
    CommandLineIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'
import { useStore } from '~/lib/store'

interface CommandItem {
    id: string
    label: string
    description?: string
    icon?: React.ComponentType<{ className?: string }>
    shortcut?: string[]
    action: () => void
    category: string
    keywords?: string[]
    url?: string
}

interface CommandPaletteProps {
    isOpen: boolean
    onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [search, setSearch] = useState('')
    const [pages, setPages] = useState<string[]>(['home'])
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    const { addNotification } = useStore()

    // Define all available commands
    const commands: CommandItem[] = useMemo(() => [
        // Navigation
        {
            id: 'nav-dashboard',
            label: 'Dashboard',
            description: 'Go to dashboard overview',
            icon: HomeIcon,
            shortcut: ['g', 'd'],
            action: () => { navigate('/dashboard'); onClose() },
            category: 'Navigation',
            keywords: ['dashboard', 'home', 'overview'],
            url: '/dashboard',
        },
        {
            id: 'nav-analytics',
            label: 'Analytics',
            description: 'View real-time analytics',
            icon: ChartBarIcon,
            shortcut: ['g', 'a'],
            action: () => { navigate('/dashboard/analytics'); onClose() },
            category: 'Navigation',
            keywords: ['analytics', 'charts', 'data', 'metrics'],
            url: '/dashboard/analytics',
        },
        {
            id: 'nav-users',
            label: 'User Management',
            description: 'Manage users and team',
            icon: UsersIcon,
            shortcut: ['g', 'u'],
            action: () => { navigate('/dashboard/users'); onClose() },
            category: 'Navigation',
            keywords: ['users', 'team', 'members', 'people'],
            url: '/dashboard/users',
        },
        {
            id: 'nav-files',
            label: 'File Manager',
            description: 'Browse and manage files',
            icon: FolderIcon,
            shortcut: ['g', 'f'],
            action: () => { navigate('/dashboard/files'); onClose() },
            category: 'Navigation',
            keywords: ['files', 'documents', 'storage', 'upload'],
            url: '/dashboard/files',
        },
        {
            id: 'nav-settings',
            label: 'Settings',
            description: 'Account and preferences',
            icon: CogIcon,
            shortcut: ['g', 's'],
            action: () => { navigate('/dashboard/settings'); onClose() },
            category: 'Navigation',
            keywords: ['settings', 'preferences', 'account', 'profile'],
            url: '/dashboard/settings',
        },
        {
            id: 'nav-billing',
            label: 'Billing',
            description: 'Manage subscription and billing',
            icon: DocumentIcon,
            shortcut: ['g', 'b'],
            action: () => { navigate('/dashboard/billing'); onClose() },
            category: 'Navigation',
            keywords: ['billing', 'subscription', 'payment', 'plan'],
            url: '/dashboard/billing',
        },

        // Actions
        {
            id: 'action-new-user',
            label: 'Add New User',
            description: 'Invite a new team member',
            icon: UserPlusIcon,
            shortcut: ['n', 'u'],
            action: () => {
                navigate('/dashboard/users')
                // Trigger add user modal
                addNotification({
                    title: 'Add User',
                    message: 'Add user modal would open here',
                    type: 'info',
                    read: false,
                })
                onClose()
            },
            category: 'Actions',
            keywords: ['add', 'new', 'user', 'invite', 'team member'],
        },
        {
            id: 'action-upload-file',
            label: 'Upload File',
            description: 'Upload a new file',
            icon: PlusIcon,
            shortcut: ['n', 'f'],
            action: () => {
                navigate('/dashboard/files')
                onClose()
            },
            category: 'Actions',
            keywords: ['upload', 'file', 'document', 'new'],
        },
        {
            id: 'action-create-folder',
            label: 'Create Folder',
            description: 'Create a new folder',
            icon: FolderIcon,
            shortcut: ['n', 'd'],
            action: () => {
                navigate('/dashboard/files')
                addNotification({
                    title: 'Create Folder',
                    message: 'Create folder dialog would open here',
                    type: 'info',
                    read: false,
                })
                onClose()
            },
            category: 'Actions',
            keywords: ['create', 'folder', 'directory', 'new'],
        },

        // Quick Settings
        {
            id: 'setting-theme-toggle',
            label: 'Toggle Theme',
            description: 'Switch between light and dark mode',
            icon: CogIcon,
            shortcut: ['t', 't'],
            action: () => {
                // Theme toggle logic would go here
                addNotification({
                    title: 'Theme Changed',
                    message: 'Theme toggle functionality would work here',
                    type: 'success',
                    read: false,
                })
                onClose()
            },
            category: 'Settings',
            keywords: ['theme', 'dark', 'light', 'mode', 'appearance'],
        },
        {
            id: 'setting-notifications',
            label: 'Notification Center',
            description: 'View all notifications',
            icon: BellIcon,
            shortcut: ['n', 'n'],
            action: () => {
                addNotification({
                    title: 'Notification Center',
                    message: 'Notification center would open here',
                    type: 'info',
                    read: false,
                })
                onClose()
            },
            category: 'Settings',
            keywords: ['notifications', 'alerts', 'messages'],
        },

        // Help & Documentation
        {
            id: 'help-shortcuts',
            label: 'Keyboard Shortcuts',
            description: 'View all keyboard shortcuts',
            icon: CommandLineIcon,
            shortcut: ['?'],
            action: () => {
                setPages(['shortcuts'])
            },
            category: 'Help',
            keywords: ['shortcuts', 'keyboard', 'hotkeys', 'help'],
        },
    ], [addNotification, navigate, onClose])

    // Filter commands based on current page and search
    const getFilteredCommands = () => {
        if (pages[pages.length - 1] === 'shortcuts') {
            return commands.filter(cmd => cmd.shortcut && cmd.shortcut.length > 0)
        }

        if (!search) return commands

        return commands.filter(command => {
            const searchLower = search.toLowerCase()
            return (
                command.label.toLowerCase().includes(searchLower) ||
                command.description?.toLowerCase().includes(searchLower) ||
                command.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
                command.category.toLowerCase().includes(searchLower)
            )
        })
    }

    // Group commands by category
    const groupedCommands = getFilteredCommands().reduce((acc, command) => {
        if (!acc[command.category]) {
            acc[command.category] = []
        }
        acc[command.category].push(command)
        return acc
    }, {} as Record<string, CommandItem[]>)

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Close on Escape
            if (e.key === 'Escape') {
                if (pages.length > 1) {
                    setPages(pages.slice(0, -1))
                } else {
                    onClose()
                }
                return
            }

            // Global shortcuts (when palette is closed)
            if (!isOpen) {
                // Cmd/Ctrl + K to open
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault()
                    useStore.getState().setCommandPaletteOpen(true)
                    return
                }

                // Check for command shortcuts
                // const activeShortcuts = [] as string[]

                // Simple shortcut detection (this would be more sophisticated in real app)
                commands.forEach(command => {
                    if (command.shortcut && command.shortcut.length === 1 && e.key === command.shortcut[0]) {
                        if (e.ctrlKey || e.metaKey) {
                            e.preventDefault()
                            command.action()
                        }
                    }
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, pages, onClose, commands])

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    if (!isOpen) return null

    const currentPage = pages[pages.length - 1]

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed top-[15%] left-1/2 w-full max-w-2xl -translate-x-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Command
                    value={search}
                    onValueChange={setSearch}
                    shouldFilter={false}
                    className="relative"
                >
                    {/* Header */}
                    <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <Command.Input
                            ref={inputRef}
                            placeholder={
                                currentPage === 'shortcuts'
                                    ? 'Search shortcuts...'
                                    : 'Type a command or search...'
                            }
                            className="flex-1 bg-transparent border-0 outline-0 text-gray-900 dark:text-white placeholder-gray-400 py-4 text-lg"
                            value={search}
                            onValueChange={setSearch}
                        />

                        {/* Breadcrumb */}
                        {pages.length > 1 && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                {pages.map((page, index) => (
                                    <React.Fragment key={page}>
                                        {index > 0 && <ArrowRightIcon className="h-3 w-3" />}
                                        <span className="capitalize">{page}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {/* Close hint */}
                        <div className="ml-4 text-xs text-gray-400">
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">ESC</kbd>
                        </div>
                    </div>

                    {/* Results */}
                    <Command.List className="max-h-96 overflow-y-auto p-2">
                        {currentPage === 'shortcuts' ? (
                            // Keyboard shortcuts page
                            <div className="space-y-2">
                                <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Keyboard Shortcuts
                                </div>
                                {getFilteredCommands().map((command) => (
                                    <Command.Item
                                        key={command.id}
                                        value={command.id}
                                        onSelect={() => command.action()}
                                        className="flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors data-[selected]:bg-gray-100 dark:data-[selected]:bg-gray-800"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {command.icon && (
                                                <command.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                            )}
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {command.label}
                                                </div>
                                                {command.description && (
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {command.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {command.shortcut && (
                                            <div className="flex items-center space-x-1">
                                                {command.shortcut.map((key, index) => (
                                                    <kbd
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono"
                                                    >
                                                        {key}
                                                    </kbd>
                                                ))}
                                            </div>
                                        )}
                                    </Command.Item>
                                ))}

                                <Command.Item
                                    value="back"
                                    onSelect={() => setPages(['home'])}
                                    className="flex items-center px-3 py-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors data-[selected]:bg-gray-100 dark:data-[selected]:bg-gray-800"
                                >
                                    <ArrowRightIcon className="h-4 w-4 text-gray-500 mr-3 rotate-180" />
                                    <span className="text-gray-600 dark:text-gray-400">Back to commands</span>
                                </Command.Item>
                            </div>
                        ) : (
                            // Regular commands
                            <>
                                {Object.keys(groupedCommands).length === 0 && (
                                    <Command.Empty className="px-6 py-12 text-center">
                                        <MagnifyingGlassIcon className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                                        <div className="text-gray-500 dark:text-gray-400">
                                            No commands found for &ldquo;{search}&rdquo;
                                        </div>
                                        <div className="text-sm text-gray-400 mt-2">
                                            Try searching for navigation, actions, or settings
                                        </div>
                                    </Command.Empty>
                                )}

                                {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                                    <Command.Group key={category} heading={category}>
                                        {categoryCommands.map((command) => (
                                            <Command.Item
                                                key={command.id}
                                                value={command.id}
                                                onSelect={() => command.action()}
                                                className="flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors data-[selected]:bg-gray-100 dark:data-[selected]:bg-gray-800 group"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    {command.icon && (
                                                        <command.icon className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {command.label}
                                                        </div>
                                                        {command.description && (
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {command.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {command.shortcut && (
                                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {command.shortcut.map((key, index) => (
                                                            <kbd
                                                                key={index}
                                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono"
                                                            >
                                                                {key}
                                                            </kbd>
                                                        ))}
                                                    </div>
                                                )}
                                            </Command.Item>
                                        ))}
                                    </Command.Group>
                                ))}
                            </>
                        )}
                    </Command.List>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">↑↓</kbd>
                                <span>Navigate</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">⏎</kbd>
                                <span>Select</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">ESC</kbd>
                                <span>Close</span>
                            </div>
                        </div>

                        <div className="text-gray-400">
                            ⌘K to open anytime
                        </div>
                    </div>
                </Command>
            </div>
        </div>
    )
}

// Hook for using command palette
export function useCommandPalette() {
    const { commandPaletteOpen, setCommandPaletteOpen } = useStore()

    const open = () => setCommandPaletteOpen(true)
    const close = () => setCommandPaletteOpen(false)
    const toggle = () => setCommandPaletteOpen(!commandPaletteOpen)

    return {
        isOpen: commandPaletteOpen,
        open,
        close,
        toggle,
    }
}
