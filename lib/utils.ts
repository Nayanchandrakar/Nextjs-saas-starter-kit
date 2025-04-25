import { RouteParams, isRouteActiveProps } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { redirect } from "next/navigation"
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

/**
 * Server-side utility to check if a route is active based on the provided props.
 * @param props - Object containing currentPath, targetPath, and optional depth.
 * @returns A boolean indicating if the target path is active.
 */
export function isRouteActive({
  currentPath,
  targetPath,
  depth = 1,
}: isRouteActiveProps): boolean {
  const normalizePath = (path: string) =>
    (path.split("?")[0].replace(/\/$/, "") || "/").toLowerCase()

  const normalizedCurrent = normalizePath(currentPath)
  const normalizedTarget = normalizePath(targetPath)

  if (normalizedTarget === "/" && normalizedCurrent === "/") {
    return true
  }

  const currentSegments =
    normalizedCurrent === "/"
      ? []
      : normalizedCurrent.split("/").filter(Boolean)
  const targetSegments =
    normalizedTarget === "/" ? [] : normalizedTarget.split("/").filter(Boolean)

  const effectiveDepth = Math.min(
    depth,
    targetSegments.length,
    currentSegments.length,
  )

  return targetSegments
    .slice(0, effectiveDepth)
    .every((segment, i) => segment === currentSegments[i])
}

/**
 * Creates a type-safe route with optional parameters and redirects to destination path
 * @param basePath - The base route path
 * @param params - Optional query parameters
 */
export function redirectToRoute<T extends RouteParams>(
  basePath: string,
  params?: T,
): string {
  redirect(createRoute(basePath, params))
}
