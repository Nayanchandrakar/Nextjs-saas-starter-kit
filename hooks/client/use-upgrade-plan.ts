"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useUpgradeModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Sync modal state with URL query parameter
  useEffect(() => {
    const shouldShowModal = searchParams.get("upgrade") === "true"
    setIsOpen(shouldShowModal)
  }, [searchParams])

  // Open modal and update URL
  const open = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("upgrade", "true")
    router.push(`?${params.toString()}`)
  }

  // Close modal and update URL
  const close = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("upgrade")
    const newQuery = params.toString() ? `?${params.toString()}` : ""
    router.push(newQuery)
  }

  return { open, close, isOpen }
}
