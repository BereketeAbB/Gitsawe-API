
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionDocument } from 'src/schemas/subscription.schema';
import { SchemaCrudController } from 'src/utils/controllers/schema-crud.controller';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController extends SchemaCrudController<SubscriptionDocument>(){
  constructor(
    private readonly subscriptionservice: SubscriptionService,
  ) {
    super(subscriptionservice)
  }
}
