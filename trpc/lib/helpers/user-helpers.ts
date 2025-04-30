import { s3Service } from "@/lib/aws/s3-service"
import { isCloudfrontSource } from "@/lib/utilities/s3-utils"

export async function deleteOldProfileImage(
  currentImage?: string | null,
  image?: string | null,
): Promise<void> {
  // Only delete the files when current file and new image is not equal meaning they are different and the provider is s3
  if (
    currentImage &&
    image &&
    isCloudfrontSource(currentImage) &&
    currentImage !== image
  ) {
    await s3Service.deleteObjectFromBucket(currentImage)
  }
}
