# Twimote

Telegram bot for sharing Twitch emotes.

## Installation

Requirements:

* Postgres
* NodeJS + npm

Setup:

1. Create res/auth/credentials.json by copying credentials.template.json
    1. Fill with correct values
    2. Create the given Postgres database if it doesn't exist yet
2. Create res/twimote/tokens.json by copying tokens.example.json
    1. Fill with correct values
    2. Make sure the given host is reachable from the internet

4. `npm i`

5. `npm run processEmotes`

6. Wait for processEmotes to finish

7. `npm start`
