import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    CloudArrowUpIcon,
    DocumentIcon,
    PhotoIcon,
    VideoCameraIcon,
    MusicalNoteIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    TrashIcon
} from "@heroicons/react/24/outline"
import { Button } from "~/components/ui/Button"
import { Card, CardContent } from "~/components/ui/Card"
import { cn } from "~/lib/utils"

interface FileUploadProps {
    accept?: string
    multiple?: boolean
    maxSize?: number // in bytes
    maxFiles?: number
    onFilesChange?: (files: File[]) => void
    onUpload?: (files: File[]) => Promise<void>
    disabled?: boolean
    className?: string
    showPreview?: boolean
    allowedTypes?: string[]
}

interface UploadedFile {
    file: File
    id: string
    progress: number
    status: 'uploading' | 'completed' | 'error'
    preview?: string
    error?: string
}

const FileUpload = ({
    accept = "*/*",
    multiple = true,
    maxSize = 10 * 1024 * 1024, // 10MB
    maxFiles = 5,
    onFilesChange,
    onUpload,
    disabled = false,
    className,
    showPreview = true,
    allowedTypes = []
}: FileUploadProps) => {
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return PhotoIcon
        if (fileType.startsWith('video/')) return VideoCameraIcon
        if (fileType.startsWith('audio/')) return MusicalNoteIcon
        return DocumentIcon
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const validateFile = useCallback((file: File): string | null => {
        if (file.size > maxSize) {
            return `File size exceeds ${formatFileSize(maxSize)}`
        }

        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            return `File type ${file.type} is not allowed`
        }

        return null
    }, [maxSize, allowedTypes])

    const createFilePreview = useCallback((file: File): Promise<string | null> => {
        return new Promise((resolve) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => resolve(e.target?.result as string)
                reader.onerror = () => resolve(null)
                reader.readAsDataURL(file)
            } else {
                resolve(null)
            }
        })
    }, [])

    const processFiles = useCallback(async (fileList: FileList) => {
        const newFiles: UploadedFile[] = []

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i]
            const error = validateFile(file)
            const preview = await createFilePreview(file)

            newFiles.push({
                file,
                id: Math.random().toString(36).substring(2, 11),
                progress: 0,
                status: error ? 'error' : 'uploading',
                preview: preview || undefined,
                error: error || undefined
            })
        }

        const totalFiles = files.length + newFiles.length
        if (totalFiles > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`)
            return
        }

        setFiles(prev => [...prev, ...newFiles])
        onFilesChange?.(newFiles.map(f => f.file))

        // Start upload simulation
        if (onUpload && !newFiles.some(f => f.error)) {
            await simulateUpload(newFiles)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files.length, maxFiles, onFilesChange, onUpload, validateFile, createFilePreview])

    const simulateUpload = useCallback(async (filesToUpload: UploadedFile[]) => {
        setIsUploading(true)

        for (const uploadFile of filesToUpload) {
            if (uploadFile.error) continue

            // Simulate upload progress
            for (let progress = 0; progress <= 100; progress += 10) {
                await new Promise(resolve => setTimeout(resolve, 100))

                setFiles(prev => prev.map(f =>
                    f.id === uploadFile.id
                        ? { ...f, progress }
                        : f
                ))
            }

            // Mark as completed
            setFiles(prev => prev.map(f =>
                f.id === uploadFile.id
                    ? { ...f, status: 'completed' }
                    : f
            ))
        }

        setIsUploading(false)

        try {
            await onUpload?.(filesToUpload.map(f => f.file))
        } catch (error) {
            // Mark files as error
            setFiles(prev => prev.map(f =>
                filesToUpload.some(uf => uf.id === f.id)
                    ? { ...f, status: 'error', error: 'Upload failed' }
                    : f
            ))
        }
    }, [onUpload])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        if (disabled) return

        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles)
        }
    }, [disabled, processFiles])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            processFiles(selectedFiles)
        }
        // Reset input value
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const removeFile = (fileId: string) => {
        setFiles(prev => prev.filter(f => f.id !== fileId))
    }

    const openFileDialog = () => {
        if (!disabled) {
            fileInputRef.current?.click()
        }
    }

    const dropzoneVariants = {
        initial: { scale: 1, borderColor: '#e5e7eb' },
        dragOver: { scale: 1.02, borderColor: '#3b82f6' },
        disabled: { scale: 1, borderColor: '#d1d5db', opacity: 0.5 }
    }

    const fileItemVariants = {
        initial: { opacity: 0, y: 20, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.8 }
    }

    return (
        <div className={cn("w-full", className)}>
            {/* Dropzone */}
            <motion.div
                variants={dropzoneVariants}
                initial="initial"
                animate={disabled ? "disabled" : isDragOver ? "dragOver" : "initial"}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
                    isDragOver && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                    disabled && "cursor-not-allowed opacity-50",
                    !isDragOver && !disabled && "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileSelect}
                    disabled={disabled}
                    className="hidden"
                />

                <motion.div
                    animate={{ y: isDragOver ? -5 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center space-y-4"
                >
                    <motion.div
                        animate={{ 
                            scale: isDragOver ? 1.1 : 1,
                            rotate: isDragOver ? 5 : 0
                        }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center",
                            isDragOver 
                                ? "bg-blue-100 text-blue-600" 
                                : "bg-gray-100 text-gray-600"
                        )}
                    >
                        <CloudArrowUpIcon className="h-8 w-8" />
                    </motion.div>

                    <div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {isDragOver ? "Drop files here" : "Upload files"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Drag and drop files here, or click to select
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            Max {maxFiles} files, {formatFileSize(maxSize)} each
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={disabled}
                        className="pointer-events-none"
                    >
                        Choose Files
                    </Button>
                </motion.div>
            </motion.div>

            {/* File List */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-3"
                    >
                        {files.map((uploadedFile) => {
                            const FileIcon = getFileIcon(uploadedFile.file.type)
                            
                            return (
                                <motion.div
                                    key={uploadedFile.id}
                                    variants={fileItemVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    layout
                                >
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-4">
                                            <div className="flex items-center space-x-4">
                                                {/* File Icon/Preview */}
                                                <div className="flex-shrink-0">
                                                    {showPreview && uploadedFile.preview ? (
                                                        <img
                                                            src={uploadedFile.preview}
                                                            alt={uploadedFile.file.name}
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <FileIcon className="h-6 w-6 text-gray-600" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* File Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {uploadedFile.file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(uploadedFile.file.size)}
                                                    </p>
                                                    
                                                    {/* Progress Bar */}
                                                    {uploadedFile.status === 'uploading' && (
                                                        <div className="mt-2">
                                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${uploadedFile.progress}%` }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="bg-blue-500 h-1.5 rounded-full"
                                                                />
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {uploadedFile.progress}% uploaded
                                                            </p>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Error Message */}
                                                    {uploadedFile.error && (
                                                        <p className="text-xs text-red-600 mt-1">
                                                            {uploadedFile.error}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Status Icon */}
                                                <div className="flex-shrink-0">
                                                    {uploadedFile.status === 'completed' && (
                                                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                    )}
                                                    {uploadedFile.status === 'error' && (
                                                        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                                                    )}
                                                    {uploadedFile.status === 'uploading' && (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                                                        />
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center space-x-2">
                                                    {showPreview && uploadedFile.preview && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                window.open(uploadedFile.preview, '_blank')
                                                            }}
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeFile(uploadedFile.id)
                                                        }}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FileUpload
