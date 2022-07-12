const discord_JS = require ("discord.js");
const config = require('./config.json');
const functions = require('./functions.ts');

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
    if (message.author.id != client.user.id) {
        var args = message.content.split(" ");
        var simpleCommand = false;
    
        // loop through commands and check for equality with message.content
        for (var i = 0; i < config.cmds.length; i++) {
            if (config.cmds[i]["command"] == message.content) {
                simpleCommand = true;
                message.reply(config.cmds[i]["answer"]);
            }
        }
        
        if (!simpleCommand) {
            if (args[0] == "!ban") {
                functions.banMember(message, args);
            }
            else if (args[0] == "!kick") {
                functions.kickMember(message, args);
            }
        }

    }
});

client.login(config.token);