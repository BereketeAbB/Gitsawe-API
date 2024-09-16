import { Module } from '@nestjs/common';
import { IamModule, GitsaweModule, SubscriptionModule } from './modules';
import { DrizzleModule } from './db';

@Module({
  imports: [
    IamModule,
    GitsaweModule,
    SubscriptionModule,
    DrizzleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
