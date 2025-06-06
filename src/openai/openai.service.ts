import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OpenAI } from "openai";
import { OpenAIModel } from "../common/openai-model.enum";

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

  async analyzeText(
    prompt: string,
    openAIModel: OpenAIModel
  ): Promise<
    OpenAI.Chat.Completions.ChatCompletion & {
      _request_id?: string | null;
    }
  > {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: openAIModel,
        messages: [{ role: "user", content: prompt }],
      });
      return chatCompletion;
    } catch (err: any) {
      if (err.status === 429 && err.code === "insufficient_quota") {
        throw new InternalServerErrorException(
          "Your OpenAI quota has been exceeded. Please check your billing settings."
        );
      }

      throw err;
    }
  }

  get client() {
    return this.openai;
  }
}
