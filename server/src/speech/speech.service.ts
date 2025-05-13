import { Injectable } from '@nestjs/common';
import { SpeechDto } from './dto';
import { OpenAI } from 'openai';

@Injectable()
export class SpeechService {
  async getChatResponse(dto: SpeechDto) {
    return prodAPI(dto);
  }
}

// function devAPI() {
//   const answers = [
//     'Doing what you love is the cornerstone of having abundance in your life.',
//     'It is in your moments of decision that your destiny is shaped.',
//     'You are important enough to ask and you are blessed enough to receive back.',
//     'Life is like riding a bicycle. To keep your balance you must keep moving.',
//     "You can do what's reasonable or you can decide what's possible",
//   ];
//   const payload = {
//     answer: answers[Math.floor(Math.random() * answers.length)],
//   };
//   return new Promise((res) => setTimeout(() => res(payload), 2000));
// }

async function prodAPI(dto: SpeechDto) {
  const baseURL = 'https://api.aimlapi.com/v1';

  const apiKey = process.env.API_KEY;

  const systemPrompt = 'You are a chat bot';

  const api = new OpenAI({
    apiKey,
    baseURL,
  });

  const completion = await api.chat.completions.create({
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: dto.text,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });

  const response = completion.choices[0].message.content;

  console.log('AI:', response);

  return {
    answer: response,
  };
}
