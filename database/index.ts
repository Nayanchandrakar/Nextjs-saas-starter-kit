import { envServer } from "@/lib/utilities/env-server"
import { Pool, type PoolConfig, neon } from "@neondatabase/serverless"
import {
  type NeonHttpDatabase,
  drizzle as drizzleHttp,
} from "drizzle-orm/neon-http"
import {
  type NeonDatabase,
  drizzle as drizzleServerless,
} from "drizzle-orm/neon-serverless"

type DatabaseConfig = {
  connectionString: string
  poolOptions?: Partial<PoolConfig>
}

class Database {
  private static instance: Database
  private httpConnection: NeonHttpDatabase | null = null
  private wsConnection: NeonDatabase | null = null
  private pool: Pool | null = null
  private config: DatabaseConfig

  constructor(config: DatabaseConfig) {
    this.config = config
  }

  static getInstance(config?: DatabaseConfig) {
    if (!Database.instance) {
      if (!config?.connectionString)
        throw new Error("Database connection string is not defined or empty")
      this.instance = new Database(config)
    }
    return Database.instance
  }

  getHttpConnection(): NeonHttpDatabase {
    if (!this.httpConnection) {
      this.httpConnection = drizzleHttp(neon(this.config.connectionString))
    }
    return this.httpConnection
  }

  getWsConnection(): NeonDatabase {
    if (!this.wsConnection) {
      this.pool = new Pool({
        connectionString: this.config.connectionString,
        ...this.config.poolOptions,
      })
      this.wsConnection = drizzleServerless(this.pool)
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
  connectionString: envServer.DATABASE_URL!,
})

export const dbHttp = database.getHttpConnection()
export const dbServerless = database.getWsConnection()
export const closeDatabaseConnections = async () =>
  await database.closeConnections()
