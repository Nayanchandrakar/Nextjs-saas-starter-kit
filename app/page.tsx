import { ClientComponet } from "@/app/_components/client-component"
import { Await } from "@/components/shared/await"
import { trpc } from "@/trpc/server"

export default async function Home() {
	return (
		<Await
			prefetch={[trpc.hello.queryOptions()]}
			fallback={<div>Loading page</div>}
			errorComponent={<div>Error page</div>}
		>
			<ClientComponet />
		</Await>
	)
}
