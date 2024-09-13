import { Module } from '@nestjs/common';
import { IamModule, GitsaweModule, SubscriptionModule } from './modules';
import {  } from './modules/gitsawe';

@Module({
  imports: [
    IamModule,
    GitsaweModule,
    SubscriptionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
