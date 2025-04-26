"use client"

import { Button } from "@/components/ui/button"
import { useFileUpload } from "@/hooks/use-file-upload"
import { ApiError } from "@/lib/errors/api-error"
import { Upload } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export const ProfilePicUpload = () => {
  const [
    { files, isDragging },
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
    accept: "image/png,image/jpeg,image/jpg",
    maxSize: 2 * 1024 * 1024,
  })

  const previewUrl = files[0]?.preview ?? null
  const fileName = files[0]?.file.name ?? null

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
        data-dragging={isDragging || undefined}
        aria-label={previewUrl ? "Change image" : "Upload image"}
      >
        {previewUrl ? (
          <Image
            className="size-full"
            src={previewUrl}
            alt={files[0]?.file?.name || "Uploaded image"}
            width={64}
            height={64}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div aria-hidden="true">
            <Upload className="size-5" />
          </div>
        )}
      </div>

      <div className="flex items-start gap-2.5 flex-col">
        <span className="text-xs">Image</span>
        <div className="flex items-center gap-3">
          <Button
            onClick={openFileDialog}
            variant="outline"
            size="sm"
            aria-haspopup="dialog"
          >
            <Upload className="size-4" />
            Upload Image
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
          />
          <Button
            variant="destructive"
            aria-label={`Remove ${fileName}`}
            onClick={() => removeFile(files[0]?.id)}
            size="sm"
            disabled={!fileName}
          >
            Remove
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          *.png, *.jpeg *.jpg files up to 2MB at least 400px by 400px
        </p>
      </div>
    </div>
  )
}
