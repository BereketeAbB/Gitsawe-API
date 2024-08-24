import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Package, PackageDocument } from 'src/schemas/package.schema';
import { Subscription, SubscriptionDocument } from 'src/schemas/subscription.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { ESubscriptionStatus } from 'src/utils/enums/subscription.enum';
import { SchemaCrudService } from 'src/utils/services/scheme-crud.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends SchemaCrudService<UserDocument>  {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
  ) {
      super(userModel)
   }

  //  async createSub(){
  //       const subscription:  Partial<SubscriptionDocument> = {
  //     "name": "John Smith Subscription",
  //     "email": "John.smith@example.com",
  //     "startDate": new Date("2023-02-01T00:00:00.000Z"),
  //     "endDate": new Date("2023-12-31T23:59:59.999Z"),
  //     "userId": "66c029f7a8827f103828d060" as unknown as mongoose.Schema.Types.ObjectId,
  //     "status": ESubscriptionStatus.ACTIVE,
  //   }

  //   const sub = await this.subscriptionModel.create(subscription);
  //   return await sub.save()
    
  //  }

  //  async fetchWithChildren(){


  //   const users = await this.userModel.find().populate({
  //     path: 'subscriptions',
  //     select: 'name email',
  //   }).select('firstName lastName email subscriptions');
  //   console.log({users})

  //   const sub = await this.subscriptionModel.find().populate("userId")
  //   return [users, sub]
  //  }
  // async createNew(itemData:any): Promise<any> {
  //   const pkg: Partial<PackageDocument> = {
  //     "name": "Premium Pacskage II" + new Date().getTime(),
  //     "description": "Accesss to premium content" + new Date().getTime(),
  //     "dateInterval": "monthly",
  //     "mediaType": "vidseo",
  //     "day": "Fridasy",
  //   }
    
  //   const user = {
  //     "firstName": "sJohn" + new Date().getTime(),
  //     "lastName": "Dose" + new Date().getTime(),
  //     "email": "HOsJOHN.doe@example.com" + new Date().getTime(),
  //     "phoneNumber": "+s1234567890" + new Date().getTime(),
  //     "telegramId": "@johndsoe" + new Date().getTime(),
  //     "password": "hashedpassword",
  //   }
    
  //   const createdPackage = new this.packageModel(pkg);
  //   const createdUser = new this.userModel(user);
    
  //   const savedPkd = await createdPackage.save();
  //   const savedUser = await createdUser.save();


  //   const subscription:  Partial<SubscriptionDocument> = {
  //     "name": "John Smith Subscription" + new Date().getTime(),
  //     "email": "John.smith@example.com" + new Date().getTime(),
  //     "startDate": new Date("2023-02-01T00:00:00.000Z"),
  //     "endDate": new Date("2023-12-31T23:59:59.999Z"),
  //     "packageId": savedPkd.id,
  //     "userId": savedUser.id,
  //     "status": ESubscriptionStatus.ACTIVE,
  //   }
    
  //   const createdSubscription = new this.subscriptionModel(subscription);

  //   const savedSubscription = await createdSubscription.save();


  //   console.log ([savedPkd, savedUser, savedSubscription]);
  //   return savedUser;
  // }
  
}
