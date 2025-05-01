"use client"

import { getPreSignedUrl } from "@/app/actions/lib/aws/get-signed-url"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/client/use-file-upload"
import messageJson from "@/lib/constants/message.json"
import axios from "axios"
import { Loader, Upload } from "lucide-react"
import { useEffect, useMemo, useState, useTransition } from "react"
import { toast } from "sonner"

interface ProfilePicComponentProps {
  maxSize: number
  accept: string
  fileSrc: string
  title: string
  disabled: boolean
  onSuccess?: (imageSrc: string) => void
  onRemove?: () => void
}

export const ProfilePicComponent = ({
  accept,
  maxSize,
  onSuccess,
  onRemove,
  fileSrc,
  title,
  disabled,
}: ProfilePicComponentProps) => {
  const [imageSrc, setImageSrc] = useState(fileSrc)
  const [isPending, startTransition] = useTransition()
  const maxFileSize = useMemo(() => formatBytes(maxSize), [maxSize])

  const onFilesAdded = (addedFiles: FileWithPreview[]) => {
    const { file } = addedFiles[0]
    if (!(file instanceof File)) return

    startTransition(async () => {
      try {
        const { url, imageUrl } = await getPreSignedUrl({
          fileName: file.name,
          fileType: file.type,
        })

        setImageSrc(imageUrl)
        onSuccess?.(imageUrl)
        await axios.put(url, file, { headers: { "Content-Type": file.type } })
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : messageJson.generalError,
        )
      }
    })
  }

  const [
    { files, isDragging, errors },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept,
    maxSize,
    onFilesAdded,
  })

  useEffect(() => {
    errors.forEach((error) => toast.error(error))
  }, [errors])

  const handleFileRemove = () => {
    removeFile(files[0]?.id)
    setImageSrc("")
    onRemove?.()
  }

  const isLoading = useMemo(() => isPending || disabled, [isPending, disabled])
  const fileName = useMemo(() => files[0]?.file.name ?? null, [files])

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
        {isPending ? (
          <div aria-hidden="true">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : imageSrc ? (
          <Avatar className="size-full rounded-none">
            <AvatarImage
              width={64}
              height={64}
              src={imageSrc!}
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
            disabled={(!fileName && !imageSrc) || isLoading}
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
