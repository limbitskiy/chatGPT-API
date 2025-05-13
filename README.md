### Technical task for KazInvestEngineering

Allows to communicate with chatGPT through https://aimlapi.com.
Can use microphone to send messages.
It is free, so the requests are limited by 10 per day.

#### How to start:

- clone repo
- create `.env` file and add a API_KEY line with this test key: `acfa3be9c45546d48f2e80af5662d860`(see .env.example). The key gives limited access to free API.
- run `docker-compose up -d`
- visit `http://localhost:3777`

#### Stack:

- Nest Js
- React
