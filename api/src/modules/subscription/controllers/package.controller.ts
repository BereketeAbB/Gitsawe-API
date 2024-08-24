
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PackageService } from '../services/package.service';
import { PackageDocument } from 'src/schemas/package.schema';
import { SchemaCrudController } from 'src/utils/controllers/schema-crud.controller';

@Controller('packages')
@ApiTags('Packages')
export class PackageController extends SchemaCrudController<PackageDocument>(){
  constructor(
    private readonly packageService: PackageService,
  ) {
    super(packageService)
  }
}
