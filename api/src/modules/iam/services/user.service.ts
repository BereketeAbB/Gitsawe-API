import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SchemaCrudService } from 'src/utils/services/schema-crud.service';

@Injectable()
export class UserService extends SchemaCrudService<UserDocument>  {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
  ) {
      super(userModel)
   }
}
