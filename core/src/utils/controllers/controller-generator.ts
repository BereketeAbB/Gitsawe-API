import {writeFile} from 'fs';
import {join} from 'path';

function generateController(entityName) {
  const controllerName = `${entityName}Controller`;
  const serviceName = `${entityName}Service`;
  const documentName = `${entityName}Document`;
  const schemaName = `${entityName.toLowerCase()}.schema`;

  const controllerTemplate = `
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ${serviceName} } from '../services/${entityName.toLowerCase()}.service';
import { ${documentName} } from 'src/schemas/${schemaName}';
import { SchemaCrudController } from 'src/utils/controllers/schema-crud.controller';

@Controller('${entityName.toLowerCase()}s')
@ApiTags('${entityName}s')
export class ${controllerName} extends SchemaCrudController<${documentName}>(){
  constructor(
    private readonly ${serviceName.toLowerCase()}: ${serviceName},
  ) {
    super(${serviceName.toLowerCase()})
  }
}
`;

  const filePath = join(__dirname, `${entityName.toLowerCase()}.controller.ts`);
  
  writeFile(filePath, controllerTemplate, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Controller generated: ${filePath}`);
    }
  });
}

// Example usage
generateController('Package');
generateController('Subscription');
