import { serverEnv } from "@/lib/utilities/server-env"
import { Transaction } from "@/types/database"
import { Pool, type PoolConfig, neon } from "@neondatabase/serverless"
import type { CacheConfig } from "drizzle-orm/cache/core/types"
import { upstashCache } from "drizzle-orm/cache/upstash"
import {
  type NeonHttpDatabase,
  drizzle as drizzleHttp,
} from "drizzle-orm/neon-http"
import {
  type NeonDatabase,
  drizzle as drizzleServerless,
} from "drizzle-orm/neon-serverless"

type UpstashCacheConfig = {
  url: string
  token: string
  config?: CacheConfig
  global?: boolean
}

type ConfigOptions = {
  connectionString: string
  cacheConfig: UpstashCacheConfig
  poolOptions?: Partial<PoolConfig>
}

class Database {
  private static instance: Database
  private httpConnection: NeonHttpDatabase | null = null
  private wsConnection: NeonDatabase | null = null
  private pool: Pool | null = null
  private config: ConfigOptions

  constructor(config: ConfigOptions) {
    this.config = config
  }

  static getInstance(config?: ConfigOptions) {
    if (!Database.instance) {
      if (!config)
        throw new Error("Environment configurations are not defined or empty.")
      this.instance = new Database(config)
    }
    return Database.instance
  }

  getHttpConnection(): NeonHttpDatabase {
    if (!this.httpConnection) {
      this.httpConnection = drizzleHttp({
        client: neon(this.config.connectionString),
        cache: upstashCache(this.config.cacheConfig),
      })
    }
    return this.httpConnection
  }

  getWsConnection(): NeonDatabase {
    if (!this.wsConnection) {
      this.pool = new Pool({
        connectionString: this.config.connectionString,
        ...this.config.poolOptions,
      })
      this.wsConnection = drizzleServerless(this.pool, {
        cache: upstashCache(this.config.cacheConfig),
      })
    }
    return this.wsConnection
  }

  async closeConnections(): Promise<void> {
    if (this.pool) {
      await this.pool.end()
      this.pool = null
      this.wsConnection = null
    }
    this.httpConnection = null
  }
}

const database = Database.getInstance({
  connectionString: serverEnv.DATABASE_URL!,
  cacheConfig: {
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
    url: serverEnv.UPSTASH_REDIS_REST_URL,
    global: true,
    config: {
      ex: 60 * 5,
    },
  },
})

export const dbHttp = database.getHttpConnection()
export const dbServerless = database.getWsConnection()
export const dbTransaction = (tx?: Transaction) => tx ?? dbHttp
export const closeDatabaseConnections = async () => {
  await database.closeConnections()
}
