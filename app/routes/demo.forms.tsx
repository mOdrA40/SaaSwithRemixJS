import type { MetaFunction } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import MultiStepForm from "~/components/forms/MultiStepForm"
import FileUpload from "~/components/forms/FileUpload"
import { Button } from "~/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card"
import { Input } from "~/components/ui/Input"
import { Label } from "~/components/ui/Label"
import { COMPANY_INFO } from "~/data/constants"

export const meta: MetaFunction = () => {
    return [
        { title: `Form Components Demo - ${COMPANY_INFO.name}` },
        { name: "description", content: "Demonstration of advanced form components including multi-step wizards and file uploads" },
    ]
}

export default function FormsDemo() {
    const [selectedDemo, setSelectedDemo] = useState<'multistep' | 'fileupload' | 'validation'>('multistep')
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

    // Multi-step form steps
    const formSteps = [
        {
            id: 'personal',
            title: 'Personal Information',
            description: 'Tell us about yourself',
            component: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                </div>
            ),
            validation: (): Promise<boolean> => {
                // Simulate validation
                return new Promise<boolean>(resolve => {
                    setTimeout(() => resolve(true), 1000)
                })
            }
        },
        {
            id: 'company',
            title: 'Company Details',
            description: 'Information about your organization',
            component: (
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" placeholder="Acme Corporation" />
                    </div>
                    <div>
                        <Label htmlFor="industry">Industry</Label>
                        <select id="industry" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Select Industry</option>
                            <option value="tech">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="retail">Retail</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="employees">Number of Employees</Label>
                        <select id="employees" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Select Range</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="200+">200+</option>
                        </select>
                    </div>
                </div>
            ),
            validation: (): Promise<boolean> => {
                return new Promise<boolean>(resolve => {
                    setTimeout(() => resolve(true), 800)
                })
            }
        },
        {
            id: 'preferences',
            title: 'Preferences',
            description: 'Customize your experience',
            component: (
                <div className="space-y-4">
                    <div>
                        <Label>Notification Preferences</Label>
                        <div className="space-y-2 mt-2">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded" />
                                <span>Email notifications</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded" />
                                <span>SMS notifications</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded" />
                                <span>Push notifications</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <select id="timezone" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">Greenwich Mean Time</option>
                        </select>
                    </div>
                </div>
            ),
            optional: true
        }
    ]

    const handleFormComplete = (data: any) => {
        console.log("Form completed:", data)
        alert("Form completed successfully! (Demo)")
    }

    const handleStepChange = (step: number, direction: 'next' | 'prev') => {
        console.log(`Step changed to ${step} (${direction})`)
    }

    const handleFilesChange = (files: File[]) => {
        setUploadedFiles(files)
        console.log("Files changed:", files)
    }

    const handleFileUpload = async (files: File[]) => {
        console.log("Uploading files:", files)
        // Simulate upload
        return new Promise<void>((resolve) => {
            setTimeout(resolve, 2000)
        })
    }

    const demos = [
        {
            id: 'multistep' as const,
            title: 'Multi-Step Form',
            description: 'Wizard-style forms with validation and auto-save'
        },
        {
            id: 'fileupload' as const,
            title: 'File Upload',
            description: 'Drag & drop file upload with preview and progress'
        },
        {
            id: 'validation' as const,
            title: 'Form Validation',
            description: 'Real-time validation with beautiful error states'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Form Components
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Advanced form components with multi-step wizards, file uploads, real-time validation,
                            and beautiful animations for exceptional user experience.
                        </p>
                    </motion.div>

                    {/* Demo Selector */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-8"
                    >
                        {demos.map((demo) => (
                            <Button
                                key={demo.id}
                                onClick={() => setSelectedDemo(demo.id)}
                                variant={selectedDemo === demo.id ? "gradient" : "outline"}
                                size="lg"
                                className="px-6"
                            >
                                {demo.title}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                {/* Demo Content */}
                <motion.div
                    key={selectedDemo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {selectedDemo === 'multistep' && (
                        <div className="space-y-8">
                            <MultiStepForm
                                steps={formSteps}
                                onComplete={handleFormComplete}
                                onStepChange={handleStepChange}
                                autoSave={true}
                                showProgress={true}
                                allowSkip={true}
                            />

                            {/* Features Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Multi-Step Form Features</CardTitle>
                                    <CardDescription>
                                        Advanced wizard functionality with enterprise-grade features
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                ✓ Progress Tracking
                                            </h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                                Visual progress bar with step indicators
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                                                ✓ Auto-Save
                                            </h4>
                                            <p className="text-sm text-green-600 dark:text-green-300">
                                                Automatic form data persistence
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                                                ✓ Validation
                                            </h4>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">
                                                Step-by-step validation with async support
                                            </p>
                                        </div>
                                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">
                                                ✓ Navigation
                                            </h4>
                                            <p className="text-sm text-yellow-600 dark:text-yellow-300">
                                                Flexible step navigation and skipping
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {selectedDemo === 'fileupload' && (
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>File Upload Component</CardTitle>
                                    <CardDescription>
                                        Drag & drop file upload with preview and progress tracking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FileUpload
                                        accept="image/*,application/pdf,.doc,.docx"
                                        multiple={true}
                                        maxSize={10 * 1024 * 1024} // 10MB
                                        maxFiles={5}
                                        onFilesChange={handleFilesChange}
                                        onUpload={handleFileUpload}
                                        showPreview={true}
                                        allowedTypes={['image/jpeg', 'image/png', 'application/pdf']}
                                    />
                                </CardContent>
                            </Card>

                            {/* Upload Stats */}
                            {uploadedFiles.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <p className="text-2xl font-bold text-blue-600">{uploadedFiles.length}</p>
                                                <p className="text-sm text-blue-600">Files Selected</p>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <p className="text-2xl font-bold text-green-600">
                                                    {(uploadedFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(1)}MB
                                                </p>
                                                <p className="text-sm text-green-600">Total Size</p>
                                            </div>
                                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <p className="text-2xl font-bold text-purple-600">
                                                    {uploadedFiles.filter(f => f.type.startsWith('image/')).length}
                                                </p>
                                                <p className="text-sm text-purple-600">Images</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Features Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>File Upload Features</CardTitle>
                                    <CardDescription>
                                        Professional file handling with advanced capabilities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                📁 Drag & Drop
                                            </h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                                Intuitive drag and drop interface
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                                                🖼️ Image Preview
                                            </h4>
                                            <p className="text-sm text-green-600 dark:text-green-300">
                                                Thumbnail previews for images
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                                                📊 Progress Tracking
                                            </h4>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">
                                                Real-time upload progress bars
                                            </p>
                                        </div>
                                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">
                                                🔒 Validation
                                            </h4>
                                            <p className="text-sm text-yellow-600 dark:text-yellow-300">
                                                File type and size validation
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {selectedDemo === 'validation' && (
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Validation Demo</CardTitle>
                                    <CardDescription>
                                        Real-time validation with beautiful error states and animations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="validEmail">Email (Required)</Label>
                                                <Input 
                                                    id="validEmail" 
                                                    type="email" 
                                                    placeholder="Enter valid email"
                                                    className="mt-1"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Try entering an invalid email to see validation
                                                </p>
                                            </div>
                                            <div>
                                                <Label htmlFor="strongPassword">Strong Password</Label>
                                                <Input 
                                                    id="strongPassword" 
                                                    type="password" 
                                                    placeholder="Min 8 characters"
                                                    className="mt-1"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Must contain uppercase, lowercase, number
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="phoneNumber">Phone Number</Label>
                                            <Input 
                                                id="phoneNumber" 
                                                placeholder="+1 (555) 123-4567"
                                                className="mt-1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Format: +1 (555) 123-4567
                                            </p>
                                        </div>

                                        <div>
                                            <Label htmlFor="website">Website URL</Label>
                                            <Input 
                                                id="website" 
                                                placeholder="https://example.com"
                                                className="mt-1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Must be a valid URL starting with http:// or https://
                                            </p>
                                        </div>

                                        <Button variant="gradient" className="w-full">
                                            Validate Form
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Validation Features */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Validation Features</CardTitle>
                                    <CardDescription>
                                        Comprehensive form validation with user-friendly feedback
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                ⚡ Real-time Validation
                                            </h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                                Instant feedback as users type
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                                                🎨 Visual Feedback
                                            </h4>
                                            <p className="text-sm text-green-600 dark:text-green-300">
                                                Color-coded success and error states
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <h4 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                                                📝 Custom Rules
                                            </h4>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">
                                                Flexible validation rule system
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
