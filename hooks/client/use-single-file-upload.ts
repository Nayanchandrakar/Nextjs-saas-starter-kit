import { getPreSignedUrl } from "@/app/actions/lib/aws/get-signed-url"
import { generalError } from "@/lib/constants/message.json"
import axios, { AxiosError } from "axios"
import { useCallback, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { FileWithPreview, useFileUpload } from "./use-file-upload"

interface SingleFileUploadProps {
  acceptedTypes: string
  maxSizeMB: number
  defaultUploadedUrl?: string
  onUploadSuccess?: (uploadedUrl: string) => void
}

/**
 * Custom hook for handling single file uploads with preview
 * @param props - Configuration for file upload
 * @returns Object containing file upload state and controls
 */
export const useSingleFileUpload = ({
  acceptedTypes,
  maxSizeMB,
  defaultUploadedUrl = "",
  onUploadSuccess,
}: SingleFileUploadProps) => {
  const [isUploading, startTransition] = useTransition()
  const [uploadedFileUrl, setUploadedFileUrl] =
    useState<string>(defaultUploadedUrl)

  const maxSize = maxSizeMB * 1024 * 1024

  const uploadFileToS3 = useCallback(
    async (file: File) => {
      try {
        const { url, fileSource } = await getPreSignedUrl({
          fileName: file.name,
          fileType: file.type,
        })

        // Upload file to S3
        await axios.put(url, file, { headers: { "Content-Type": file.type } })

        setUploadedFileUrl(fileSource)
        onUploadSuccess?.(fileSource)
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || error.message
            : error instanceof Error
              ? error.message
              : generalError
        toast.error(errorMessage)
        throw error
      }
    },
    [onUploadSuccess],
  )

  const onFileSelected = useCallback(
    (selectedFiles: FileWithPreview[]) => {
      const { file } = selectedFiles[0]
      if (!(file instanceof File)) return

      startTransition(() => uploadFileToS3(file))
    },
    [uploadFileToS3],
  )

  const [{ errors, files, isDragging }, fileUploadControls] = useFileUpload({
    maxSize,
    accept: acceptedTypes,
    onFilesAdded: onFileSelected,
  })

  useEffect(() => {
    if (errors.length) errors.forEach((error) => toast.error(error))
    return () => {
      toast.dismiss()
    }
  }, [errors])

  return {
    errors,
    maxSize,
    isDragging,
    isUploading,
    uploadedFileUrl,
    setUploadedFileUrl,
    ...fileUploadControls,
    file: files[0] ?? null,
  }
}
