import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dtos/register.dto';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto)
  }

 @Post('login')
 async login(@Body() loginDto: LoginDto) {
   return await this.authService.login(loginDto)
 }
}
