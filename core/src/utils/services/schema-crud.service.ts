import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/db";
import { schema } from "src/schema";

@Injectable()
export class SchemaCrudService <T> {
    constructor(
        protected db: NodePgDatabase<typeof schema>,
        private readonly T: any,
        private readonly parentName?: string
    ){}

    async findAll(){
        return await this.db.select().from(this.T)
    }

    async findById(id: string){
        return await this.db.select().from(this.T).where(eq(this.T.id, id))
    }

    async findChildren(parentId: string){
        if (!this.parentName) throw new Error("Schema does not have a parent so it can not be listed")
        return await this.db.select().from(this.T).where(eq(this.T[this.toCamelCase(this.parentName)], parentId))
    }

    async create(itemData: Partial<T>){
        return await this.db.insert(this.T).values(itemData).returning()
    }

    async update(id: string, itemData: Partial<T>){
        return await this.db.update(this.T).set(itemData).where(eq(this.T.id, id)).returning()
    }

    async delete(id: string){
        return await this.db.delete(this.T).where(eq(this.T.id, id)).execute()
    }

    private toCamelCase(str: string): string {
        return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    }

} 