"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const ClientComponet = () => {
	const trpc = useTRPC()
	const { data } = useSuspenseQuery(trpc.hello.queryOptions())

	return <div>{data.greeting}</div>
}
