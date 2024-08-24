import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/schemas';
import { SchemaCrudService } from 'src/utils/services/schema-crud.service';

@Injectable()
export class AccountService extends SchemaCrudService<AccountDocument>  {
  constructor(
    @InjectModel(Account.name) private readonly userModel: Model<AccountDocument>, 
  ) {
      super(userModel)
   }  
}
