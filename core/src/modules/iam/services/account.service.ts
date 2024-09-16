import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/db/drizzle/database.provider";
import { schema } from "src/schema";

@Injectable()
export class AccountService{
    constructor(
        @Inject(DrizzleAsyncProvider)
        private db: NodePgDatabase<typeof schema>
    ){}

    async test(){
        return await this.db.query.accounts.findMany()
    }

    async findAccountByUsername(username: string){
        return await this.db.query.accounts.findFirst({
            where: (table, { eq }) => eq(table.username, username)
        })
    }
}