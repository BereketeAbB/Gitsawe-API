import { Injectable } from "@nestjs/common";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "src/schema";


@Injectable()
export class DatabaseService {
  public getDB(): PostgresJsDatabase<typeof schema> {
    const client = postgres(process.env.DATABASE_URL, { 
        
    });

    return drizzle(client, { schema , logger: true });
  }
}