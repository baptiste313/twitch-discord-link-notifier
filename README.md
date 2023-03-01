[![Contributors](https://img.shields.io/github/contributors/baptiste313/twitch-discord-link-notifier.svg?style=for-the-badge)](https://github.com/baptiste313/twitch-discord-link-notifier/graphs/contributors) [![Issues](https://img.shields.io/github/issues/baptiste313/twitch-discord-link-notifier.svg?style=for-the-badge)](https://github.com/baptiste313/twitch-discord-link-notifier/issues) [![Stargazers](https://img.shields.io/github/stars/baptiste313/twitch-discord-link-notifier.svg?style=for-the-badge)](https://github.com/baptiste313/twitch-discord-link-notifier/stargazers) [![Forks](https://img.shields.io/github/forks/baptiste313/twitch-discord-link-notifier.svg?style=for-the-badge)](https://github.com/baptiste313/twitch-discord-link-notifier/network/members) [![Apache License 2.0](https://img.shields.io/github/license/baptiste313/twitch-discord-link-notifier.svg?style=for-the-badge)](https://github.com/baptiste313/twitch-discord-link-notifier/blob/master/LICENSE)

# Twitch Discord Link Notifier

A Node.js application that listens for links in Twitch chat and sends them to a Discord channel.

## Getting Started

1. Clone the repository and install dependencies using `npm i`.
2. Create a Discord webhook in `Server Settings > Integrations > Webhooks`
3. Edit the `config.json` file to include the URL of your Discord webhook, and the name of the Twitch channel to monitor.

### Prerequisites

- Node.js (v15 or higher)
- A Discord account with a server and webhook set up

## Usage

1. Start the application using `node index.js` or run it in the background using `screen -dm bash -c 'node index.js'`.
2. Watch as links posted in your Twitch chat are automatically sent to your Discord channel!

## Acknowledgments

- <https://github.com/tmijs/tmi.js>
