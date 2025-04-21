import { Pool, type PoolConfig, neon } from "@neondatabase/serverless"
import {
  type NeonHttpDatabase,
  drizzle as drizzleHttp,
} from "drizzle-orm/neon-http"
import {
  NeonDatabase as NeonServerlessDatabase,
  drizzle as drizzleServerless,
} from "drizzle-orm/neon-serverless"

type DatabaseConfig = {
  connectionString: string
  poolOptions?: Partial<PoolConfig>
}

class Database {
  private static instance: Database | null = null
  private httpConnection: NeonHttpDatabase | null = null
  private wsConnection: NeonServerlessDatabase | null = null
  private pool: Pool | null = null
  private config: DatabaseConfig

  private constructor(config: DatabaseConfig) {
    this.validateConfig(config)
    this.config = { ...config }
  }

  private validateConfig(config: DatabaseConfig): void {
    if (!config.connectionString) {
      throw new Error("DATABASE_URL is not defined or empty")
    }
  }

  static getInstance(config?: DatabaseConfig): Database {
    if (!Database.instance) {
      if (!config)
        throw new Error(
          "Database configuration is required for first-time initialization",
        )
      Database.instance = new Database(config)
    }
    return Database.instance
  }

  static async initialize(config: DatabaseConfig): Promise<Database> {
    try {
      const database = Database.getInstance(config)
      return database
    } catch (error) {
      throw error
    }
  }

  getHttpConnection(): NeonHttpDatabase {
    if (!this.httpConnection) {
      this.httpConnection = drizzleHttp(neon(this.config.connectionString))
    }
    return this.httpConnection
  }

  getWsConnection(): NeonServerlessDatabase {
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

export let dbHttp: NeonHttpDatabase
export let dbServerless: NeonServerlessDatabase
export let closeDatabaseConnections: () => Promise<void>

Database.initialize({
  connectionString: process.env.DATABASE_URL!,
})
  .then((database) => {
    dbHttp = database.getHttpConnection()
    dbServerless = database.getWsConnection()
    closeDatabaseConnections = () => database.closeConnections()
  })
  .catch((error) => {
    console.error("Database initialization failed:", error)
    throw error
  })
