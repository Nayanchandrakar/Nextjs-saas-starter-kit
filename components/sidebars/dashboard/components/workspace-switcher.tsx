"use client"

import { ChevronsUpDown, CircleCheck, PlusCircle } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { WORKSPACE_SWITCH_OPTIONS } from "@/lib/constants/navigation/dashboard-navigation"
import { StringService } from "@/lib/services/string-service"
import { cn, createRoute } from "@/lib/utils"
import { FormattedWorkspace } from "@/types"
import dynamic from "next/dynamic"
import Link from "next/link"
import { toast } from "sonner"

type SwitcherProps = {
  workspaces: FormattedWorkspace[]
}

export function Switcher({ workspaces }: SwitcherProps) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState(
    workspaces[0].workspaces[0],
  )

  if (!activeWorkspace) return null

  return (
    <SidebarMenu className="z-[100]">
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a workspace"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer h-9"
            >
              <WorkspaceLogoRenderer logoSrc={activeWorkspace.logo!} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {StringService.capitalizeFirstLetter(activeWorkspace.name)}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </PopoverTrigger>

          <PopoverContent
            className="w-full p-0"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search workspace..." />
              <CommandList>
                <CommandEmpty>No workspace found.</CommandEmpty>
                {workspaces?.map((group) => {
                  return (
                    group.workspaces.length > 0 && (
                      <CommandGroup key={group.label} heading={group.label}>
                        {group.workspaces.map((workspace) => (
                          <CommandItem
                            key={workspace.id}
                            onSelect={() => {
                              setActiveWorkspace(workspace)
                              setOpen(false)
                            }}
                            className="text-sm"
                          >
                            <WorkspaceLogoRenderer logoSrc={workspace.logo!} />
                            {StringService.capitalizeFirstLetter(
                              workspace.name,
                            )}
                            <CircleCheck
                              className={cn(
                                "ml-auto",
                                activeWorkspace.slug === workspace.slug
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )
                  )
                })}
              </CommandList>

              <CommandSeparator />

              <CommandList>
                <CommandGroup>
                  {WORKSPACE_SWITCH_OPTIONS.map(({ label, href, Icon }) => (
                    <CommandItem key={label} asChild>
                      <Link href={createRoute(activeWorkspace.slug + href)}>
                        <Icon className="size-5" />
                        <span>{label}</span>
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>

              <CommandSeparator />

              <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      toast.success("Complete this...")
                      setOpen(false)
                    }}
                  >
                    <PlusCircle className="size-5" />
                    Create workspace
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const WorkspaceLogoRenderer = ({ logoSrc }: { logoSrc: string }) => (
  <Avatar className="rounded-sm size-6">
    <AvatarImage src={logoSrc} />
    <AvatarFallback className="rounded-none">
      <Skeleton className="size-full" />
    </AvatarFallback>
  </Avatar>
)

export const WorkspaceSwitcher = dynamic(
  async () => {
    return import(
      "@/components/sidebars/dashboard/components/workspace-switcher"
    ).then((module) => module.Switcher)
  },
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-full" />,
  },
)
