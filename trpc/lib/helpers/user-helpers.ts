import { s3Service } from "@/lib/aws/s3-service"
import { isCloudfrontFile } from "@/lib/utilities/s3-utils"

export async function deleteOldProfileImage(
  currentImage?: string | null,
  image?: string | null,
): Promise<void> {
  if (
    currentImage &&
    image &&
    isCloudfrontFile(currentImage) &&
    currentImage !== image
  ) {
    await s3Service.deleteObjectFromBucket(currentImage)
  }
}
