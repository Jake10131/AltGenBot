const Discord = require('discord.js')
const prefix = (process.env.PREFIX)
const RoleId = (process.env.ROLEID)
const CId = (process.env.CHANNELID)
const helpmsg = require('../json/help.json');
const errors = require('../json/errors.json')

exports.run = async (client, message, args) => {
 var rerr = errors.rmsg[Math.round(Math.random() * (errors.rmsg.length - 1))];
 var cerr = errors.cmsg[Math.round(Math.random() * (errors.cmsg.length - 1))];
 if (message.channel.id === `${CId}`){
  message.delete(message);
   if (!message.member.roles.cache.has(RoleId)) return message.reply(rerr).then(msg=>msg.delete({timeout:"5000"/*Time in milliseconds*/}));
    const embed = new Discord.MessageEmbed()
    .setTitle("Alt Gen Help:")
    .setThumbnail(client.user.avatarURL({dynamic: true}))
    .addField('**Acc:**', `${helpmsg.acc}`)
    .setColor('RANDOM')
    .setFooter(`Help Command Requested by ${message.author.tag}`)
    message.channel.send(embed)
} else{
  message.delete()
  message.reply(cerr).then(msg=>msg.delete({timeout:"5000"/*Time in milliseconds*/}));
}
}