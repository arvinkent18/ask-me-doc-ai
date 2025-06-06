import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import multipart from "@fastify/multipart";
import { AppModule } from "./app.module";

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: true,
  });

  await fastifyAdapter.register(multipart);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  await app.listen(process.env.PORT || 3000, "0.0.0.0");
}

bootstrap();
