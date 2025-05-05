const { 
  Client, 
  Collection, 
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  GatewayIntentBits
} = require("discord.js");


  const client = new Client({ intents: 32767 });
  const Discord = require('discord.js')
  const dbq = require("pro.db");
  const db = require("pro.db");
  const moment = require('moment');
  const fs = require("fs");
  const ms = require(`ms`);
  const { prefix, owners, Guild } = require(`${process.cwd()}/config`);
  const config = require(`${process.cwd()}/config`);
  const Data = require("pro.db");
  const Pro = require(`pro.db`);
 
  
  process.on("unhandledRejection", (reason, promise) => { return })
  process.on("uncaughtException", (err, origin) => { return })
  process.on('uncaughtExceptionMonitor', (err, origin) => { return });
  process.on('multipleResolves', (type, promise, reason) => { return })
  client.commands = new Collection(); // تأكد من تعريف Collection هنا
  module.exports = client;
  
  client.commands = new Collection();
  client.config = require(`${process.cwd()}/config`);
  require("./handler")(client);
  client.prefix = prefix;
  client.login(config.token);

  
  require("events").EventEmitter.defaultMaxListeners = 9999999;
  
  fs.readdir(`${__dirname}/events/`, (err, folders) => {
      if (err) return console.error(err);
  
      folders.forEach(folder => {
          if (folder.includes('.')) return;
  
          fs.readdir(`${__dirname}/events/${folder}`, (err, files) => {
              if (err) return console.error(err);
  
              files.forEach(file => {
                  if (!file.endsWith('.js')) return;
  
                  let eventName = file.split('.')[0];
                  let eventPath = `${__dirname}/events/${folder}/${file}`;
  
                  try {
                      let event = require(eventPath);
                      client.on(eventName, event.bind(null, client));
                  } catch (error) {
                  }
              });
          });
      });
  });


  client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Fetch all guilds the bot is part of and start updating channels
    client.guilds.cache.forEach(async (guild) => {
        const voiceChannelId = await db.get(`voiceOnlineChannel_${guild.id}`);
        if (voiceChannelId) {
            const voiceChannel = guild.channels.cache.get(voiceChannelId);
            if (voiceChannel && voiceChannel.type === 'GUILD_VOICE') {
                console.log(`Starting updates for voice channel: ${voiceChannel.name}`);
                startUpdatingChannelName(voiceChannel);
            } else {
                console.error(`Voice channel not found or invalid: ${voiceChannelId}`);
            }
        }
    });
});

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
  
  process.on("uncaughtException", (err, origin) => {
    console.error("Uncaught Exception:", err, "origin:", origin);
  });
  
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error("Uncaught Exception Monitor:", err, "origin:", origin);
  });
  
  process.on("multipleResolves", (type, promise, reason) => {
    console.error("Multiple Resolves:", type, "promise:", promise, "reason:", reason);
  });