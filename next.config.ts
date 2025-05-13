import { clientEnv } from "@/lib/utilities/client-env"
import { serverEnv } from "@/lib/utilities/server-env"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "avatar.vercel.sh" }],
  },
}

export default nextConfig
