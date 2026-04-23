'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PrescriptionUploadProps {
  onUpload: (file: File) => void
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function PrescriptionUpload({
  onUpload,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
}: PrescriptionUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('prescription', file)

      const response = await fetch('/api/marketplace/prescriptions/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      return response.json()
    },
    onSuccess: (data) => {
      setUploadStatus('success')
      onUpload(uploadedFile!)
    },
    onError: () => {
      setUploadStatus('error')
    },
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      alert('Please upload a valid file type (JPEG, PNG, WebP, or PDF)')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploadedFile(file)
    setUploadStatus('uploading')
    uploadMutation.mutate(file)
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setUploadStatus('idle')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Upload Prescription
        </CardTitle>
        <CardDescription>
          Upload a photo or scan of your prescription for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedFile && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your prescription here</p>
              <p className="text-muted-foreground">or click to browse files</p>
              <p className="text-xs text-muted-foreground">
                Supports JPEG, PNG, WebP, PDF • Max {maxSize}MB
              </p>
            </div>
            <input
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              id="prescription-upload"
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => document.getElementById('prescription-upload')?.click()}
            >
              Choose File
            </Button>
          </div>
        )}

        {uploadedFile && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {uploadStatus === 'uploading' && (
                  <Badge variant="secondary">Uploading...</Badge>
                )}
                {uploadStatus === 'success' && (
                  <Badge variant="default" className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Uploaded
                  </Badge>
                )}
                {uploadStatus === 'error' && (
                  <Badge variant="destructive">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Failed
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={resetUpload}>
                  Remove
                </Button>
              </div>
            </div>

            {uploadStatus === 'success' && (
              <div className="text-sm text-success">
                Prescription uploaded successfully. A pharmacist will review it shortly.
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="text-sm text-danger">
                Upload failed. Please try again or contact support.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}