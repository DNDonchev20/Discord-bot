const discord_JS = require ("discord.js")
const config = require('./config.json');

const {Client, Intents} = discord_JS;
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    if (message.content[0] == config.prefix) {
        message.channel.send("Hello");
    }
});

client.login(config.token);