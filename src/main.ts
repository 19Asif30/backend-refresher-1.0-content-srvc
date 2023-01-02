import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ["amqps://flnndzxr:Wt-07sW0CnU3QUmNOPqCkrNQE_-I3JL7@moose.rmq.cloudamqp.com/flnndzxr"],
      queue: "CONTENT_SRVC_QUEUE",
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(5000);
}
bootstrap();
