"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { DateService } from "@/lib/services/date-service"
import { StringService } from "@/lib/services/string-service"
import type { WorkspaceType } from "@/types/database"
import { SquarePen } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDeleteWorkspace } from "@/hooks/trpc/workspaces"
import { createRoute } from "@/lib/utils"
import Link from "next/link"

type WorkspaceActionsCardProps = {
  workspace: WorkspaceType
  slug: string
  isMemberCard?: boolean
}

export function WorkspaceActionsCard({
  workspace,
  slug,
  isMemberCard = false,
}: WorkspaceActionsCardProps) {
  const { isPending, mutateAsync } = useDeleteWorkspace()
  const logoSrc = StringService.getPlaceholderImage(
    workspace.logo,
    workspace.name,
  )

  return (
    <div className="flex items-center justify-between gap-x-4 p-4 transition-colors duration-200">
      <div className="flex items-center justify-center gap-x-3">
        <Avatar>
          <AvatarImage src={logoSrc} />
          <AvatarFallback className="uppercase font-semibold">
            {workspace.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-start gap-y-1 flex-col">
          <p className="flex max-w-[30ch] items-center gap-x-2 truncate text-sm font-medium">
            <span className="capitalize">{workspace.name}</span>
            {workspace.slug === slug && (
              <Badge variant="outline">Current workspace</Badge>
            )}
          </p>
          <span className="text-muted-foreground text-xs">
            Created at {DateService.formatDate(workspace.createdAt)}
          </span>
        </div>
      </div>

      {!isMemberCard && (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={createRoute(`${workspace.slug}/workspace`)}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  <SquarePen className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            size="sm"
            onClick={() => mutateAsync({ id: workspace.id })}
            disabled={isPending}
            loading={isPending}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}
