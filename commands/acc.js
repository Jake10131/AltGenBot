const Discord = require("discord.js")
const fs = require("fs")
const cooldown = (process.env.COOLDOWN)
const RoleId = (process.env.ROLEID)
const CId = (process.env.CHANNELID)
const errors = require('../json/errors.json')
const talkedRecently = new Set();

exports.run = async (client, message, args) => {
  var cerr = errors.cmsg[Math.round(Math.random() * (errors.cmsg.length - 1))];
  var rerr = errors.rmsg[Math.round(Math.random() * (errors.rmsg.length - 1))];
  if (message.channel.id === `${CId}`){
    message.delete(message)
    if (!message.member.roles.cache.has(RoleId)) return message.reply(rerr).then(msg=>msg.delete({timeout:"5000"/*Time in milliseconds*/}));
    if (talkedRecently.has(message.author.id)) {
        message.reply(`Please wait for ${cooldown} minutes to use the same command again!`).then(msg=>msg.delete({timeout:"5000"/*Time in milliseconds*/}))
    } else {
        fs.readFile('./accounts/acc.txt', function(err, data){         
            data = data + '';
            var lines = data.split('\n');
            let random = lines[Math.floor(Math.random()*lines.length)];         
            let embed = new Discord.MessageEmbed()
            .setTitle("Alt account")
            .addField("Here is your Alt:", `\n${random}`, true)
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .setColor('RANDOM')
            .setTimestamp()
            message.author.send({embed}).catch( err => {
            if (err) {
                console.log(err);
                message.reply("**Error. You seems to be locking your DMs.**").then(msg=>msg.delete({timeout:"5000"/*Time in milliseconds*/}));
              }
            });
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, cooldown * 60 *1000);
          
        })
    }
} else{
  message.delete()
  message.reply(cerr).then(msg=>msg.delete({timeout:"5000"/*Time in milliseconds*/}));
}
}