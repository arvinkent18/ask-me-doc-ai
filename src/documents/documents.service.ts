import { BadRequestException, Injectable } from "@nestjs/common";
import { Readable } from "stream";
import * as pdfParse from "pdf-parse";
import { OpenAIService } from "../openai/openai.service";
import { OpenAIModel } from "../common/openai-model.enum";

@Injectable()
export class DocumentsService {
  constructor(private readonly openAIService: OpenAIService) {}

  async handleUpload(fileStream: Readable, filename: string, mimetype: string) {
    if (!fileStream) {
      throw new BadRequestException("No file uploaded");
    }

    if (mimetype !== "application/pdf") {
      throw new BadRequestException("Only PDF files are supported");
    }

    const chunks: Uint8Array[] = [];

    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const data = await pdfParse(buffer);

    const aiSummary = await this.openAIService.analyzeText(
      data.text,
      OpenAIModel.GPT_3_5_TURBO,
    );

    return {
      filename,
      text: data.text,
      info: data.info,
      aiSummary,
    };
  }
}
