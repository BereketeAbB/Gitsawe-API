import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Logger } from '@nestjs/common';
import * as schema from '../../schema'
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool, { schema, logger: true });

async function migration() {
    const path = join(process.cwd(), 'src', 'migrations');

    await migrate(db, { migrationsFolder: path });
    Logger.log("MIGRATION Completed")

}


migration().catch((err) => {
    console.log(err)
    Logger.error("MIGRATION ERROR", err.message)
    process.exit()
})