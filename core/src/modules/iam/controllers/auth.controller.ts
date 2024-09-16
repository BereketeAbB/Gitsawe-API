import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto, RegisterDto } from "../dtos";

@Controller('auth')
@ApiBearerAuth()
@ApiTags("Auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    @ApiBody({ type: () => RegisterDto })
    async register(@Body() itemData: RegisterDto){
        console.log("test")
        return await this.authService.register(itemData)
    }

    @Post('login')
    @ApiBody({ type: () => LoginDto })
    async login(@Body() itemData: LoginDto){
        return await this.authService.login(itemData)
    }
}