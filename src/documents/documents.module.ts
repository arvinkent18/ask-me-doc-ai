import { Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { OpenAIService } from "../openai/openai.provider";

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, OpenAIService],
})
export class DocumentsModule {}
