import { clientEnv } from "@/lib/utilities/client-env"
import { isCuid } from "@paralleldrive/cuid2"

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

/**
 * Extracts the key (path after the base URL) from a full CloudFront file URL.
 * @param url - The full URL string pointing to a CloudFront resource.
 * @returns The relative key/path of the resource within the CloudFront distribution.
 */
export function getCloudfrontKey(url: string): string {
  return isCloudfrontSource(url)
    ? url.slice(clientEnv.NEXT_PUBLIC_CLOUDFRONT_URL.length + 1)
    : url
}

export function isCloudfrontFile(key: string): boolean {
  return isCuid(key?.split("/")[0])
}
