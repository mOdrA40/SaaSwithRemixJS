import type { MetaFunction } from "react-router"
import { useState, useCallback } from "react"
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useDropzone } from 'react-dropzone'
import {
    FolderIcon,
    DocumentIcon,
    CloudArrowUpIcon,
    MagnifyingGlassIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    ShareIcon,
    FolderPlusIcon,
    DocumentPlusIcon,
    PhotoIcon,
    FilmIcon,
    MusicalNoteIcon,
    ArchiveBoxIcon,
} from "@heroicons/react/24/outline"
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card"
import { Button } from "~/components/ui/Button"
import { Input } from "~/components/ui/Input"
import { useFileManager } from "~/lib/store"
import { queryKeys } from "~/lib/queryClient"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `File Manager - ${COMPANY_INFO.name}` },
        { name: "description", content: "Kelola file dan folder dengan mudah" },
    ]
}

// Types
interface FileItem {
    id: string
    name: string
    type: 'file' | 'folder'
    size?: number
    mimeType?: string
    parentId?: string
    createdAt: Date
    updatedAt: Date
    sharedWith?: string[]
    isPublic?: boolean
    url?: string
    thumbnail?: string
}

interface UploadProgress {
    progress: number
    status: 'uploading' | 'complete' | 'error'
}

// Mock API functions
const fetchFiles = async (folderId?: string): Promise<FileItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 800))

    const allFiles: FileItem[] = [
        {
            id: '1',
            name: 'Documents',
            type: 'folder',
            parentId: undefined,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-10'),
        },
        {
            id: '2',
            name: 'Images',
            type: 'folder',
            parentId: undefined,
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-12'),
        },
        {
            id: '3',
            name: 'Videos',
            type: 'folder',
            parentId: undefined,
            createdAt: new Date('2024-01-08'),
            updatedAt: new Date('2024-01-14'),
        },
        {
            id: '4',
            name: 'Project Proposal.pdf',
            type: 'file',
            size: 2457600, // 2.4 MB
            mimeType: 'application/pdf',
            parentId: '1',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            isPublic: false,
            url: '/files/project-proposal.pdf',
        },
        {
            id: '5',
            name: 'Meeting Notes.docx',
            type: 'file',
            size: 1048576, // 1 MB
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            parentId: '1',
            createdAt: new Date('2024-01-02'),
            updatedAt: new Date('2024-01-02'),
            isPublic: false,
            url: '/files/meeting-notes.docx',
        },
        {
            id: '6',
            name: 'hero-image.jpg',
            type: 'file',
            size: 3145728, // 3 MB
            mimeType: 'image/jpeg',
            parentId: '2',
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05'),
            isPublic: true,
            url: '/images/hero-image.jpg',
            thumbnail: '/images/hero-image-thumb.jpg',
        },
        {
            id: '7',
            name: 'presentation.mp4',
            type: 'file',
            size: 52428800, // 50 MB
            mimeType: 'video/mp4',
            parentId: '3',
            createdAt: new Date('2024-01-08'),
            updatedAt: new Date('2024-01-08'),
            isPublic: false,
            url: '/videos/presentation.mp4',
        },
    ]

    return allFiles.filter(file => file.parentId === folderId)
}

// Infinite query API for large file lists
interface FilesPage {
    files: FileItem[]
    nextCursor?: string
    hasMore: boolean
    totalCount: number
}

const fetchFilesInfinite = async ({
    pageParam = 0,
    folderId,
    searchQuery = ''
}: {
    pageParam?: number
    folderId?: string
    searchQuery?: string
}): Promise<FilesPage> => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate more files for demo
    const generateFiles = (count: number, offset: number): FileItem[] => {
        return Array.from({ length: count }, (_, i) => ({
            id: `file-${offset + i}`,
            name: `Document ${offset + i + 1}.pdf`,
            type: 'file' as const,
            size: Math.floor(Math.random() * 5000000) + 100000, // 100KB - 5MB
            mimeType: 'application/pdf',
            parentId: folderId,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
            isPublic: Math.random() > 0.5,
            url: `/files/document-${offset + i + 1}.pdf`,
        }))
    }

    const pageSize = 20
    const offset = pageParam * pageSize
    const files = generateFiles(pageSize, offset)

    // Filter by search query
    const filteredFiles = searchQuery
        ? files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : files

    return {
        files: filteredFiles,
        nextCursor: pageParam < 4 ? (pageParam + 1).toString() : undefined, // Max 5 pages
        hasMore: pageParam < 4,
        totalCount: 100 // Total files available
    }
}

const uploadFile = async (file: File, folderId?: string) => {
    // Simulate upload with progress
    return new Promise<FileItem>((resolve) => {
        setTimeout(() => {
            resolve({
                id: crypto.randomUUID(),
                name: file.name,
                type: 'file',
                size: file.size,
                mimeType: file.type,
                parentId: folderId,
                createdAt: new Date(),
                updatedAt: new Date(),
                isPublic: false,
                url: `/files/${file.name}`,
            })
        }, 2000)
    })
}

const deleteFile = async (fileId: string) => {
    console.log('Deleting file:', fileId)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
}

// const renameFile = async (_fileId: string, _newName: string) => {
//     await new Promise(resolve => setTimeout(resolve, 500))
//     return { success: true }
// }

export default function FileManager() {
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [contextMenu, setContextMenu] = useState<{ fileId: string; x: number; y: number } | null>(null)
    const [uploadProgress, setUploadProgress] = useState<Record<string, UploadProgress>>({})
    const [useInfiniteScroll, setUseInfiniteScroll] = useState(false)

    const { currentFolder, setCurrentFolder } = useFileManager()
    const queryClient = useQueryClient()

    // Regular query for small file lists
    const { data: files = [], isLoading } = useQuery({
        queryKey: queryKeys.filesList(currentFolder || undefined),
        queryFn: () => fetchFiles(currentFolder || undefined),
        enabled: !useInfiniteScroll,
    })

    // Infinite query for large file lists
    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isInfiniteLoading,
    } = useInfiniteQuery<FilesPage, Error>({
        queryKey: ['files-infinite', currentFolder, searchQuery],
        queryFn: ({ pageParam = 0 }) => fetchFilesInfinite({
            pageParam: pageParam as number,
            folderId: currentFolder || undefined,
            searchQuery
        }),
        getNextPageParam: (lastPage: FilesPage) => lastPage.nextCursor ? parseInt(lastPage.nextCursor) : undefined,
        initialPageParam: 0,
        enabled: useInfiniteScroll,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    // Flatten infinite query data
    const infiniteFiles = infiniteData?.pages.flatMap((page: FilesPage) => page.files) || []
    const totalCount = infiniteData?.pages[0]?.totalCount || 0

    // Mutations
    const uploadMutation = useMutation({
        mutationFn: ({ file, folderId }: { file: File; folderId?: string }) =>
            uploadFile(file, folderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.filesList(currentFolder || undefined) })
            toast.success('File uploaded successfully')
        },
        onError: () => {
            toast.error('Failed to upload file')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.filesList(currentFolder || undefined) })
            toast.success('File deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete file')
        },
    })

    // Drag & Drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const fileId = crypto.randomUUID()

            // Start upload progress
            setUploadProgress(prev => ({
                ...prev,
                [fileId]: { progress: 0, status: 'uploading' }
            }))

            // Simulate progress
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    const current = prev[fileId]?.progress || 0
                    if (current >= 100) {
                        clearInterval(interval)
                        return {
                            ...prev,
                            [fileId]: { progress: 100, status: 'complete' }
                        }
                    }
                    return {
                        ...prev,
                        [fileId]: { progress: current + 10, status: 'uploading' }
                    }
                })
            }, 200)

            // Upload file
            uploadMutation.mutate({
                file,
                folderId: currentFolder || undefined
            })
        })
    }, [currentFolder, uploadMutation])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'video/*': ['.mp4', '.avi', '.mov'],
            'audio/*': ['.mp3', '.wav'],
        },
        maxSize: 100 * 1024 * 1024, // 100MB
    })

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getFileIcon = (file: FileItem) => {
        if (file.type === 'folder') {
            return <FolderIcon className="h-8 w-8 text-blue-500" />
        }

        const mimeType = file.mimeType || ''
        if (mimeType.startsWith('image/')) {
            return <PhotoIcon className="h-8 w-8 text-green-500" />
        }
        if (mimeType.startsWith('video/')) {
            return <FilmIcon className="h-8 w-8 text-purple-500" />
        }
        if (mimeType.startsWith('audio/')) {
            return <MusicalNoteIcon className="h-8 w-8 text-orange-500" />
        }
        if (mimeType === 'application/pdf') {
            return <DocumentIcon className="h-8 w-8 text-red-500" />
        }
        if (mimeType.includes('zip') || mimeType.includes('rar')) {
            return <ArchiveBoxIcon className="h-8 w-8 text-yellow-500" />
        }

        return <DocumentIcon className="h-8 w-8 text-gray-500" />
    }

    const handleFileClick = (file: FileItem) => {
        if (file.type === 'folder') {
            setCurrentFolder(file.id)
        }
    }

    const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
        e.preventDefault()
        setContextMenu({ fileId, x: e.clientX, y: e.clientY })
    }

    // Determine which files to display
    const displayFiles = useInfiniteScroll ? infiniteFiles : files
    const filteredFiles = displayFiles.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const isLoadingFiles = useInfiniteScroll ? isInfiniteLoading : isLoading

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        📁 File Manager
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Kelola file dan folder dengan mudah
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    {/* Infinite Scroll Toggle */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                            Large List Mode:
                        </label>
                        <button
                            onClick={() => setUseInfiniteScroll(!useInfiniteScroll)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                useInfiniteScroll
                                    ? 'bg-blue-600'
                                    : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    useInfiniteScroll ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <Button variant="outline" size="sm">
                        <FolderPlusIcon className="h-4 w-4 mr-2" />
                        New Folder
                    </Button>
                    <Button variant="gradient">
                        <DocumentPlusIcon className="h-4 w-4 mr-2" />
                        Upload File
                    </Button>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <button
                    onClick={() => setCurrentFolder(null)}
                    className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Home
                </button>
                {currentFolder && (
                    <>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white">
                            {files.find(f => f.id === currentFolder)?.name || 'Unknown'}
                        </span>
                    </>
                )}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                    {/* Search */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-64"
                        />
                    </div>

                    {/* Selected indicator */}
                    {selectedFiles.length > 0 && (
                        <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <span className="text-sm text-blue-700 dark:text-blue-300">
                                {selectedFiles.length} selected
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFiles([])}
                                className="h-6 px-2 text-blue-700 dark:text-blue-300"
                            >
                                Clear
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {/* View toggle */}
                    <div className="flex items-center border rounded-md">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="rounded-r-none"
                        >
                            Grid
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="rounded-l-none"
                        >
                            List
                        </Button>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <Card>
                <CardContent className="p-0">
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        {isDragActive ? (
                            <p className="text-blue-600 dark:text-blue-400">
                                Drop the files here...
                            </p>
                        ) : (
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    <span className="font-medium">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                    PNG, JPG, PDF, DOC, MP4 up to 100MB
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Uploading Files</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.entries(uploadProgress).map(([fileId, progress]) => (
                            <div key={fileId} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>File {fileId.slice(0, 8)}</span>
                                    <span>{progress.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${progress.status === 'complete'
                                                ? 'bg-green-500'
                                                : progress.status === 'error'
                                                    ? 'bg-red-500'
                                                    : 'bg-blue-500'
                                            }`}
                                        style={{ width: `${progress.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* File Grid/List */}
            <Card>
                <CardContent className="p-6">
                    {/* Stats for infinite scroll */}
                    {useInfiniteScroll && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-blue-700 dark:text-blue-300">
                                    📊 Infinite Scroll Mode: Showing {infiniteFiles.length} of {totalCount} files
                                </span>
                                <span className="text-blue-600 dark:text-blue-400">
                                    {hasNextPage ? 'More available' : 'All loaded'}
                                </span>
                            </div>
                        </div>
                    )}

                    {isLoadingFiles ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="p-4 border rounded-lg">
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : filteredFiles.length === 0 ? (
                        <div className="text-center py-12">
                            <FolderIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchQuery ? 'No files found matching your search.' : 'This folder is empty.'}
                            </p>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedFiles.includes(file.id)
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    onClick={() => handleFileClick(file)}
                                    onContextMenu={(e) => handleContextMenu(e, file.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault()
                                            handleFileClick(file)
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="flex flex-col items-center space-y-3">
                                        {file.thumbnail ? (
                                            <img
                                                src={file.thumbnail}
                                                alt={file.name}
                                                className="h-16 w-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="h-16 w-16 flex items-center justify-center">
                                                {getFileIcon(file)}
                                            </div>
                                        )}

                                        <div className="text-center w-full">
                                            <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {file.type === 'folder' ? 'Folder' : formatFileSize(file.size || 0)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {format(file.updatedAt, 'dd MMM yyyy', { locale: id })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedFiles.includes(file.id)
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : ''
                                        }`}
                                    onClick={() => handleFileClick(file)}
                                    onContextMenu={(e) => handleContextMenu(e, file.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault()
                                            handleFileClick(file)
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="flex-shrink-0">
                                        {getFileIcon(file)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {format(file.updatedAt, 'dd MMM yyyy HH:mm', { locale: id })}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {file.type === 'folder' ? 'Folder' : formatFileSize(file.size || 0)}
                                        </p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleContextMenu(e, file.id)
                                        }}
                                    >
                                        <EllipsisVerticalIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More Button for Infinite Scroll */}
                    {useInfiniteScroll && hasNextPage && (
                        <div className="mt-6 text-center">
                            <Button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                variant="outline"
                                size="lg"
                            >
                                {isFetchingNextPage ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        <span>Loading more...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <ArrowDownTrayIcon className="h-4 w-4" />
                                        <span>Load More Files</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={() => setContextMenu(null)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setContextMenu(null)
                        }
                    }}
                    role="menu"
                    tabIndex={0}
                >
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        <EyeIcon className="h-4 w-4" />
                        <span>Preview</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        <ShareIcon className="h-4 w-4" />
                        <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        <PencilIcon className="h-4 w-4" />
                        <span>Rename</span>
                    </button>
                    <hr className="my-1" />
                    <button
                        className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left text-red-600 dark:text-red-400"
                        onClick={() => {
                            deleteMutation.mutate(contextMenu.fileId)
                            setContextMenu(null)
                        }}
                    >
                        <TrashIcon className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </div>
            )}

            {/* Click outside to close context menu */}
            {contextMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setContextMenu(null)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setContextMenu(null)
                        }
                    }}
                    role="button"
                    tabIndex={0}
                />
            )}
        </div>
    )
} 