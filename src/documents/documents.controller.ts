import { Controller, Post, Req, BadRequestException } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { FastifyRequest } from "fastify";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post("upload")
  async upload(@Req() req: FastifyRequest) {
    if (!req.isMultipart || !req.isMultipart()) {
      throw new BadRequestException("Multipart support is not enabled");
    }

    const data = await req.file();

    if (!data) {
      throw new BadRequestException("No file uploaded");
    }

    const { file, filename, mimetype } = data;
    const result = await this.documentsService.handleUpload(
      file,
      filename,
      mimetype
    );

    return result;
  }
}
