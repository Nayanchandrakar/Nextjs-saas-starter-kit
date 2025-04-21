import "server-only"
import { makeQueryClient } from "@/lib/query-client"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import {
	TRPCQueryOptions,
	createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query"
import { cache } from "react"

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
	ctx: createTRPCContext,
	router: appRouter,
	queryClient: getQueryClient,
})

export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient()
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	)
}

// biome-ignore lint/suspicious/noExplicitAny:
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
	queryOptions: T,
) {
	const queryClient = getQueryClient()
	if (queryOptions.queryKey[1]?.type === "infinite") {
		// biome-ignore lint/suspicious/noExplicitAny:
		void queryClient.prefetchInfiniteQuery(queryOptions as any)
	} else {
		void queryClient.prefetchQuery(queryOptions)
	}
}
