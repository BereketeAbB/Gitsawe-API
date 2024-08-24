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
    ])
  ],
  controllers: [
    UserController,
    AccountController
    ],
  providers: [
    UserService,
    AccountService
  ],
  exports: [],
})
export class UserModule {}
