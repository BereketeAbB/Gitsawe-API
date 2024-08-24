
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDocument } from 'src/schemas/Package.schema';
import { SchemaCrudService } from 'src/utils/services/schema-crud.service';

@Injectable()
export class PackageService extends SchemaCrudService<PackageDocument> {
  constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<PackageDocument>, 
  ) {
    super(packageModel);
  }
}
