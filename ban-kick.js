const { MessageEmbed } = require('discord.js');

module.exports = {

    banMember: function(message, args) {      
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        var reason = "";
        
        if (message.member.permissions.has("BAN_MEMBERS", true)) {
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
                    
                    if(reason != "")
                    {
                        embed.setDescription(`Successfully banned <@${target.id}> for ${reason}!`);
                        memberTarget.send(`Banned from **${message.guild.name}** for ${reason}!`).then(() => {
                            memberTarget.ban({"reason": reason}).catch(console.error);
                        })
                    }
                    else{
                        embed.setDescription(`Successfully banned <@${target.id}>`);
                        memberTarget.send(`Banned from **${message.guild.name}**`).then(() => {
                            memberTarget.ban({"reason": reason}).catch(console.error);
                        })
                    }
                    
                }
                else {
                    embed.setColor("#ff0000");
                    embed.setTitle("Error");
                    embed.setDescription(`User <@${target.id}> can't be banned!`);
                }
    
            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription(`User is not found!`);
            }
        }
        else {
            embed.setColor("#ff0000");
            embed.setTitle("Error");
            embed.setDescription("You don't have the required permissions do to it");
        }

        message.reply({embeds: [embed]});
    },

    kickMember: function(message, args) {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        var reason = "";

        if (message.member.permissions.has("KICK_MEMBERS", true)) {
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
                    
                    if (reason != "") {
                        embed.setColor("#26ff00");
                        embed.setTitle("Success");
                        embed.setDescription(`Successfully kicked <@${target.id}> for ${reason}!`);
                        
                        memberTarget.send(`Kicked from **${message.guild.name}** for ${reason}!`).then(() => {
                            memberTarget.kick(reason);
                        })   

                    }
                    else {
                        embed.setColor("#26ff00");
                        embed.setTitle("Success");
                        embed.setDescription(`Successfully kicked <@${target.id}>`);
                        
                        memberTarget.send(`Kicked from **${message.guild.name}**`).then(() => {
                            memberTarget.kick(reason);
                        })  
                    }

                }
                else {
                    embed.setColor("#ff0000");
                    embed.setTitle("Error");
                    embed.setDescription(`User <@${target.id}> can't be kicked!`);
                }
            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription(`User is not found!`);
            }
            
        }
        else {
            embed.setColor("#ff0000");
            embed.setTitle("Error");
            embed.setDescription("You don't have the required permissions do to it");
        }
        message.reply({embeds: [embed]})
    }
}