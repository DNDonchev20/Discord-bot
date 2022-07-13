const discord_JS = require ("discord.js");
const config = require('./config.json');
const ban_kick = require('./ban-kick.js');
const timeout = require('./timeout.js');
const remove = require('./remove.js');

const mongoose = require('mongoose')
const botSchema = require("./schemas/bot-schema.js")
const db = mongoose.connection.useDb("bot")

const {Client, Intents} = discord_JS;
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', async () => {
    await mongoose.connect(config.mongo, {keepAlive: true});

    const bot = {
        user_id: "328434761540304898",
        warnings: ["gei"],
    }

    try {
        console.log(`Logged in as ${client.user.tag}!`);
        await new botSchema(bot).save()
    }
    finally {
        mongoose.connection.close();
    }

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
                ban_kick.banMember(message, args);
            }
            
            else if (args[0] == "!kick") {
                ban_kick.kickMember(message, args);
            }

            else if (args[0] == "!timeout") {
                timeout.timeoutMember(message, args);
            }
            
            else if (args[0] == "!remove") {
                remove.removeCommands(message, args);
            }
            
        }

    }
});

client.login(config.token);