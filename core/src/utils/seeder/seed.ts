import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { gitsawe } from "src/schema";
import { seedGitsawe } from "./seed-data/gitsawe.seed";

// if (!("DATABASE_URL" in process.env))
// 	throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
	const client = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
	const db = drizzle(client, {logger: true});
 
	console.log("Seed start");
	await db.insert(gitsawe).values(seedGitsawe as any).onConflictDoNothing({ target: gitsawe.date, });
	console.log("Seed done");
};
 
main();