const tmi = require('tmi.js');
const fetch = require('node-fetch');
const config = require('./config.json');

const urlRegex = /(https?:\/\/[^\s]+)/g;

const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: config.username,
        password: config.password
    },
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
        let content;

        if (config.lang === 'fr') {
            content = `**${username}** a publié un lien:\n${urls.join('\n')}`;
        } else {
            content = `**${username}** posted a link:\n${urls.join('\n')}`;
        }

        fetch(config.webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        .then(response => {
            console.log(`✅`);
        })
        .catch(error => console.error(error));
    }
});
