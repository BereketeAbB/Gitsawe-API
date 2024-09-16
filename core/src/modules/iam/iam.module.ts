import { Module } from '@nestjs/common';
import { AccountController, AuthController, UserController } from './controllers';
import { AccountService, AuthService, UserService } from './services';
import { DrizzleModule } from 'src/db';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DrizzleModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || "yrtugbv3gu3ou8923rwgqiowjrw980322",
        signOptions: {
          expiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 3600
        }
      })
    })
  ],
  controllers: [
    AccountController,
    AuthController,
    UserController
  ],
  providers: [
    AccountService,
    AuthService,
    UserService
  ],
})
export class IamModule {}
