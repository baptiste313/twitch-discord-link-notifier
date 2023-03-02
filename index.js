const tmi = require('tmi.js');
const axios = require('axios').default;
const config = require('./config.json');

const urlRegex = /(https?:\/\/[^\s]+)/g;

const client = new tmi.Client({
    options: { debug: false },
    channels: config.channels
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const ignoredUsers = config.ignoredUsers;

    if (ignoredUsers.includes(tags.username)) return;

    const urls = message.match(urlRegex);

    if (urls) {
        const username = tags.username;
        const twitchUrl = `https://www.twitch.tv/${username}`;
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        axios.get(urls[0])
            .then(response => response.data)
            .then(text => {
                const titleMatch = text.match(/<title>(.*?)<\/title>/);
                const descriptionMatch = text.match(/<meta name="description" content="(.*?)"/);
                const imageUrlMatch = text.match(/<meta property="og:image" content="(.*?)"/);
                let title = titleMatch ? Buffer.from(titleMatch[1], 'utf-8').toString() : "Unknown Title";
                let description = descriptionMatch ? Buffer.from(descriptionMatch[1], 'utf-8').toString() : "No Description Available";
                const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;

                if (config.lang === "fr") {
                    if (title === "Unknown Title") {
                        title = "Titre inconnu";
                    }
                    if (description === "No Description Available") {
                        description = "Pas de description disponible";
                    }
                }

                const embed = {
                    color: 0xff7b10,
                    author: {
                        name: username,
                        url: twitchUrl
                    },
                    title: title,
                    description: description,
                    url: urls[0],
                    image: {
                        url: imageUrl
                    },
                    timestamp: date
                };

                const webhookMessage = {
                    username: config.botUsername,
                    avatar_url: config.botAvatarUrl,
                    embeds: [embed]
                };

                axios.post(config.webhookUrl, webhookMessage, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        console.log(`[✅] Message from user ${username} posted on Discord`);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }
});
