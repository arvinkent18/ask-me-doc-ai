import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OpenAI } from "openai";

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>("OPENAI_API_KEY");

    if (!apiKey) {
      throw new BadRequestException(
        "OPENAI_API_KEY is not defined in environment variables"
      );
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  get client() {
    return this.openai;
  }
}
