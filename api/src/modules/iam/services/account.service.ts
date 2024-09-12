import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument, User, UserDocument } from 'src/schemas';
import { EAccountStatus } from 'src/utils/enums/account.enum';
import { SchemaCrudService } from 'src/utils/services/schema-crud.service';

@Injectable()
export class AccountService extends SchemaCrudService<AccountDocument>  {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>, 
    @InjectModel(User.name) private readonly  userModel: Model<UserDocument>, 
  ) {
      super(accountModel)
   }  

   async findAccountWithUser(username: string){
     return await this.accountModel.findOne({ username}).populate('userId').exec()
   }

   async findUserAndAccount(username: string, phoneNumber: string): Promise<[AccountDocument, UserDocument]> {
    username = username.toLowerCase();

    const [account, user] = await Promise.all([
      this.findAccountWithUser(username),
      this.userModel.findOne({ phoneNumber }).exec()
    ])
    
    return [account, user];
   }

   async activateAccount(accountId: string): Promise<AccountDocument> {
    return await this.accountModel.findByIdAndUpdate(accountId, { status: EAccountStatus.ACTIVE }, { new: true }).exec()
   }
}
