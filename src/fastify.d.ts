import "fastify";
import { MultipartFunction, MultipartValue } from "@fastify/multipart";

declare module "fastify" {
  interface FastifyRequest {
    multipart: MultipartFunction;
    isMultipart: boolean;
  }
}
