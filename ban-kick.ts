const { MessageEmbed } = require('discord.js');

module.exports = {
    banMember: function(message, args) {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        var reason = "";
        
        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);
            
            if (memberTarget.bannable) {
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

                embed.setColor("#26ff00");
                embed.setTitle("Success");
                embed.setDescription(`Successfully banned <@${target.id}> for ${reason}!`);
                
                memberTarget.send(`Banned from ${message.guild.name} for ${reason}!`).then(() => {
                    memberTarget.ban(reason);
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
        var reason = "";

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            if (memberTarget.kickable) {
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
                
                embed.setColor("#26ff00");
                embed.setTitle("Success");
                embed.setDescription(`Successfully kicked <@${target.id}> for ${reason}!`);
                
                memberTarget.send(`Kicked from ${message.guild.name} for ${reason}!`).then(() => {
                    memberTarget.kick(reason);
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
            embed.setColor("#ff0000");
            embed.setTitle("Error");
            embed.setDescription(`User is not found!`);
        }
    }
}