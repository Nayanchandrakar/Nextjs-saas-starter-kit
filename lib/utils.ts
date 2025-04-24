import { RouteParams } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a type-safe route with optional parameters
 * @param basePath - The base route path
 * @param params - Optional query parameters
 * @returns Formatted route string
 */
export function createRoute<T extends RouteParams>(
  basePath: string,
  params?: T,
): string {
  const normalizedPath = basePath.replace(/^\/+|\/+$/g, "")

  if (!params) {
    return `/${normalizedPath}`
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return `/${normalizedPath}${queryString ? `?${queryString}` : ""}`
}
