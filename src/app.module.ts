import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { queues } from './submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';
import { MsgBrokerOpsService } from './submodules/backend-refresher-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqps://flnndzxr:Wt-07sW0CnU3QUmNOPqCkrNQE_-I3JL7@moose.rmq.cloudamqp.com/flnndzxr"],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, MsgBrokerOpsService],
})
export class AppModule { }
