import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from 'src/schemas/package.schema';
import { Subscription, SubscriptionSchema } from 'src/schemas/subscription.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './controllers/user.contoller';
import { UserService } from './services/user.service';
import { AccountController } from './controllers/account.contoller';
import { AccountService } from './services/account.service';
import { Account, AccountSchema } from 'src/schemas';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt-strategy.service';
import { AuthController } from './controllers/auth.contoller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
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
    UserController,
    AccountController,
    AuthController
    ],
  providers: [
    UserService,
    AccountService,
    AuthService,
    JwtStrategy
  ],
  exports: [],
})
export class UserModule {}
