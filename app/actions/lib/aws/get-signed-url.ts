"use server"

import messageJson from "@/lib/constants/message.json"
import { ApiError } from "@/lib/errors/api-error"
import { upstashRateLimit } from "@/lib/redis/upstash"
import {
  preSignedSchema,
  preSignedSchemaType,
} from "@/lib/schema/actions/aws/s3-action-schemea"

import { getFilename } from "@/app/actions/lib/aws/utils"
import { validateRequest, validateSessionRequest } from "@/app/actions/utils"
import { s3Service } from "@/lib/aws/s3-service"
import { getCloudfrontFile } from "@/lib/utilities/s3-utils"
import { serverEnv } from "@/lib/utilities/server-env"

export const getPreSignedUrl = async (request: preSignedSchemaType) => {
  try {
    const formData = await validateRequest(preSignedSchema, request)
    const session = await validateSessionRequest()

    const identifier = `ratelimit:generate-presigned-url:${session.user.id}`
    const response = await upstashRateLimit.globalRateLimit().limit(identifier)

    if (!response.success) {
      throw ApiError.tooManyRequests(messageJson.tooManyRequests)
    }

    const generatedFilename = `${session.user.id}/${getFilename(formData.fileName)}`

    const endpoint = await s3Service.getPreSignedUrl({
      Bucket: serverEnv.S3_UPLOAD_BUCKET,
      Key: generatedFilename,
      ContentType: formData.fileType,
      CacheControl: "max-age=63072000",
    })

    const fileSource = getCloudfrontFile(generatedFilename)

    return { url: endpoint, fileSource }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw ApiError.internalServerError(messageJson.generalError, error)
  }
}
