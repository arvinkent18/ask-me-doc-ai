import { Module } from '@nestjs/common';
import { DocumentsModule } from './documents/documents.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    DocumentsModule
],
})
export class AppModule {}
