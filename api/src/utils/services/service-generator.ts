import { writeFile} from 'fs';
import { join } from 'path';

function generateService(entityName) {
  const serviceName = `${entityName}Service`;
  const documentName = `${entityName}Document`;
  const schemaName = `${entityName}.schema`;

  const serviceTemplate = `
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ${entityName}, ${documentName} } from 'src/schemas/${schemaName}';
import { SchemaCrudService } from 'src/utils/services/schema-crud.service';

@Injectable()
export class ${serviceName} extends SchemaCrudService<${documentName}> {
  constructor(
    @InjectModel(${entityName}.name) private readonly ${entityName.toLowerCase()}Model: Model<${documentName}>, 
  ) {
    super(${entityName.toLowerCase()}Model);
  }
}
`;

  const filePath = join(__dirname, `${entityName.toLowerCase()}.service.ts`);
  
  writeFile(filePath, serviceTemplate, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Service generated: ${filePath}`);
    }
  });
}

// Example usage
generateService('Package');
generateService('Subscription');
