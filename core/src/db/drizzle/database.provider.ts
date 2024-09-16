import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "src/schema";

export const DrizzleAsyncProvider = "DrizzleAsyncProvider"
 
export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async() => {
      const connectionString = process.env.DATABASE_URL;
      const pool = new Pool({
        connectionString,
      })

      return drizzle(pool, { schema, logger: true });
    }
  }
]