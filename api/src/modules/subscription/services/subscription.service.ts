
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Subscription, SubscriptionDocument } from 'src/schemas/Subscription.schema';
import { SchemaCrudService } from 'src/utils/services/schema-crud.service';

@Injectable()
export class SubscriptionService extends SchemaCrudService<SubscriptionDocument> {
  constructor(
    @InjectModel(Subscription.name) private readonly subscriptionModel: Model<SubscriptionDocument>, 
  ) {
    super(subscriptionModel);
  }

  async create(itemData: any): Promise<any> {
    
  }
}
