"use client"

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from "react"
import { AlertCircle, Image as ImageIcon, Trash2, UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface LocalImageUploadProps {
  value?: File | null
  onChange: (file: File | null) => void
  defaultImageUrl?: string | null
  maxSizeMB?: number
  accept?: string
  className?: string
  disabled?: boolean
}

export function LocalImageUpload({
  value,
  onChange,
  defaultImageUrl,
  maxSizeMB = 2,
  accept = "image/jpeg,image/png,image/webp",
  className,
  disabled = false,
}: LocalImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const activeUrlRef = useRef<string | null>(null)

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current)
      }
    }
  }, [])

  const currentDisplayUrl = previewUrl || (value ? null : defaultImageUrl)

  const validateFile = (file: File): boolean => {
    setError(null)

    // Validate MIME type against comma-separated accept string
    const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase())
    const fileType = file.type.toLowerCase()

    const isTypeValid = acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const prefix = type.replace("/*", "")
        return fileType.startsWith(prefix)
      }
      return fileType === type
    })

    if (!isTypeValid) {
      setError(`Invalid file type. Supported formats: ${accept}`)
      return false
    }

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File is too large. Maximum allowed size is ${maxSizeMB}MB.`)
      return false
    }

    return true
  }

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      if (activeUrlRef.current) {
        URL.revokeObjectURL(activeUrlRef.current)
      }
      const url = URL.createObjectURL(file)
      activeUrlRef.current = url
      setPreviewUrl(url)
      onChange(file)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (disabled) return

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation()
    setError(null)
    if (activeUrlRef.current) {
      URL.revokeObjectURL(activeUrlRef.current)
      activeUrlRef.current = null
    }
    setPreviewUrl(null)
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const openFileDialog = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        disabled={disabled}
        className="hidden"
      />

      {currentDisplayUrl ? (
        <div className="relative group overflow-hidden rounded-lg border bg-muted/40 aspect-video flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentDisplayUrl}
            alt="Uploaded preview"
            className="size-full object-contain p-2"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={openFileDialog}
              disabled={disabled}
              className="h-8 gap-1.5 text-xs font-medium"
            >
              <UploadCloud className="size-3.5" />
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
              className="h-8 gap-1.5 text-xs font-medium"
            >
              <Trash2 className="size-3.5" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={openFileDialog}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30",
            dragActive && "border-primary bg-primary/5",
            disabled && "cursor-not-allowed opacity-50 hover:border-muted-foreground/25 hover:bg-transparent"
          )}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
            {dragActive ? (
              <UploadCloud className="size-5 text-primary animate-bounce" />
            ) : (
              <ImageIcon className="size-5" />
            )}
          </div>
          <div className="text-sm font-medium text-foreground">
            Click to upload or drag and drop
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG, or WebP (max {maxSizeMB}MB)
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
