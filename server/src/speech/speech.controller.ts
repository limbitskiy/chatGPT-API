import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SpeechDto } from './dto';
import { SpeechService } from './speech.service';

@Controller('speech')
export class SpeechController {
  constructor(private speechService: SpeechService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  getChatResponse(@Body() dto: SpeechDto) {
    return this.speechService.getChatResponse(dto);
  }
}
