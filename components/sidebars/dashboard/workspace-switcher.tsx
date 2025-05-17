"use client"

import { ChevronsUpDown, CircleCheck, PlusCircle } from "lucide-react"

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
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useWorkspaceSwitch } from "@/hooks/client/use-workspace-switch"
import { WORKSPACE_SWITCH_OPTIONS } from "@/lib/constants/navigation/dashboard-navigation"
import { cn, createRoute } from "@/lib/utils"
import { FormattedWorkspace } from "@/types"
import dynamic from "next/dynamic"
import Link from "next/link"
import { toast } from "sonner"

type SwitcherProps = {
  workspaces: FormattedWorkspace[]
  slug: string
}

export function Switcher({ workspaces, slug }: SwitcherProps) {
  const { activeWorkspace, isMobile, onSelect, open, setOpen } =
    useWorkspaceSwitch({ workspaces, slug })

  return (
    <SidebarMenu className="z-[100]">
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              variant="outline"
              role="combobox"
              aria-expanded={open}
              size="lg"
              aria-label="Select a workspace"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              tooltip={`Workspace: ${activeWorkspace.name}`}
            >
              <WorkspaceLogoRenderer logoSrc={activeWorkspace.logo!} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold capitalize">
                  {activeWorkspace.name}
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
                            onSelect={() => onSelect(workspace)}
                            className="text-sm"
                          >
                            <WorkspaceLogoRenderer
                              logoSrc={workspace.logo!}
                              className="size-5"
                            />
                            <span className="capitalize">{workspace.name}</span>
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
                      toast.success("To be implemented...")
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

const WorkspaceLogoRenderer = ({
  logoSrc,
  className,
}: { logoSrc: string; className?: string }) => (
  <Avatar className={cn("rounded-md", className)}>
    <AvatarImage src={logoSrc} />
    <AvatarFallback className="rounded-none">
      <Skeleton className="size-full" />
    </AvatarFallback>
  </Avatar>
)

export const WorkspaceSwitcher = dynamic(
  async () => {
    return import("@/components/sidebars/dashboard/workspace-switcher").then(
      (module) => module.Switcher,
    )
  },
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-full" />,
  },
)
