import { useSidebar } from "@/components/ui/sidebar"
import { MapService } from "@/lib/services/map-service"
import type { FormattedWorkspace } from "@/types"
import type { WorkspaceType } from "@/types/database"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

interface UseWorkspaceSwitchProps {
  workspaces: FormattedWorkspace[]
  slug: string
}

/**
 * Custom hook to manage workspace switching functionality.
 * @param props.workspaces - Array of formatted workspaces.
 * @param props.slug - Current workspace slug.
 * @returns An object containing active workspace, mobile state, dialog state, and selection handler, or null if invalid.
 */
export const useWorkspaceSwitch = ({
  slug,
  workspaces,
}: UseWorkspaceSwitchProps) => {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState(false)

  const activeWorkspace = useMemo(() => {
    const foundWorkspace = MapService.findWorkspaceBySlug(workspaces, slug)
    if (foundWorkspace) {
      return foundWorkspace
    }

    const firstValidWorkspace = workspaces.find(
      (ws) => ws.workspaces?.length > 0,
    )!
    return firstValidWorkspace?.workspaces[0]
  }, [workspaces, slug])

  const onSelect = (workspace: WorkspaceType) => {
    if (!workspace?.slug || workspace.slug === slug) {
      return
    }

    setOpen(false)
    router.push(`/${workspace.slug}/dashboard`)
  }

  return {
    activeWorkspace,
    isMobile,
    open,
    setOpen,
    onSelect,
  }
}
