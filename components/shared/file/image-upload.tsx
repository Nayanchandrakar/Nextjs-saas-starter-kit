"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatBytes } from "@/hooks/client/use-file-upload"
import { useSingleFileUpload } from "@/hooks/client/use-single-file-upload"
import { Loader, Upload } from "lucide-react"

interface ImageUploadProps {
  maxSizeMB: number
  accept: string
  fileSrc: string
  title: string
  disabled: boolean
  onUploadSuccess?: (imageSrc: string) => void
  onRemove?: () => void
}

export const ImageUpload = ({
  accept,
  maxSizeMB,
  onUploadSuccess,
  onRemove,
  fileSrc,
  title,
  disabled,
}: ImageUploadProps) => {
  const {
    uploadedFileUrl,
    file,
    isUploading,
    maxSize,
    isDragging,
    handleDrop,
    removeFile,
    getInputProps,
    handleDragOver,
    openFileDialog,
    handleDragEnter,
    handleDragLeave,
    setUploadedFileUrl,
  } = useSingleFileUpload({
    acceptedTypes: accept,
    maxSizeMB,
    defaultUploadedUrl: fileSrc,
    onUploadSuccess,
  })

  const handleFileRemove = () => {
    setUploadedFileUrl("")
    removeFile(file?.id)
    onRemove?.()
  }

  const isLoading = !!(isUploading || disabled)
  const maxFileSize = formatBytes(maxSize)
  const fileName = file?.file.name

  return (
    <div className="inline-flex items-center gap-4 align-top">
      <div
        className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex size-[4.5rem] items-center justify-center overflow-hidden rounded-lg border border-dashed transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px] cursor-pointer"
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging}
      >
        {isUploading ? (
          <div aria-hidden="true">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : uploadedFileUrl ? (
          <Avatar className="size-full rounded-none">
            <AvatarImage
              width={64}
              height={64}
              src={uploadedFileUrl!}
              alt="profile-image"
              className="size-full object-cover"
            />
            <AvatarFallback className="rounded-none">
              <Skeleton className="size-full" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div aria-hidden="true">
            <Upload className="size-5" />
          </div>
        )}
      </div>

      <div className="flex items-start gap-2.5 flex-col">
        <span className="text-xs">{title}</span>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            aria-haspopup="dialog"
            disabled={isLoading}
            onClick={openFileDialog}
          >
            <Upload className="size-4" />
            Upload Image
          </Button>

          <input
            {...getInputProps()}
            disabled={isLoading}
            className="sr-only"
          />

          <Button
            size="sm"
            variant="destructive"
            onClick={handleFileRemove}
            disabled={(!fileName && !uploadedFileUrl) || isLoading}
          >
            Remove
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          *.png, *.jpeg *.jpg files up to {maxFileSize} at least 400px by 400px
        </p>
      </div>
    </div>
  )
}
