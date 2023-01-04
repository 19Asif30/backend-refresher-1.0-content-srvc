import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ContentDto } from './submodules/backendrefresher-1.0-dtos/src/dtos/content.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): string {
  //   console.log("Step 1")
  //   return this.appService.getHello();
  // }

  @Post()
  async createContent(@Body() content: ContentDto) {     // dtos -> data transfer object
    try {
      let createdContent = await this.appService.createContent(content);
      return createdContent;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get()
  async findUser() {
    try {
      let fetchedUser = await this.appService.findAll();
      return fetchedUser;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':id')
  async deleteContent(@Param('id') contentId: number) {
    try {
      let deletedContent = await this.appService.deleteContent(contentId);
      return deletedContent;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put()
  async updateUser(@Body() content: ContentDto) {
    try {
      let updateResult = await this.appService.updateContent(content);
      return updateResult;
    }
    catch (err) {
      console.log(err);
      return err;
    }

  }
}
