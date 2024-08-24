import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from 'src/schemas/package.schema';
import { Subscription, SubscriptionSchema } from 'src/schemas/subscription.schema';
import { PackageController } from './controllers/package.controller';
import { SubscriptionController } from './controllers/subscription.controller';
import { PackageService } from './services/package.service';
import { SubscriptionService } from './services/subscription.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema,
      },
      {
        name: Subscription.name,
        schema: SubscriptionSchema,
      },
    ])
  ],
  controllers: [
    PackageController,
    SubscriptionController
    ],
  providers: [
    PackageService,
    SubscriptionService
  ],
  exports: [],
})
export class SubscriptionModule {}
