import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ContentDto } from './submodules/backendrefresher-1.0-dtos/src/dtos/content.dto';
import { RMQPayloadDto } from './submodules/backend-refresher-1.0-rmq/src/dtos/rmqPayload.dto';
import { PlatformEvents } from './submodules/backend-refresher-1.0-rmq/src/enums/platformEvents';
import { RmqTopics } from './submodules/backend-refresher-1.0-rmq/src/enums/rmqTopics';
import { MsgBrokerOpsService } from './submodules/backend-refresher-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './submodules/backend-refresher-1.0-entities/src/entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @Inject('CONTENT_SERVICE_QUEUE') private contentQueueClient: ClientProxy,

    private readonly msgBrokerService: MsgBrokerOpsService,

    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) { }

  // getHello(): string {

  //   console.log("Step 2")

  //   let rmqPayload: RMQPayloadDto = {
  //     event: PlatformEvents.CONTENT_CREATION,
  //     payload: {
  //       "title": "Test"
  //     }
  //   }

  //   this.msgBrokerService.emitToQueue(
  //     rmqPayload,
  //     RmqTopics.CONTENT_CREATION_TOPIC,
  //     this.contentQueueClient
  //   )

  //   return "emit successful"

  // }

  async createContent(content: ContentDto) {
    console.log("Proceeding to create content")
    let rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.CONTENT_CREATION,
      payload: content
    }

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.CONTENT_CREATION_TOPIC,
      this.contentQueueClient
    )

    return "Your request has been accepted !!"
  }

  async findAll() {
    try {
      let retrievedContents = await this.contentRepository.find();
      return retrievedContents;
    }
    catch (err) {
      throw err
    }
  }

  async deleteContent(contentId: number) {
    try {
      let deletedContent = await this.contentRepository.delete(contentId);
      return deletedContent;
    }
    catch (err) {
      throw err
    }
  }

  async updateContent(content: ContentDto) {
    console.log("Proceeding to update content")
    let rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.CONTENT_UPDATION,
      payload: content
    }

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.CONTENT_UPDATION_TOPIC,
      this.contentQueueClient
    )

    return "It has been updated!!"
  }
}