const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose')
const botSchema = require("./schemas/bot-schema.js")

//!warn <user> <reason>
module.exports = {
    warnMember: async function(mongoPass, message, args)
    {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        var reason = "";
        var exists = false;

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            if (args[2]) {
                for (var i = 2; i < args.length; i++) {
                    if (i == args.length - 1) {
                        reason += `${args[i]}`
                        
                    }
                    else {
                        reason += `${args[i]} `
                    }
                }
            }

            await mongoose.connect(mongoPass, {keepAlive: true});

            if (botSchema.countDocuments({server_id: message.guildId, user_id: target.id}) != "") {
                exists = true;
            }

            if (!exists) {
                const bot = {
                    server_id: message.guildId,
                    user_id: target.id,
                    warning_message: [reason]
                }
    
                try {
                    await new botSchema(bot).save();
                }
                finally {
                    mongoose.connection.close();
                }
            }
            else {
                try {
                    await new botSchema.find({server_id: message.guildId, user_id: target.id}).updateOne({warning_message}, reason).save();
                }
                finally {
                    mongoose.connection.close();
                }
            }
            
        }
    }
}