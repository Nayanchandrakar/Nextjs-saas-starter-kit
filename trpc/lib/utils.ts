export function buildFullName(firstName: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(" ").trim()
}
