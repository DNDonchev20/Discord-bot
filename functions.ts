const { MessageEmbed } = require('discord.js');

var reason = "";

module.exports = {
    banMember: function(message, args) {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        
        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);
            
            if (memberTarget.bannable) {
                embed.setColor("#26ff00");
                embed.setTitle("Success");
                embed.setDescription(`Successfully banned <@${target.id}>!`);
                
                memberTarget.send("Leka baluk!").then(() => {
                    memberTarget.ban();
                })
            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription(`User <@${target.id}> can't be banned!`);
            }

            message.reply({embeds: [embed]})
        }
        else {
            message.reply("Couldn't find user!");
        }
    },

    kickMember: function(message, args) {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            if (memberTarget.kickable) {
                embed.setColor("#26ff00");
                embed.setTitle("Success");
                embed.setDescription(`Successfully kicked <@${target.id}>!`);
                
                memberTarget.send("Leka baluk!").then(() => {
                    memberTarget.kick();
                })   
            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription(`User <@${target.id}> can't be kicked!`);
            }

            message.reply({embeds: [embed]})
        }
        else {
            message.reply("Couldn't find user!");
        }
    }
}