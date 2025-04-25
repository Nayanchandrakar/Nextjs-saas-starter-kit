export type RouteParams = Record<string, string | number | boolean>

export type isRouteActiveProps = {
  currentPath: string
  targetPath: string
  depth?: number
}
