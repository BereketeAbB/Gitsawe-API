import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountDocument } from 'src/schemas';
import { SchemaCrudController } from 'src/utils/controllers/schema-crud.controller';
import { AccountService } from '../services/account.service';


@Controller('accounts')
@ApiTags('Accounts')
export class AccountController extends SchemaCrudController<AccountDocument>(){
  constructor(
    private readonly userService: AccountService,
  ) {
    super(userService)
  }
}
