import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechController } from './speech/speech.controller';
import { SpeechModule } from './speech/speech.module';

@Module({
  imports: [SpeechModule],
  // controllers: [AppController, SpeechController],
  // providers: [AppService],
})
export class AppModule {}
