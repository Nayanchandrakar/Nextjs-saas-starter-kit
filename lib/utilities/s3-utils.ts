import { clientEnv } from "@/lib/utilities/client-env"

/**
 * Checks if a given URL path originates from the configured CloudFront distribution.
 * @param path - The full path or URL string to evaluate.
 * @returns A boolean indicating whether the path starts with the CloudFront base URL.
 */
export function isCloudfrontSource(path: string): boolean {
  return path.startsWith(clientEnv.NEXT_PUBLIC_CLOUDFRONT_URL)
}

/**
 * Constructs a full CloudFront file URL using the given key.
 * @param key - The relative path or filename in the CloudFront distribution (e.g. "images/photo.jpg").
 * @returns A full URL string pointing to the CloudFront resource.
 */
export function getCloudfrontFile(key: string): string {
  return `${clientEnv.NEXT_PUBLIC_CLOUDFRONT_URL}/${key}`
}
