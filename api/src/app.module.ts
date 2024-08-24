import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/iam/iam.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/gitsawe-api', {}),
    UserModule
  ],
  providers: [

  ],
  controllers: [],
})
export class AppModule {}
