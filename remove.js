const { MessageEmbed } = require('discord.js');

//!remove <choise> <reason>
module.exports = {
    removeCommands : function(message, args) {
        const target = message.mentions.users.first();
        const embed = new MessageEmbed();
        var removeCommand = "";
        var reason = "";

        embed.setColor("#ff0000");
        embed.setTitle("Error");
        embed.setDescription("Wrong command provided!");
        
        if (args[1] == "ban")
        {  
            if (message.member.permissions.has("BAN_MEMBERS", true)) {
                for (var i = 3; i < args.length; i++) {
                    if (i == args.length - 1) {
                        reason += `${args[i]}`;
                    }
                    else {
                        reason += `${args[i]} `;
                    }
                }

                if (args[2]) {
                    if (isNaN(parseInt(args[2].replace(/[<@>]/g, "")))) {
                        embed.setColor("#ff0000");
                        embed.setTitle("Error");
                        embed.setDescription("Couldn't find user.");
                    }
                    else {
                        embed.setColor("#26ff00");
                        embed.setTitle("Success");
                        embed.setDescription(`Successfully removed ban from <@${args[2].replace(/[<@>]/g, "")}>`)
        
                        message.guild.members.unban(args[2].replace(/[<@>]/g, ""), reason);
                    }
                }
                else {
                    embed.setDescription("The usage of this command is !remove ban <user> \nFe. !remove ban <@328434761540304898>")
                }
            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription("You don't have the required permissions do to it.")
            }
            
        }
        else if (args[1] == "timeout")
        {
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                
                if (message.member.permissions.has("MODERATE_MEMBERS", true)) {
                    memberTarget.timeout(null)
    
                    embed.setColor("#26ff00");
                    embed.setTitle("Success");
                    embed.setDescription(`Successfully removed timeout from <@${target.id}>!`);
                }
                else {
                    embed.setColor("#ff0000");
                    embed.setTitle("Error");
                    embed.setDescription("You don't have the required permissions do to it.")
                }
            }
            else {
                embed.setColor("#ff0000");
                embed.setTitle("Error");
                embed.setDescription("Couldn't find user.")
            }
        }

        if (args[2]) {
            for (var i = 2; i < args.length; i++) {
                if (i == args.length - 1) {
                    reason += `${args[i]}`;
                }
                else {
                    reason += `${args[i]} `;
                }
            }
        }
        
        message.reply({embeds: [embed]});
    }
}