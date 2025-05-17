"use client"

import { ListComponent } from "@/components/shared/list-component"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"

const THEME_OPTIONS = [
  { value: "light", placeholder: "/personalize/light.webp" },
  { value: "dark", placeholder: "/personalize/dark.webp" },
]

export function PersonalizationCard() {
  const { setTheme, theme } = useTheme()

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          Choose a theme
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ListComponent
          data={THEME_OPTIONS}
          className="flex gap-3 items-center"
          renderItem={({ value, placeholder }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className="space-y-1.5 focus:outline-none cursor-pointer"
            >
              <div
                className={cn(
                  "rounded-lg overflow-hidden ring-1 ring-transparent transition-all duration-200 hover:ring-2 hover:ring-green-400",
                  theme === value && "ring-2 ring-green-500",
                )}
              >
                <Image
                  src={placeholder}
                  priority
                  width={120}
                  height={80}
                  alt={`${value} theme preview`}
                  aria-hidden
                />
              </div>
              <p className="capitalize font-medium text-xs text-center">
                {value}
              </p>
            </button>
          )}
        />
      </CardContent>
    </Card>
  )
}
