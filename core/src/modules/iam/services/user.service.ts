import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/db";
import { schema, users } from "src/schema";
import { SchemaCrudService } from "src/utils/services/schema-crud.service";

@Injectable()
export class UserService extends SchemaCrudService<typeof users> {
    constructor(
        @Inject(DrizzleAsyncProvider)
        protected db: NodePgDatabase<typeof schema>
    ){
        super(db, schema.users, schema.users.firstName.name)
    }
    

    async findUserByPhoneNumber(phoneNumber: string){
        return  await this.db.query.users.findFirst({
           where: (table, { eq }) =>  eq(table.phoneNumber, phoneNumber),
        })
    }

    async findUserById(userId: string){
        return  await this.db.query.users.findFirst({
           where: (table, { eq }) =>  eq(table.id, userId),
        })
    }
}