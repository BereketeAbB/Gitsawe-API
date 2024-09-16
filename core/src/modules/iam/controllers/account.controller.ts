import { Controller, Get } from "@nestjs/common";
import { AccountService } from "../services";

@Controller('test')
export class AccountController {
    constructor(
        private readonly accountService: AccountService
    ){}

    @Get()
    async test(){
        console.log("test")
        return await this.accountService.test()
    }
}