import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckSpamDto } from './dtos/check-spam.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('checkSpam')
  async checkSpam(@Body() checkSpamDto: CheckSpamDto): Promise<boolean> {
    return await this.appService.isSpam(checkSpamDto);
  }
}
