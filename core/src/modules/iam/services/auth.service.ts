import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/db";
import { accounts, schema, users } from "src/schema";
import { EAccountStatus } from "src/utils/enums";
import { UserService } from "./user.service";
import { AccountService } from "./account.service";
import { LoginDto, RegisterDto } from "../dtos";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{
    constructor(
        @Inject(DrizzleAsyncProvider)
        private db: NodePgDatabase<typeof schema>,
        private readonly userService: UserService,
        private readonly accountService: AccountService,
        private jwtService: JwtService,
    ){}

    async login(itemData: LoginDto){
        const {account, user} = await this.getValidUserAndAccount(itemData)

        this.comparePassword(itemData.password, account.password)

        return {
            access_token: this.generateToken({
                userId: account.userId, 
                accountId: account.id, 
                username: account.username, 
                phoneNumber: user.phoneNumber, 
                accountType: account.type 
            })
        }
    }


    async register(itemData: RegisterDto){
        const user = await this.verifyAndGetNewUser(itemData)

        if(user){
            return await this.addAccountToUser(user, itemData)
        } else {
            return await this.createUserAndAccount(itemData)
        }
    }

    async verifyAndGetNewUser (itemData: RegisterDto){
        const [user, account] = await Promise.all([
            this.userService.findUserByPhoneNumber(itemData.phoneNumber),
            this.accountService.findAccountByUsername(itemData.username)
        ])

        if(account)
            throw new BadRequestException("Username already exists")

        return user
    }

    async addAccountToUser(user: InferSelectModel<typeof users>, itemData: RegisterDto){
        return await this.db.transaction(async (db) => {

        const accountItem : InferInsertModel<typeof accounts>  = {
            password: this.encryptString(itemData.password),
            type: itemData.type,
            userId:  user.id,
            username: itemData.username,
            status: EAccountStatus.ACTIVE
        } as any

       const account =  await db.insert(accounts).values(accountItem).returning({ id: accounts.id })

        return {
            userId: user.id,
            accountId: account[0].id,
            access_token: this.generateToken({
                userId: user.id, 
                accountId: account[0].id, 
                username: itemData.username, 
                phoneNumber: itemData.phoneNumber, 
                accountType: itemData.type 
            })
        }
    })
    }

    async createUserAndAccount(itemData: RegisterDto){
        return await this.db.transaction(async (db) => {
            const userItem : InferInsertModel<typeof users> = {
                firstName: itemData.firstName,
                phoneNumber: itemData.phoneNumber,
                email: itemData.email ?? null,
                lastName: itemData.lastName ?? null,
            } as any
        
            const user = await db.insert(users).values(userItem).returning({ id: users.id})

            const accountItem : InferInsertModel<typeof accounts>  = {
                password: this.encryptString(itemData.password),
                type: itemData.type,
                userId:  user[0].id,
                username: itemData.username,
                status: EAccountStatus.ACTIVE
            } as any
            
            const account =  await db.insert(accounts).values(accountItem).returning({ id: accounts.id})
            
            return {
                userId: user[0].id,
                accountId: account[0].id,
                access_token: this.generateToken({
                    userId: user[0].id, 
                    accountId: account[0].id, 
                    username: itemData.username, 
                    phoneNumber: itemData.phoneNumber, 
                    accountType: itemData.type 
                })
            }
     })
    }

    private async getValidUserAndAccount(itemData: LoginDto){
        const account = await this.accountService.findAccountByUsername(itemData.username)

        if(!account)
            throw new BadRequestException("Invalid username or password")

        if(account.status !== EAccountStatus.ACTIVE)
            throw new BadRequestException("Account is not active")

        const user = await this.userService.findUserById(account.userId)

        return {account, user}
    }

    private  encryptString(password: string):string {
        const salt: string = bcrypt.genSaltSync(12);
        return bcrypt.hashSync(password, salt);
    }

    private generateToken(payload: any){
        return this.jwtService.sign(payload)
    }

    private comparePassword(password: string, hashedPassword: string){
        const isValid = bcrypt.compareSync(password, hashedPassword)

        if(!isValid)
            throw new BadRequestException("Invalid username or password")
    }

}