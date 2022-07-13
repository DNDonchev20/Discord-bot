const { MessageEmbed } = require('discord.js');

//!timeout <user> <time> <reason>

module.exports = {
    timeoutMember: function(message, args) {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        var reason = "";
        var time = 0;

        if (message.member.permissions.has("MODERATE_MEMBERS", true)) {
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                
                if (memberTarget.moderatable) {
                    time = parseInt(args[2]);

                    if (isNaN(time)) {
                        embed.setColor("#ff0000");
                        embed.setTitle("Error");
                        embed.setDescription("The usage of this command is !timeout <user> <minutes> <reason>.");
                        message.reply({embeds: [embed]});
                        return;
                    }

                    
                    if (args[3]) {
                        for (var i = 3; i < args.length; i++) {
                            if (i == args.length - 1) {
                                reason += `${args[i]}`
                                
                            }
                            else {
                                reason += `${args[i]} `
                            }
                        }
                    }
                    
                    if (time != 0) {
                        embed.setColor("#26ff00");
                        embed.setTitle("Success");
                        if(reason != "")
                        {
                        embed.setDescription(`Successfully timed out <@${target.id}> for ${reason} for ${time} minute(s).`);
                        memberTarget.send(`Timed out from **${message.guild.name}** for ${reason} for ${time} minute(s).`).then(() => {
                            memberTarget.timeout(time * 60 * 1000, reason).catch(console.error);
                        })
                        }
                        else{
                            embed.setDescription(`Successfully timed out <@${target.id}> for ${time} minute(s).`);
                            memberTarget.send(`Timed out from **${message.guild.name}** for ${time} minute(s).`).then(() => {
                                memberTarget.timeout(time * 60 * 1000, reason).catch(console.error);
                            })
                        }
                    }
                    else {
                        embed.setColor("#ff0000");
                        embed.setTitle("Error");
                        embed.setDescription("Cannot timeout for 0 minutes. If you wish to remove a timeout, do !remove timeout <user>.");
                    }
                }
                else {
                    embed.setColor("#ff0000");
                    embed.setTitle("Error");
                    embed.setDescription(`User <@${target.id}> couldn't be timed out.`)
                }

            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription("User was not found.");
            }
        }
        else {
            embed.setColor("#ff0000");
            embed.setTitle("Error");
            embed.setDescription("You don't have the required permissions do to it.")
        }

        message.reply({embeds: [embed]})
    }
}
