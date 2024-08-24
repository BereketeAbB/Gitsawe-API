import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDocument } from 'src/schemas/user.schema';
import { SchemaCrudController } from 'src/utils/controllers/schema-crud.controller';


@Controller('users')
@ApiTags('Users')
export class UserController extends SchemaCrudController<UserDocument>(){
  constructor(
    private readonly userService: UserService,
  ) {
    super(userService)
  }
}
