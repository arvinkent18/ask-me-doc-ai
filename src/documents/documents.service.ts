import { BadRequestException, Injectable } from "@nestjs/common";
import { Readable } from "stream";
import * as pdfParse from "pdf-parse";

@Injectable()
export class DocumentsService {
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

    return {
      filename,
      text: data.text,
      info: data.info,
    };
  }
}
