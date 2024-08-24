import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/iam/iam.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/gitsawe-api', {}),
    UserModule,
    SubscriptionModule
  ],
  providers: [

  ],
  controllers: [],
})
export class AppModule {}
