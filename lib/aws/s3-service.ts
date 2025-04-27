import { serverEnv } from "@/lib/utilities/server-env"
import {
  S3Client as AwsS3Client,
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

class S3Service {
  private static instance: S3Service
  private client: AwsS3Client

  private constructor() {
    this.client = new AwsS3Client({
      region: serverEnv.AWS_REGION,
      credentials: {
        accessKeyId: serverEnv.AWS_ACCESS_KEY_ID,
        secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service()
    }
    return S3Service.instance
  }

  getClient(): AwsS3Client {
    return this.client
  }

  async getPreSignedUrl(params: PutObjectCommandInput) {
    return await getSignedUrl(this.client, new PutObjectCommand(params), {
      expiresIn: 60 * 60,
    })
  }
}

export const s3Service = S3Service.getInstance()
