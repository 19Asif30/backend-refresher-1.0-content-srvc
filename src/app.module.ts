/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { Content } from './submodules/backend-refresher-1.0-entities/src/entities/content.entity';
import { Option } from './submodules/backend-refresher-1.0-entities/src/entities/option.entity';
import { Reaction } from './submodules/backend-refresher-1.0-entities/src/entities/reaction.entity';
import { User } from './submodules/backend-refresher-1.0-entities/src/entities/user.entity';
import { queues } from './submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';
import { MsgBrokerOpsService } from './submodules/backend-refresher-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '19asifani30',
      database: 'backend-social-media',
      entities: [User, Content, Reaction, Option],
      synchronize: true,
      logging: false
    }),
    TypeOrmModule.forFeature([User, Content, Reaction, Option]),
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqps://flnndzxr:Wt-07sW0CnU3QUmNOPqCkrNQE_-I3JL7@moose.rmq.cloudamqp.com/flnndzxr"],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }

        },
      },
    ]),
    ContentModule
  ],
  controllers: [AppController],
  providers: [AppService, MsgBrokerOpsService],
})
export class AppModule { }
