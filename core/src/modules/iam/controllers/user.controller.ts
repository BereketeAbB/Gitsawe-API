
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiBody } from "@nestjs/swagger";
import { UserService } from "../services";
import { SchemaCrudController } from "src/utils/controllers/schema-crud.controller";
import { users } from "src/schema";

@Controller('users')
export class UserController extends SchemaCrudController<typeof users> {
    constructor(
        private readonly userService: UserService
    ){
        super(userService)
    }
}