const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

client.on('ready', () => {
    setInterval(() => {

        const statuses = [
            "By jake10131",
            `${prefix}help`,
            "AltGen"
        ]

        const AutoS = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(AutoS, { type: "PLAYING" }).catch(console.error) //PLAYING: WATCHING: LISTENING: STREAMING:

    }, 
            4000)/*Time in milliseconds*/
  console.log(`Connected! Logged in as ${client.user.tag}!`)
  console.log(`Invite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
      
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
      
    try {
        let commandFile = require(`./commands/${command}.js`);
	      if(commandFile.length <= 0){
        return console.log("Couldn't find any commands in the commands folder!");
	}
    commandFile.run(client, message, args);
  } catch (err) {
	console.log(err);
    message.reply({embed: {
                description: "That command does not exist, Take a look at " + `${prefix}` + " help!"
            }})
  }
});

client.login(token)