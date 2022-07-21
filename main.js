const discord_JS = require ("discord.js");
const config = require('./config.json');
const ban_kick = require('./ban-kick.js');
const timeout = require('./timeout.js');
const remove = require('./remove.js');
const warn = require('./warn.js');
const check = require('./check.js');

const mongoose = require('mongoose')
const botSchema = require("./schemas/bot-schema.js")
// const db = mongoose.connection.useDb("bot")

const {Client, Intents} = discord_JS;
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', async () => {
    // await mongoose.connect(config.mongo, {keepAlive: true});

    // var bot = {
    //     server_id: "996363948263755846",
    //     user_id: "328434761540304898",
    //     warning_id: "1",
    //     warning_message: "test",
    // }

    // try {
    //     await new botSchema(bot).save()
    // }
    // finally {
    //     mongoose.connection.close();
    // }
            
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

            else if (args[0] == "!warn") {
                warn.warnMember(config.mongo, message, args);
            }

            else if (args[0] == "!check") {
                check.checkMember(config.mongo, message, args);
            }
        }

    }
});

client.login(config.token);