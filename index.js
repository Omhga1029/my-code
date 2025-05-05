const { token } = require("./config.json");
const { Client, GatewayIntentBits, Partials, interaction, SelectMenuBuilder, AttachmentBuilder, EmbedBuilder, Embed, ButtonBuilder, MessageActionRowButtonStyles, MenuBuilder, ActionRowBuilder, ActionRow, ButtonStyle, PermissionFlagsBits, PermissionsBitField } = require("discord.js");

let { Prefix } = require("./config.json");
const has_play = new Map();
const Discord = require('discord.js');
const { error } = require("node:console");
const fs = require('fs')
const path = require('path')
const config = require("./config");
const img_model = require("./models/image")
const { StringSelectMenuBuilder } = require('discord.js')
const { TextInputStyle } = require('discord.js')
const ownerId = ["1261938884510748748", "1022607092781162526"]
const { Canvas, GlobalFonts } = require("canvas-constructor/napi-rs")
const { createCanvas, loadImage } = require('canvas');
config.numbers = config.numbers.slice(1);
const { createRouletteGifImage, createRouletteImage, shuffleArray } = require('./pkg.js')
const { log } = require("debug/src/node.js");
const ms = require("ms")
const canvass = require("canvas-constructor/napi-rs")
// تسجيل ملف الخطوط
GlobalFonts.registerFromPath(process.cwd() + "./abdullah.ttf", "Cairo");


  const client = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  ////////

  require("dotenv").config();

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ///////


  // Quick.db 
  const { QuickDB } = require("quick.db");
  const dbq = new QuickDB();
  var colors = require("colors")
  require('events').EventEmitter.defaultMaxListeners = 120;
  client.login(token)


  client.on("ready", () => {
    console.log(`Client Ready Bot On ${client.user.tag}`.red)
    console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`.bgGreen)
  });

  client.on('ready', async () => {
    setInterval(async () => {
      let activity = await dbq.get(`activity_${client.user.id}`);
      let existActivity = client.user.presence.activities[0];
      if (!activity) activity = { name: "Cain store", type: Discord.ActivityType.Streaming, url: "https://www.twitch.tv/#$" };
      if (existActivity && existActivity.name == activity.name && existActivity.type == activity.type) return;
      client.user.setActivity(activity);
    });
  });

  //------------------command---------------------\\

  const random = [
    " قالوا لك  تناول صنف واحد فقط من الطعام لمدة شهر .  بيكون اختيارك ؟",
    " تحب تستفزه ؟",
    " حلمت في شخص وصحيت وحصلت رساله من نفس الشخص . ارسل ايموجيي مثل ردة فعلك.",
    " صورة تحس إنك ابدعت بتصويرها.",
    " إيش سهران ؟",
    " تتوقع يطالعك طول الوقت بدون ملل ؟",
    " جالس الحين ؟",
    " من عشرة تقيم يومك ؟",
    " مدة نمت فيها كم ساعه ؟",
    " سنة ميلادية مرت عليك ؟",
    " رسالة بالواتس جاتك من مين ؟",
    " مانمت ؟",
    " فيه أحد يراقبك ؟",
    " من عشره تعطي حظك ؟",
    " ماسكه معك الفترة هذي ؟",
    " مستحيل تمل منه ؟",
    " تنام بالعادة ؟",
    " من عشرة جاهز للدراسة ؟",
    " صديقك الفزعة",
    " نفسك يرجع بكل تفاصيله ؟",
    " صورة بجوالك ؟",
    " أغرب مكان قد صحتوا فيه؟",
    " جاك خبر مفرح اول واحد تعلمه فيه مين ؟",
    " لو يختفي تصير الحياة جميلة ؟",
    " من عشرة تشوف نفسك محظوظ ؟",
    " نفسك بكلمة وحدة بس",
    " لأقرب شخص لقلبك ؟",
    " الصداقة بالمدة ولا بالمواقف ؟",
    "@منشن.شخص وقوله : حركتك مالها داعي.",
    " مسلسلات ولا م تهتم ؟",
    " يعني لك الكثير ؟",
    " عدد اللي معطيهم بلوك ؟",
    " الغباء انك ؟",
    " شيء محتاجه الحين ؟",
    "@منشن شخص تقوله : بطل تفكر فيني ابي انام",
    " مسهرك ؟.",
    " ولا مبسوط ؟",
    " سوالف مين ؟",
    " من عشرة روتينك ممل ؟",
    " مستحيل ترفضه ؟.",
    " من عشرة الإيجابية فيك ؟.",
    " اشباهك الاربعين عايشين حياة حلوة ؟.",
    " جالس عندك ؟",
    " من عشرة تشوف نفسك انسان ناجح ؟",
    " حظك فيه حلو ؟.",
    " من عشرة الصبر عندك ؟",
    " مرة نزل عندكم مطر ؟",
    " مشاكلك بسبب ؟",
    " شعور ممكن يحسه انسان ؟",
    " تحب تنشبله ؟",
    " شيء ؟",
    " تسكن وحدك ؟",
    " لونين تحبهم مع بعض ؟",
    " تكره نفسك ؟",
    " من عشرة مروق ؟",
    " تتمنى تعيش وتستقر فيها طول عمرك ؟",
    " للحياة لون إيش بيكون لون حياتك ؟",
    " في يوم من الأيام تصبح شخص نباتي ؟.",
    " قابلت شخص يشبهك ؟",
    " شخص تهاوشت معه ؟",
    " ساعة ايش كنت تسوي ؟",
    " تقولها للي ببالك ؟",
    " شيء مضيع وقتك فيه ؟",
    " فتحتا خزانتك إيش اكثر لون بنشوف ؟",
    " خارقة تتمنى تمتلكها ؟",
    " مصايبك مع مين ؟",
    " زعلت إيش يرضيك ؟",
    " النوع اللي تعترف بسرعه ولا تجحد ؟",
    " الاشياء البسيطة اللي تسعدك ؟",
    " مره بكيت",
    " على شخص قال : انا بطلع من حياتك؟.",
    " يعبر عن وضعك الحين ؟",
    " المنتظر بالنسبة لك ؟",
    " بنسمعك إيش بتقول ؟",
    " اللي ولدت فيها ؟",
    " شخص مستحيل يمر يوم وما تكلمه ؟",
    " تقولها لنفسك ؟",
    " من عشرة متفائل بالمستقبل ؟",
    " المعتاد اذا أحد ناداك ؟",
    "حط @منشن لشخص وقله الله يسامحك بس",
    " كلمه تسمعها من أمك ؟",
    " تفضل عمل ميداني ولاعمل مكتبي ؟",
    " حيوان تحبه ؟",
    " مشاكلك بسبب ؟",
    " صوت تكرهه ؟",
    " تتمنى انها م تنتهي ؟",
    " صعب تتقبلها بسرعه ؟",
    " من عشرة راضي عن وضعك الحالي ؟",
    " م تقدر تمسك ضحكتك ؟",
    " شخص قالك كلمة حلوة ؟",
    " شيء تحبه بنفسك ؟",
    " نفسك يرجع ؟",
    " وقتك ضايع على ؟",
    " تعرفت على اعز صديق لك ؟",
    " ان في حُب من أول نظرة ولا لا ؟.",
    " هم شيء الفترة هذي ؟",
    " م تحب تناقشه ؟",
    "تقييمك للديسكورد الفترة ذي ؟"

  ]

  client.on('messageCreate', async message => {
    var result = random[Math.floor(Math.random() * random.length)];
    const commandChannel = await dbq.get(`commandChannel_${message.guild.id}`);
    if (!commandChannel || message.channel.id !== commandChannel) return;
    if (message.content === Prefix + "كت") {
      const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
      if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      let backgroundImage;
      const image = `./imager/sbgrouns_${message.guild.id}.png`
      try {
        backgroundImage = await canvass.loadImage(image);
      } catch (error) {
        backgroundImage = await canvass.loadImage(`./photo/question.png`);
      }

      async function createCanvas() {
        const background = await canvass.loadImage(backgroundImage);
        const name = new Canvas(2560, 1080)
          .printImage(background, 0, 0, 2560, 1080)
          .setColor("#FFFFFF")
          .setTextFont("bold 120px Cairo")
          .setTextAlign("center")
          .printText(`كت تويت`, 1320, 250)
          .pngAsync();

        const question = new Canvas(2560, 1080)
          .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
          .setColor("#FFFFFF")
          .setTextFont("bold 120px Cairo")
          .setTextAlign("center")
          .printText(result, 1280, 600)
          .pngAsync();


        return question;
      }
      let attachment = new AttachmentBuilder(await createCanvas(), {
        name: "Cain-Store.png"
      });

      message.channel.send({ files: [attachment] });
    }
  });

  ////////////////////////////////////////////////////////////////////
  let times = false;

  client.on('messageCreate', async message => {
    try {
      if (message.author.bot) return;
      const commandChannel = await dbq.get(`commandChannel_${message.guild.id}`);
      if (!commandChannel || message.channel.id !== commandChannel) return;
      if (message.content.startsWith(Prefix + `اعلام`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }


        const file = require('./Games/flags.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbimagecf_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/answer.png`);
        }

        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);
          const flagImageURL = selectedFlag.flag;
          const flagImage = await canvass.loadImage(flagImageURL);
          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اول من يكتب اسم العلم`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printImage(flagImage, 975, 400) // حيث x و y و width و height تكون قيم تحديد الموقع والحجم الذي تريده للصورة
            .pngAsync();


          return question;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });


        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `حيوانات`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }


        const file = require('./Games/animals.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbimagecf_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/answer.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);
          const flagImageURL = selectedFlag.sheh;
          const flagImage = await canvass.loadImage(flagImageURL);
          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهو اسم الحيوان `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printImage(flagImage, 1050, 425, 400, 400) // حيث x و y و width و height تكون قيم تحديد الموقع والحجم الذي تريده للصورة
            .pngAsync();

          return question;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });


        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + 'شركة')) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }


        const file = require('./Games/company.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbimagecf_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/answer.png`);
        }

        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);
          const flagImageURL = selectedFlag.flag;
          const flagImage = await canvass.loadImage(flagImageURL);
          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اول من يكتب اسم الشركة`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printImage(flagImage, 975, 400, 450, 450) // حيث x و y و width و height تكون قيم تحديد الموقع والحجم الذي تريده للصورة
            .pngAsync();


          return question;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });


        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `فكك`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/Break.json');
        // تعيين مسار الصورة الخلفية
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يفكك الاسم`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.break, 1280, 600)
            .pngAsync();


          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        // قم بإرسال الرسالة التي تحتوي على النص داخل Canvas
        message.channel.send({ files: [attachment] })
          .then(() => {
            // قم بانتظار إجابة اللاعب
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `ترتيب`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/trteb.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يرتب الارقام`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.trteb, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        // قم بإرسال الرسالة التي تحتوي على النص داخل Canvas
        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `صحح`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/sheh.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يصحح الاسم`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.sheh, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `اعكس`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/opposite.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يعكس الاسم`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.sheh, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `اسرع`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/fast.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يكتب الاسم`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.sheh, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.channel.send({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `حرف`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        // التحقق مما إذا كانت اللعبة قائمة بالفعل
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/Letter.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يركب الكلمة`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.sheh, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `ادمج`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/integrate.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`اسرع شخص يدمج الكلمة`, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.sheh, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `جمع`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/plural.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهي جمع الكلمة `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.ans, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `ضرب`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/Multiply.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهو ضرب التالي `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.ans, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `طرح`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/Subtract.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهو طرح التالي `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.ans, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `ترجمة`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/translation.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهو ترجمة النص `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.ans, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      } else if (message.content.startsWith(Prefix + `مفرد`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/individual.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
          // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهو فرد الكلمة `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.ans, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      }
      else if (message.content.startsWith(Prefix + `عواصم`)) {
        const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
        if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (times) {
          message.reply("❌ هناك بالفعل لعبة فعاله في هذا الروم!");
          return;
        }

        const file = require('./Games/capital.json');
        const selectedFlag = file[Math.floor(Math.random() * file.length)];

        const filter = s => selectedFlag.jwab.some(answer => answer.toLowerCase() === s.content.toLowerCase());

        let backgroundImage;
        const image = `./imager/sbgrouns_${message.guild.id}.png`
        try {
          backgroundImage = await canvass.loadImage(image);
        } catch (error) {
          backgroundImage = await canvass.loadImage(`./photo/question.png`);
        }
        // إنشاء رسالة تحتوي على النص داخل Canvas
        async function createCanvas() {
          // إضافة الصورة الخلفية
          const background = await canvass.loadImage(backgroundImage);

          const name = new Canvas(2560, 1080)
            .printImage(background, 0, 0, 2560, 1080)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(`ماهي عاصمة الدولة `, 1320, 250)
            .pngAsync();

          const question = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await name), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 120px Cairo")
            .setTextAlign("center")
            .printText(selectedFlag.ans, 1280, 600)
            .pngAsync();

          const times = new Canvas(2560, 1080)
            .printImage(await canvass.loadImage(await question), 0, 0, 2560, 1050)
            .setColor("#FFFFFF")
            .setTextFont("bold 80px Cairo")
            .setTextAlign("center")
            .printText(`لديك 15 ثانية`, 1210, 905)
            .pngAsync();

          return times;
        }
        let attachment = new AttachmentBuilder(await createCanvas(), {
          name: "Cain-Store.png"
        });

        message.reply({ files: [attachment] })
          .then(() => {
            message.channel.awaitMessages({ filter, max: 1, time: 15 * 1000, errors: ['time'] })
              .then(async collected => {
                const winner = collected.first().author;
                let userPoints = await dbq.get(`points_${message.guild.id}${message.guild.id}.${winner}`);

                if (userPoints === null || userPoints === undefined) {
                  userPoints = 0;
                }

                userPoints += 1;
                await dbq.set(`points_${message.guild.id}.${winner}`, userPoints);


                times = false;
                const row_2 = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('points_button')
                      .setLabel(`🧩 ${userPoints}`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                      .setDisabled(true)
                  );
                message.channel.send({ content: `:crown: - فاز ${winner} في اللعبة`, components: [(row_2)] });
              })
              .catch(collected => {
                times = false;
                message.channel.send(`**❌ لا يوجد اي فائز , الاجابه كانت ${selectedFlag.jwab}**`);
              });
          });
      }
    } catch (error) {
      console.error(error);
    }
  });

  ////////////////////////////////////////////////////////////////////

  const games = [`
${Prefix}سالفة
${Prefix}روليت
${Prefix}مافيا
${Prefix}كت
${Prefix}زر
${Prefix}اعلام
${Prefix}فكك
${Prefix}ترتيب
${Prefix}صحح
${Prefix}جمع
${Prefix}مفرد
${Prefix}حيوانات
${Prefix}شركة
${Prefix}ضرب
${Prefix}طرح
${Prefix}ترجمة
${Prefix}عواصم
${Prefix}اعكس
${Prefix}اسرع
${Prefix}حرف
${Prefix}ادمج
${Prefix}توب
${Prefix}ايقاف
`
  ]

  client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const commandChannel = await dbq.get(`commandChannel_${message.guild.id}`);
    if (!commandChannel || message.channel.id !== commandChannel) return;
    if (message.content.startsWith(Prefix + 'العاب')) {

      const button = new ButtonBuilder()
        .setLabel('الدعم الفني')
        .setURL(`https://discord.gg/Cain`)
        .setStyle(Discord.ButtonStyle.Link);
      const row = new ActionRowBuilder().addComponents(button);


      message.channel.send({ content: `${games}`, components: [row] })
        .catch(console.error);
    }
  });

  ////////////////////////////////////////////////////////////////////
  client.on('messageCreate', async message => {
    try {
      if (message.author.bot) return;
  
      const commandChannel = await dbq.get(`commandChannel_${message.guild.id}`);
      if (!commandChannel || message.channel.id !== commandChannel) return;
  
      if (message.content.startsWith(Prefix + 'توب')) {
        try {
          const userPointsData = await dbq.get(`points_${message.guild.id}`);
          if (!userPointsData) {
            return message.channel.send("لا يوجد بيانات متاحة حاليا.");
          }
  
          const topPlayers = Object.entries(userPointsData)
            .sort(([, pointsA], [, pointsB]) => pointsB - pointsA) // ترتيب اللاعبين حسب النقاط من الأعلى إلى الأدنى
            .slice(0, 10) // الحصول على أول 10 لاعبين
            .map(([userId, points], index) => {
              let emoji = '';
              switch (index) {
                  case 0:
                      emoji = '🥇'; // إيموجي للمركز الأول
                      break;
                  case 1:
                      emoji = '🥈'; // إيموجي للمركز الثاني
                      break;
                  case 2:
                      emoji = '🥉'; // إيموجي للمركز الثالث
                      break;
              }
              return `${index + 1}. <@${userId}>: ${points} ${emoji}`;
          });
  
          const embed = new EmbedBuilder()
            .setColor("#153244")
            .setTitle("**🧩 Top Points**")
            .setDescription(topPlayers.join('\n'));
  
          message.reply({ embeds: [embed] });
        } catch (error) {
          console.error("حدث خطأ:", error);
          message.channel.send("حدث خطأ أثناء جلب بيانات المستخدمين ونقاطهم.");
        }
      } else if (message.content.startsWith(Prefix + 'deletepoints')) {
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        dbq.delete(`points_${message.guild.id}`);
        message.channel.send("تم حذف جميع الأعضاء والنقاط بنجاح.");
      } else if (message.content.startsWith(Prefix + 'points')) {
        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
  
        const args = message.content.split(' ').slice(1);
        const userId = args[0].replace(/[<@!>]/g, ''); // استخراج معرف المستخدم من النص
        const pointsToAdd = parseInt(args[1], 10);
  
        if (isNaN(pointsToAdd)) {
          return message.channel.send("يرجى تحديد عدد النقاط بشكل صحيح.");
        }
  
        let userPoints = await dbq.get(`points_${message.guild.id}.${userId}`);
        if (!userPoints) {
          userPoints = 0;
        }
  
        await dbq.set(`points_${message.guild.id}.${userId}`, userPoints + pointsToAdd);
        message.channel.send(`تم إضافة ${pointsToAdd} نقاط لـ <@${userId}> بنجاح.`);
      }
    } catch (error) {
      console.error(error);
    }
  });





  ////////////////////////////////////////////////////////////////////

  client.on("messageCreate", async message => {
    const commandChannel = await dbq.get(`commandChannel_${message.guild.id}`);
    if (!commandChannel || message.channel.id !== commandChannel) return;
    if (message.content == Prefix + "زر") {
      const mgamess = await dbq.get(`managergamesfr_${message.guild.id}`);
      if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      const wait = require('node:timers/promises').setTimeout;
      const embed = new Discord.EmbedBuilder()
        .setTitle("**اسرع شخص يضغط الزر : ⚡**")
        .setDescription("**معكم 10 ثواني تضغطون الزر**\n**اسرع واحد يضغط الزر يفوز**")
        .setTimestamp()
        .setColor("#363636")
      const row = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("r1")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r2")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r3")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r4")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r5")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
      )
      const row2 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("r6")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r7")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r8")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r9")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r10")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
      )
      const row3 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("r11")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r12")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r13")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r14")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r15")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
      )
      const row4 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("r16")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r17")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r18")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r19")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
          .setCustomId("r20")
          .setLabel("・")
          .setDisabled(true)
          .setStyle(Discord.ButtonStyle.Secondary),
      )
      message.channel.send({ components: [row, row2, row3, row4], embeds: [embed] }).then(async m => {
        await new Promise(resolve => setTimeout(resolve, 3500));
        const all = [...row.components, ...row2.components, ...row3.components, ...row4.components]
        const r = Math.floor(Math.random() * all.length);
        const button = all[r]
        button.setStyle(Discord.ButtonStyle.Success)
        button.setDisabled(false)
        const embed2 = new Discord.EmbedBuilder()
          .setTitle("**اسرع شخص يضغط الزر : ⚡**")
          .setDescription("**معكم 10 ثواني تضغطون الزر**\n**اضغط على الزر الأخضر 🟢**")
          .setTimestamp()
          .setColor("#00530a")
        m.edit({ components: [row, row2, row3, row4], embeds: [embed2] })
        const time = setTimeout(() => {
          all.forEach(btn => btn.setDisabled(true));
          button.setStyle(Discord.ButtonStyle.Danger)
          const embed3 = new Discord.EmbedBuilder()
            .setTitle("**اسرع شخص يضغط الزر : ⚡**")
            .setDescription("**انتهى الوقت**\n**🔴 لا يوجد اي فائز**")
            .setTimestamp()
            .setColor("#810001")
          m.edit({ components: [row, row2, row3, row4], embeds: [embed3] })
        }, 10000)
        let buttonClicked = false; // متغير لتتبع ما إذا تم الضغط على الزر بالفعل أم لا
        client.on("interactionCreate", async interaction => {
          if (interaction.isButton()) {
            if (interaction.customId.startsWith("r") && !buttonClicked) {
              all.forEach(btn => btn.setDisabled(true));
              button.setStyle(Discord.ButtonStyle.Success).setDisabled(true);
              const embed4 = new Discord.EmbedBuilder()
                .setTitle("**اسرع شخص يضغط الزر : ⚡**")
                .setDescription(`**👑 | ${interaction.user}**`)
                .setTimestamp()
                .setColor("#cfc827");
              interaction.message.edit({
                components: [row, row2, row3, row4],
                embeds: [embed4]
              });
              interaction.channel.send(`👑 - فاز ${interaction.user} في اللعبة`);
              interaction.deferUpdate();
              clearTimeout(time);
              buttonClicked = true;
            }
          }
        });




      })
    }
  });

  ////////////////////////////////////////////////////////////////////

  // Vip Owner
  client.on("messageCreate", async (message) => {
    if (message.content.startsWith(Prefix + "vip")) {
      if (!ownerId.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;


      const setting = new Discord.EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setTitle("Vip")
        .setDescription("Commands Owner bot");

      const row1 = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("restart")
            .setLabel("Restart Bot")
            .setStyle(2)
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("avatar")
            .setLabel("Set Avatar")
            .setStyle(2)
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("name")
            .setLabel("Set Name")
            .setStyle(2)
        )
      const row2 = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("stats")
            .setLabel("Set Stats")
            .setStyle(2)
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("banner")
            .setLabel("Set Banner")
            .setStyle(2)
        );

      message.channel.send({
        embeds: [setting],
        components: [row1, row2]
      }).then((message) => {

        const collector = message.createMessageComponentCollector({
          time: 60000
        });

        collector.on('collect', async (interaction) => {
          if (interaction.customId == "stats") {
            interaction.reply("playing ? | streaming ? | listening ? | watching ? | competing ?");

            const filter = m => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

            collector.on("collect", async (i) => {
              await i.delete().catch(console.error); // حذف رسالة العضو

              const allowedActivities = {
                'playing': 0,
                'streaming': 1,
                'listening': 2,
                'watching': 3,
                'competing': 5
              };

              const status = i.content.trim().split(" "); // تقسيم النص إلى كلمات
              if (!status) return interaction.channel.send({ content: 'الرجاء ادخال نوع الحالة واسمها.' });

              const activity = status.shift().toLowerCase(); // استخراج نوع الحالة وتحويله إلى حروف صغيرة
              const name = status.join(" "); // جمع الباقي من النص معًا للحصول على اسم الحالة

              if (!Object.keys(allowedActivities).includes(activity)) return interaction.channel.send({ content: `الرجاء اختيار حالة صحيحة: ${Object.keys(allowedActivities).join(', ')}.` }).then(m => setTimeout(() => m.delete(), 3000));

              if (!name) return interaction.channel.send({ content: 'الرجاء ادخل إسم الحالة بعد نوعها\nمثل: `playing hello world`' }).then(m => setTimeout(() => m.delete(), 3000));

              await dbq.set(`activity_${client.user.id}`, { name, type: allowedActivities[activity], url: "https://www.twitch.tv/#$" })

              client.user.setActivity({ name, type: allowedActivities[activity], url: "https://www.twitch.tv/#$" });
              // إنهاء جمع الرسائل
              collector.stop();
              await interaction.editReply({ content: `تم تحديث حالة البوت إلى ${activity} ${name}.`, ephemeral: true });
            })
          }

          if (interaction.customId === "banner") {
            try {
              await interaction.reply("Please send the new banner as a URL.");
              // Wait for the user to respond with a URL
              const filter = (m) => m.author.id === interaction.user.id && (m.attachments.size > 0 || /^https?:\/\/\S+\.\S+/.test(m.content));
              const response = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
              if (response.size === 0) {
                return interaction.editReply("No response received, banner not updated.");
              }
              const bannerURL = response.first().attachments.size > 0 ? response.first().attachments.first().url : response.first().content;
              await client.user.setBanner(bannerURL);
              await interaction.editReply("Banner updated successfully.");
            } catch (e) {
              await interaction.editReply(`ERROR: ${e.message}`);
            }
  
            collector.stop();
          }

          // Restart the bot
          if (interaction.customId == "restart") {
            try {
              await interaction.reply("Restarting bot...");
              await client.destroy();
              await client.login(token);
              await interaction.editReply("Bot has been restarted.");
            } catch (e) {
              await interaction.editReply(`ERROR: ${e.message}`);
            }

            collector.stop();
          }


          // Set the bot's avatar
          if (interaction.customId == "avatar") {
            try {
              await interaction.reply("Please send the new avatar as a URL or image file.");
              // Wait for the user to respond with an image
              const filter = (m) => m.author.id === interaction.user.id && (m.attachments.size > 0 || /^https?:\/\/\S+\.\S+/.test(m.content));
              const response = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
              if (response.size === 0) {
                return interaction.editReply("No response received, avatar not updated.");
              }
              const url = response.first().attachments.size > 0 ? response.first().attachments.first().url : response.first().content;
              await client.user.setAvatar(url);
              await interaction.editReply("Avatar updated successfully.");
              await response.first().delete(); // Delete the user's message
            } catch (e) {
              await interaction.editReply(`ERROR: ${e.message}`);
            }

            collector.stop();
          }

          // Set the bot's name
          if (interaction.customId == "name") {
            try {
              await interaction.reply("Please enter the new name for the bot.");
              // Wait for the user to respond with the new name
              const filter = (m) => m.author.id === interaction.user.id;
              const response = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
              if (response.size === 0) {
                return interaction.editReply("No response received, name not updated.");
              }
              const newName = response.first().content;
              await client.user.setUsername(newName);
              await interaction.editReply(`Bot name updated to ${newName} successfully.`);
            } catch (e) {
              await interaction.editReply(`ERROR: ${e.message}`);
            }

            collector.stop();
          }

        })

      })

    }
  });

















  ////////////////////////////////////////////////////////////////////

  // اذا منشنت البوت يطلع  البريفكس الخاص فيه
  client.on('messageCreate', async message => {
    if (message.author.bot) return; // تجاهل الرسائل الواردة من البوتات
    if (message.content === `<@${client.user.id}>`) {
      message.reply({ content: `**My Prefix is \`${Prefix}\`**` })
    }
  });

  client.on('messageCreate', async message => {
    if (message.author.bot) return; // تجاهل الرسائل الواردة من البوتات

    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase(); // أخذ أمر الرسالة (الجزء بعد البريفكس)

    if (command === 'setprefix') {
      if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;

      if (args.length < 1) return message.reply(":rolling_eyes: **Please put a new prefix.!**");

      Prefix = args[0];
      await dbq.set(`prefix_${client.user.id}`, Prefix); // حفظ البريفكس الجديد في قاعدة البيانات
      message.channel.send(`✅ تم تغيير البريفكس إلى ${Prefix}`);
    }
  });


  // Help Command
  client.on('messageCreate', async message => {
    if (message.author.bot) return; // تجاهل الرسائل الواردة من البوتات
    if (message.content.startsWith(Prefix + `help`)) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
      let embed = new EmbedBuilder()
        .setTitle(`*Bot Commands:*`)
        .setThumbnail(client.user
          .avatarURL({ dynamic: true }))
        .setColor(`#153244`)
        .setDescription(`
          \ **${Prefix}**\ **اظهار الالعاب المتوفرة: العاب**
          \ **${Prefix}**\ **vip: اوامر الاونر**
          \ **${Prefix}**\ **deletepoints: حذف جميع النقاط**
          \ **${Prefix}**\ **points: اعطاء نقاط**
          \ **${Prefix}**\ **setprefix: تغيير بادئة البوت**
          \ **${Prefix}**\ **settings: تعديل اعدادات البوت**
          `)
          .setFooter({ text: 'Cain store', iconURL: 'https://g.top4top.io/p_3146yvfwz1.png' })
        message.author.send({ embeds: [embed] })
        .then(() => {
          message.react("✅");
        })
        .catch(() => {
          message.react('❌');
        })
    }

  })

  client.on('messageCreate', async message => {
    if (message.content.startsWith( Prefix + 'settings')) {
      if (!ownerId.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
        const embed = new EmbedBuilder()
            .setTitle('اختر فئة')
            .setColor('#153244')
            .setFooter({
              text: 'Cain store',
              iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
            })
            .setDescription('اختر فئة للتحكم بلعبة معينة.');

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('category_select')
            .setPlaceholder('اختر فئة')
            .addOptions([
                {
                   label: ' الاعدادات العامه العامه',
                   emoji: '1285906983089602641',
                   value: 'setting',
                },
                {
                    label: 'الروليت',
                    emoji: '1285906983089602641',
                    value: 'roulette',
                },
                {
                    label: 'المافيا',
                    emoji: '1285906983089602641',
                    value: 'mafia',
                },
                {
                  label: 'برا السالفه',
                  emoji: '1285906983089602641',
                  value: 'bra',
              },
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = (interaction) => interaction.customId === 'category_select' && interaction.user.id === message.author.id;
        const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000000 });

        collector.on('collect', async (interaction) => {
          if (interaction.values[0] === 'setting') {
            const newEmbed = new EmbedBuilder()
            .setTitle('التحكم باعدادات البوت')
            .setColor('#153244')
            .setFooter({
              text: 'Cain store',
              iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
            });

            const newSelectMenu = new StringSelectMenuBuilder()
                .setCustomId('setting_select')
                .setPlaceholder('اختر خياراً')
                .addOptions([
                    { label: 'تفعيل منشن الهير مع رسائل الالعاب الجماعيه', value: 'togglehere' },
                    { label: 'تحديد شات الالعاب الفرديه', value: 'sichannel' },
                    { label: 'تحديد شات الالعاب الجماعيه', value: 'smchannel' },
                    { label: 'تحديد من يستطيع تشغيل الالعاب الجماعيه', value: 'smgamesmu' },
                    { label: 'تحديد من يستطيع تشغيل الالعاب الفرديه', value: 'smrofr' },
                    { label: 'تحديد صورة الفوز', value: 'sbwinner' },
                    { label: 'تحديد خلفيه الالعاب الفرديه', value: 'sbgrouns' },
                    { label: 'تحديد خلفيه امر الاعلام والشركات', value: 'sbimagecf' },
                    { label: 'الرجوع الى القائمه الرئيسيه', value: 'back' },
                ]);
            const newRow = new ActionRowBuilder().addComponents(newSelectMenu);
            await interaction.update({ embeds: [newEmbed], components: [newRow] });
        } else if (interaction.values[0] === 'roulette') {
                const newEmbed = new EmbedBuilder()
                .setTitle('اختر التحكم في لعبة الروليت')
                .setColor('#153244')
                .setFooter({
                  text: 'Cain store',
                  iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
                });

                const newSelectMenu = new StringSelectMenuBuilder()
                    .setCustomId('roulette_select')
                    .setPlaceholder('اختر خياراً')
                    .addOptions([
                        { label: 'تفعيل والغاء زر النيوك', value: 'togglenewk' },
                        { label: 'تفعيل والغاء زر الانعاش ', value: 'togglerefresh' },
                        { label: 'تفعيل والغاء زر الطرد العشوائي ', value: 'togglekickrandom' },
                        { label: 'تحديد عدد لاعبين الروليت', value: 'setplayers' },
                        { label: 'تفعيل او الغاء خاصيه ازرار المشاركين', value: 'number' },
                        { label: 'تحديد وقت بدء الروليت', value: 'timerruoll' },
                        { label: 'تحديد صورة البدء للروليت', value: 'ruolateimage' },
                        { label: 'تحديد الوان الروليت', value: 'setcolor' },
                        { label: 'الرجوع الى القائمه الرئيسيه', value: 'back' },
                    ]);
                const newRow = new ActionRowBuilder().addComponents(newSelectMenu);
                await interaction.update({ embeds: [newEmbed], components: [newRow] });
            } else if (interaction.values[0] === 'mafia') {
                const newEmbed = new EmbedBuilder()
                .setTitle('اختر التحكم في لعبة المافيا')
                .setColor('#153244')
                .setFooter({
                  text: 'Cain store',
                  iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
                });
                const newSelectMenu = new StringSelectMenuBuilder()
                    .setCustomId('mafia_select')
                    .setPlaceholder('اختر خياراً')
                    .addOptions([
                        { label: 'تحديد صورة المتسابقين للمافيا', value: 'setmafiamem' },
                        { label: 'تحديد صورة البدء للمافيا', value: 'setimagemaf' },
                        { label: 'تحديد وقت بدء للمافيا', value: 'timermafia' },
                        { label: 'تحديد عدد لاعبين المافيا', value: 'playersmafia' },
                        { label: 'الرجوع الى القائمه الرئيسيه', value: 'back' },
                    ]);
                const newRow = new ActionRowBuilder().addComponents(newSelectMenu);
                await interaction.update({ embeds: [newEmbed], components: [newRow] });
            } else if (interaction.values[0] === 'bra') {
            const newEmbed = new EmbedBuilder()
            .setTitle('اختر التحكم في لعبة برا السالفه')
            .setColor('#153244')
            .setFooter({
              text: 'Cain store',
              iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
            });

            const newSelectMenu = new StringSelectMenuBuilder()
                .setCustomId('bra_select')
                .setPlaceholder('اختر خياراً')
                .addOptions([
                    { label: ' تحديد صورة البدء لبرا السالفه', value: 'setimagebra' },
                    { label: 'تحديد عدد لاعبين لعبه برا السالفه', value: 'addbra' },
                    { label: 'تحديد وقت بدء للعبه برا السالفه', value: 'timerbta' },
                    { label: 'تحديد صورة الاعلان ', value: 'setvs' },
                    { label: 'تحديد صورة السؤال', value: 'setquestion' },
                    { label: 'تحديد صورة الجواب', value: 'setanswer' },
                    { label: 'الرجوع الى القائمه الرئيسيه', value: 'back' },
                ]);
            const newRow = new ActionRowBuilder().addComponents(newSelectMenu);
            await interaction.update({ embeds: [newEmbed], components: [newRow] });
        }
        });

        collector.on('end', collected => {
            sentMessage.edit({ components: [] });
        });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'roulette_select') {
        const guildId = interaction.guild.id;

        switch (interaction.values[0]) {

          case 'togglenewk':
            let newk_enabled = await dbq.get(`newk_enabled_${interaction.guild.id}`);
            newk_enabled = !newk_enabled;
            await dbq.set(`newk_enabled_${interaction.guild.id}`, newk_enabled);
            interaction.reply(`تم ${newk_enabled ? 'تفعيل' : 'إلغاء'} زر "نيوك".`);
            break;

            case 'togglerefresh':
              let refresh_enabled = await dbq.get(`refresh_enabled_${interaction.guild.id}`);
              refresh_enabled = !refresh_enabled;
              await dbq.set(`refresh_enabled_${interaction.guild.id}`, refresh_enabled);
              interaction.reply(`تم ${refresh_enabled ? 'تفعيل' : 'إلغاء'} زر "الانعاش".`);
              break;

              case 'togglekickrandom':
                let kick_random = await dbq.get(`kick_random_${interaction.guild.id}`);
                kick_random = !kick_random;
                await dbq.set(`kick_random_${interaction.guild.id}`, kick_random);
                interaction.reply(`تم ${kick_random ? 'تفعيل' : 'إلغاء'} زر "الطرد العشوائي".`);
                break;

            case 'setplayers':
                await interaction.reply({ content: 'من فضلك، اذكر عدد الأشخاص الذين يمكنهم اللعب:', ephemeral: true });
                const filterPlayers = m => m.author.id === interaction.user.id;
                const collectedPlayers = await interaction.channel.awaitMessages({ filter: filterPlayers, max: 1, time: 30000 });

                if (collectedPlayers.size > 0) {
                    const playersCount = parseInt(collectedPlayers.first().content);
                    collectedPlayers.first().delete();
                    if (!isNaN(playersCount)) {
                        await dbq.set(`playersCount_${guildId}`, playersCount);
                        await interaction.followUp({ content: `تم تعيين عدد الأشخاص الذين يمكنهم اللعب إلى ${playersCount} بنجاح.`, ephemeral: true });
                    } else {
                        await interaction.followUp({ content: 'الرجاء إدخال رقم صحيح لعدد الأشخاص.', ephemeral: true });
                    }
                } else {
                    await interaction.followUp({ content: 'لم يتم توفير العدد المطلوب.', ephemeral: true });
                }
                break;

            case 'number':
                const currentState = await dbq.get(`numberSetting_${guildId}`) || false;
                const newState = !currentState;
                await dbq.set(`numberSetting_${guildId}`, newState);
                await interaction.reply({ content: `تم ${newState ? "تفعيل" : "إلغاء تفعيل"} العدد بنجاح.`, ephemeral: true });
                break;

                case 'ruolateimage':
                  await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
                  const filterImage5 = m => m.author.id === interaction.user.id;
                  const collectedImage5 = await interaction.channel.awaitMessages({ filter: filterImage5, max: 1, time: 30000 });
      
                  if (collectedImage5.size > 0) {
                    const messageAttachment = collectedImage5.first().attachments.first();
      
                    if (messageAttachment) {
                      const img = messageAttachment.url;
                      collectedImage5.first().delete();
      
                      const ext = path.extname(img);
                      const imageName = `ruolateimage_${interaction.guild.id}.png`;
                      const masar = path.join(__dirname, 'imager', imageName);
      
                      const fetch = await import('node-fetch');
      
                      const imageDownload = await fetch.default(img);
                      const imageBuffer = await imageDownload.arrayBuffer();
                      fs.writeFileSync(masar, Buffer.from(imageBuffer));
      
                      dbq.set(`ruolateimage_${interaction.guild.id}`, masar);
                      interaction.followUp('تم حفظ الصورة')
                    } else {
                      await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                    }
                  } else {
                    await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                  }
                  break;

                  case 'timerruoll':
                    await interaction.reply({ content: 'من فضلك، اذكر الوقت (مثال: 1h)', ephemeral: true });
    
                    const filter = m => m.author.id === interaction.user.id;
                    const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 });
    
                    if (collected.size > 0) {
                        const timeString = collected.first().content.trim();
                        collected.first().delete();
    
                        const durationInMillis = ms(timeString);
    
                        if (!durationInMillis) {
                            await interaction.followUp({ content: 'يرجى تحديد وقت صحيح، مثال: `1h`.', ephemeral: true });
                        } else {
                            // Convert milliseconds to hours, minutes, and seconds
                            const durationInHours = Math.floor(durationInMillis / (1000 * 60 * 60));
                            const durationInMinutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60));
                            const durationInSeconds = Math.floor((durationInMillis % (1000 * 60)) / 1000);
    
                            const guildId = interaction.guild.id;
                            await dbq.set(`timerroulette_${interaction.user.id}`, durationInMillis);
    
                            await interaction.followUp({ content: `تم تحديد الوقت بنجاح لمدة ${durationInHours} ساعة و ${durationInMinutes} دقيقة و ${durationInSeconds} ثانية.`, ephemeral: true });
                        }
                    } else {
                        await interaction.followUp({ content: 'لم يتم توفير وقت صحيح.', ephemeral: true });
                    }
                    break;

                  case 'setcolor':
                    await interaction.reply({ content: 'من فضلك، اذكر اللون الاول:', ephemeral: true });
                    const filterBackground = m => m.author.id === interaction.user.id;
                    const collectedBackground = await interaction.channel.awaitMessages({ filter: filterBackground, max: 1, time: 30000 });
    
                    if (collectedBackground.size > 0) {
                        const backgroundColor = collectedBackground.first().content;
                        collectedBackground.first().delete();
                        await interaction.followUp({ content: 'من فضلك، اذكر اللون الثاني:', ephemeral: true });
                        const filterText = m => m.author.id === interaction.user.id;
                        const collectedText = await interaction.channel.awaitMessages({ filter: filterText, max: 1, time: 30000 });
    
                        if (collectedText.size > 0) {
                            const textColor = collectedText.first().content;
                            collectedText.first().delete();
                            await dbq.set(`backgroundColor_${guildId}`, backgroundColor);
                            await dbq.set(`textColor_${guildId}`, textColor);
                            await interaction.followUp({ content: `تم تحديد لون  إلى ${backgroundColor} ولون إلى ${textColor}.`, ephemeral: true });
                        } else {
                            await interaction.followUp({ content: 'لم يتم توفير لون النص.', ephemeral: true });
                        }
                    } else {
                        await interaction.followUp({ content: 'لم يتم توفير لون الخلفية.', ephemeral: true });
                    }
                    break;

                    case 'back':
                      await interaction.update({
                          embeds: [new EmbedBuilder()
                            .setTitle('اختر فئة للتحكم بلعبة معينة.')
                            .setColor('#153244')
                            .setFooter({
                              text: 'Cain store',
                              iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
                            })],
                          components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                              .setCustomId('category_select')
                              .setPlaceholder('اختر فئة')
                              .addOptions([
                                  { label: 'التحكم بالاعدادات العامة', value: 'setting' },
                                  { label: 'التحكم بإعدادات الروليت', value: 'roulette' },
                                  { label: 'التحكم بإعدادات المافيا', value: 'mafia' },
                                  { label: 'التحكم بإعدادات برا السالفة', value: 'bra' },
                              ]))],
                          ephemeral: true
                      });
                      break;

        }
    } else if (interaction.customId === 'mafia_select') {
        const guildId = interaction.guild.id;

        switch (interaction.values[0]) {
          case 'setmafiamem':
            await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
            const filterImage5 = m => m.author.id === interaction.user.id;
            const collectedImage5 = await interaction.channel.awaitMessages({ filter: filterImage5, max: 1, time: 30000 });

            if (collectedImage5.size > 0) {
              const messageAttachment = collectedImage5.first().attachments.first();

              if (messageAttachment) {
                const img = messageAttachment.url;
                collectedImage5.first().delete();

                const ext = path.extname(img);
                const imageName = `setmafiamem_${interaction.guild.id}.png`;
                const masar = path.join(__dirname, 'imager', imageName);

                const fetch = await import('node-fetch');

                const imageDownload = await fetch.default(img);
                const imageBuffer = await imageDownload.arrayBuffer();
                fs.writeFileSync(masar, Buffer.from(imageBuffer));

                dbq.set(`setmafiamem_${interaction.guild.id}`, masar);
                interaction.followUp('تم حفظ الصورة')
              } else {
                await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
              }
            } else {
              await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
            }
            break;

            case 'timermafia':
              await interaction.reply({ content: 'من فضلك، اذكر الوقت (مثال: 1h)', ephemeral: true });

              const filter = m => m.author.id === interaction.user.id;
              const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 });

              if (collected.size > 0) {
                  const timeString = collected.first().content.trim();
                  collected.first().delete();

                  const durationInMillis = ms(timeString);

                  if (!durationInMillis) {
                      await interaction.followUp({ content: 'يرجى تحديد وقت صحيح، مثال: `1h`.', ephemeral: true });
                  } else {
                      // Convert milliseconds to hours, minutes, and seconds
                      const durationInHours = Math.floor(durationInMillis / (1000 * 60 * 60));
                      const durationInMinutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60));
                      const durationInSeconds = Math.floor((durationInMillis % (1000 * 60)) / 1000);
                      await dbq.set(`timeermafia_${interaction.user.id}`, durationInMillis);

                      await interaction.followUp({ content: `تم تحديد الوقت بنجاح لمدة ${durationInHours} ساعة و ${durationInMinutes} دقيقة و ${durationInSeconds} ثانية.`, ephemeral: true });
                  }
              } else {
                  await interaction.followUp({ content: 'لم يتم توفير وقت صحيح.', ephemeral: true });
              }
              break;

            case 'playersmafia':
              await interaction.reply({ content: 'من فضلك، اذكر عدد الأشخاص الذين يمكنهم اللعب:', ephemeral: true });
              const filterPlayers = m => m.author.id === interaction.user.id;
              const collectedPlayers = await interaction.channel.awaitMessages({ filter: filterPlayers, max: 1, time: 30000 });

              if (collectedPlayers.size > 0) {
                  const playersCount = parseInt(collectedPlayers.first().content);
                  collectedPlayers.first().delete();
                  if (!isNaN(playersCount)) {
                      await dbq.set(`playersmafia_${guildId}`, playersCount);
                      await interaction.followUp({ content: `تم تعيين عدد الأشخاص الذين يمكنهم اللعب إلى ${playersCount} بنجاح.`, ephemeral: true });
                  } else {
                      await interaction.followUp({ content: 'الرجاء إدخال رقم صحيح لعدد الأشخاص.', ephemeral: true });
                  }
              } else {
                  await interaction.followUp({ content: 'لم يتم توفير العدد المطلوب.', ephemeral: true });
              }
              break;

            case 'setimagemaf':
              await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
              const filterImage1 = m => m.author.id === interaction.user.id;
              const collectedImage1 = await interaction.channel.awaitMessages({ filter: filterImage1, max: 1, time: 30000 });
  
              if (collectedImage1.size > 0) {
                const messageAttachment = collectedImage1.first().attachments.first();
  
                if (messageAttachment) {
                  const img = messageAttachment.url;
                  collectedImage1.first().delete();
  
                  const ext = path.extname(img);
                  const imageName = `setimagemaf_${interaction.guild.id}.png`;
                  const masar = path.join(__dirname, 'imager', imageName);
  
                  const fetch = await import('node-fetch');
  
                  const imageDownload = await fetch.default(img);
                  const imageBuffer = await imageDownload.arrayBuffer();
                  fs.writeFileSync(masar, Buffer.from(imageBuffer));
  
                  dbq.set(`setimagemaf_${interaction.guild.id}`, masar);
                  interaction.followUp('تم حفظ الصورة')
                } else {
                  await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                }
              } else {
                await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
              }
              break;

            default:
                await interaction.reply({ content: 'اختيار غير صالح.', ephemeral: true });
                break;

                case 'back':
                  await interaction.update({
                    embeds: [new EmbedBuilder()
                      .setTitle('اختر فئة للتحكم بلعبة معينة.')
                      .setColor('#153244')
                      .setFooter({
                        text: 'Cain store',
                        iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
                      })],
                      components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                          .setCustomId('category_select')
                          .setPlaceholder('اختر فئة')
                          .addOptions([
                              { label: 'التحكم بالاعدادات العامة', value: 'setting' },
                              { label: 'التحكم بإعدادات الروليت', value: 'roulette' },
                              { label: 'التحكم بإعدادات المافيا', value: 'mafia' },
                              { label: 'التحكم بإعدادات برا السالفة', value: 'bra' },
                          ]))],
                      ephemeral: true
                  });
                  break;
        }
      } else if (interaction.customId === 'setting_select') {
        const guildId = interaction.guild.id;

        switch (interaction.values[0]) {
            case 'sichannel':
                await interaction.reply({ content: 'من فضلك، اذكر اي دي الشات او منشن:', ephemeral: true });
                const filterChannel = m => m.author.id === interaction.user.id;
                const collectedChannel = await interaction.channel.awaitMessages({ filter: filterChannel, max: 1, time: 30000 });

                if (collectedChannel.size > 0) {
                    const channel = collectedChannel.first().content;
                    collectedChannel.first().delete();
                    const channels = interaction.guild.channels.cache.get(channel);
                    await dbq.set(`commandChannel_${guildId}`, channels.id);
                    await interaction.followUp({ content: `تم تحديد شات اللعب كـ ${channels}.`, ephemeral: true });
                }
                break;

                case 'togglehere':
                  const roleEnabled = await dbq.get(`hereRoleEnabled_${guildId}`) || false;
      
                  if (roleEnabled) {
                      await dbq.set(`hereRoleEnabled_${guildId}`, false);
                      await interaction.reply({ content: 'تم إيقاف تشغيل الرول "here".', ephemeral: true });
                  } else {
                      await dbq.set(`hereRoleEnabled_${guildId}`, true);
                      await interaction.reply({ content: 'تم تشغيل الرول "here".', ephemeral: true });
                  }
                  break;

                case 'smchannel':
                  await interaction.reply({ content: 'من فضلك، اذكر اي دي الشات او منشن:', ephemeral: true });
                  const filterChannel2 = m => m.author.id === interaction.user.id;
                  const collectedChannel2 = await interaction.channel.awaitMessages({ filter: filterChannel2, max: 1, time: 30000 });
  
                  if (collectedChannel2.size > 0) {
                      const channel = collectedChannel2.first().content;
                      collectedChannel2.first().delete();
                      const channels = interaction.guild.channels.cache.get(channel);
                      await dbq.set(`smchannel_${guildId}`, channels.id);
                      
                      await interaction.followUp({ content: `تم تحديد شات اللعب كـ ${channels}.`, ephemeral: true });
                  }
                  break;

                  case 'smgamesmu':
                    await interaction.reply({ content: 'من فضلك، قم بذكر الرتبة المراد تعيينها كمسؤول (منشن الرتبة):', ephemeral: true });
                    const filterRole = m => m.author.id === interaction.user.id;
                    const collectedRole = await interaction.channel.awaitMessages({ filter: filterRole, max: 1, time: 30000 });
    
                    if (collectedRole.size > 0) {
                        const role = collectedRole.first().mentions.roles.first();
                        collectedRole.first().delete();
                        if (role) {
                            const mgames = [role.id];
                            await dbq.set(`managergames_${guildId}`, mgames);
                            await interaction.followUp({ content: `تم تعيين ${role} كمسؤول .`, ephemeral: true });
                        } else {
                            await interaction.followUp({ content: 'عذرًا، لم أتمكن من العثور على الرتبة.', ephemeral: true });
                        }
                    } else {
                        await interaction.followUp({ content: 'لم يتم توفير الرتبة المطلوبة.', ephemeral: true });
                    }
                    break;

                    case 'smrofr':
                      await interaction.reply({ content: 'من فضلك، قم بذكر الرتبة المراد تعيينها كمسؤول (منشن الرتبة):', ephemeral: true });
                      const filterRole3 = m => m.author.id === interaction.user.id;
                      const collectedRole3 = await interaction.channel.awaitMessages({ filter: filterRole3, max: 1, time: 30000 });
      
                      if (collectedRole3.size > 0) {
                          const role = collectedRole3.first().mentions.roles.first();
                          collectedRole3.first().delete();
                          if (role) {
                              const mgames = [role.id];
                              await dbq.set(`managergamesfr_${interaction.guild.id}`, mgames);
                              await interaction.followUp({ content: `تم تعيين ${role} كمسؤول .`, ephemeral: true });
                          } else {
                              await interaction.followUp({ content: 'عذرًا، لم أتمكن من العثور على الرتبة.', ephemeral: true });
                          }
                      } else {
                          await interaction.followUp({ content: 'لم يتم توفير الرتبة المطلوبة.', ephemeral: true });
                      }
                      break;

                      case 'sbwinner':
                        await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
                        const filterImage1 = m => m.author.id === interaction.user.id;
                        const collectedImage1 = await interaction.channel.awaitMessages({ filter: filterImage1, max: 1, time: 30000 });
            
                        if (collectedImage1.size > 0) {
                          const messageAttachment = collectedImage1.first().attachments.first();
            
                          if (messageAttachment) {
                            const img = messageAttachment.url;
                            collectedImage1.first().delete();
            
                            const ext = path.extname(img);
                            const imageName = `messageimage_${interaction.guild.id}.png`;
                            const masar = path.join(__dirname, 'imager', imageName);
            
                            const fetch = await import('node-fetch');
            
                            const imageDownload = await fetch.default(img);
                            const imageBuffer = await imageDownload.arrayBuffer();
                            fs.writeFileSync(masar, Buffer.from(imageBuffer));
            
                            dbq.set(`messageimage_${interaction.guild.id}`, masar);
                            interaction.followUp('تم حفظ الصورة')
                          } else {
                            await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                          }
                        } else {
                          await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                        }
                        break;

                        case 'sbgrouns':
                          await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
                          const filterImage4 = m => m.author.id === interaction.user.id;
                          const collectedImage4 = await interaction.channel.awaitMessages({ filter: filterImage4, max: 1, time: 30000 });
              
                          if (collectedImage4.size > 0) {
                            const messageAttachment = collectedImage4.first().attachments.first();
              
                            if (messageAttachment) {
                              const img = messageAttachment.url;
                              collectedImage4.first().delete();
              
                              const ext = path.extname(img);
                              const imageName = `sbgrouns_${interaction.guild.id}.png`;
                              const masar = path.join(__dirname, 'imager', imageName);
              
                              const fetch = await import('node-fetch');
              
                              const imageDownload = await fetch.default(img);
                              const imageBuffer = await imageDownload.arrayBuffer();
                              fs.writeFileSync(masar, Buffer.from(imageBuffer));
              
                              dbq.set(`sbgrouns_${interaction.guild.id}`, masar);
                              interaction.followUp('تم حفظ الصورة')
                            } else {
                              await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                            }
                          } else {
                            await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                          }
                          break;

                          case 'sbimagecf':
                            await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
                            const filterImage5 = m => m.author.id === interaction.user.id;
                            const collectedImage5 = await interaction.channel.awaitMessages({ filter: filterImage5, max: 1, time: 30000 });
                
                            if (collectedImage5.size > 0) {
                              const messageAttachment = collectedImage5.first().attachments.first();
                
                              if (messageAttachment) {
                                const img = messageAttachment.url;
                                collectedImage5.first().delete();
                
                                const ext = path.extname(img);
                                const imageName = `sbimagecf_${interaction.guild.id}.png`;
                                const masar = path.join(__dirname, 'imager', imageName);
                
                                const fetch = await import('node-fetch');
                
                                const imageDownload = await fetch.default(img);
                                const imageBuffer = await imageDownload.arrayBuffer();
                                fs.writeFileSync(masar, Buffer.from(imageBuffer));
                
                                dbq.set(`sbimagecf_${interaction.guild.id}`, masar);
                                interaction.followUp('تم حفظ الصورة')
                              } else {
                                await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                              }
                            } else {
                              await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                            }
                            break;
      
                  // حالات لعبة المافيا الأخرى
                  default:
                      await interaction.reply({ content: 'اختيار غير صالح.', ephemeral: true });
                      break;

                      case 'back':
                        await interaction.update({
                          embeds: [new EmbedBuilder()
                            .setTitle('اختر فئة للتحكم بلعبة معينة.')
                            .setColor('#153244')
                            .setFooter({
                              text: 'Cain store',
                              iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
                            })],
                            components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                                .setCustomId('category_select')
                                .setPlaceholder('اختر فئة')
                                .addOptions([
                                    { label: 'التحكم بالاعدادات العامة', value: 'setting' },
                                    { label: 'التحكم بإعدادات الروليت', value: 'roulette' },
                                    { label: 'التحكم بإعدادات المافيا', value: 'mafia' },
                                    { label: 'التحكم بإعدادات برا السالفة', value: 'bra' },
                                ]))],
                            ephemeral: true
                        });
                        break;
                
        } 
    } else if (interaction.customId === 'bra_select') {
      const guildId = interaction.guild.id;

      switch (interaction.values[0]) {
              case 'setimagebra':
                await interaction.reply({ content: 'من فضلك، اذكر رابط صورة  الفوز:', ephemeral: true });
                const filterImage5 = m => m.author.id === interaction.user.id;
                const collectedImage5 = await interaction.channel.awaitMessages({ filter: filterImage5, max: 1, time: 30000 });
    
                if (collectedImage5.size > 0) {
                  const messageAttachment = collectedImage5.first().attachments.first();
    
                  if (messageAttachment) {
                    const img = messageAttachment.url;
                    collectedImage5.first().delete();
    
                    const ext = path.extname(img);
                    const imageName = `setimagebra_${interaction.guild.id}.png`;
                    const masar = path.join(__dirname, 'imager', imageName);
    
                    const fetch = await import('node-fetch');
    
                    const imageDownload = await fetch.default(img);
                    const imageBuffer = await imageDownload.arrayBuffer();
                    fs.writeFileSync(masar, Buffer.from(imageBuffer));
    
                    dbq.set(`setimagebra_${interaction.guild.id}`, masar);
                    interaction.followUp('تم حفظ الصورة')
                  } else {
                    await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                  }
                } else {
                  await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                }
                break;

                case 'timerbta':
                  await interaction.reply({ content: 'من فضلك، اذكر الوقت (مثال: 1h)', ephemeral: true });
    
                  const filter = m => m.author.id === interaction.user.id;
                  const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 });
    
                  if (collected.size > 0) {
                      const timeString = collected.first().content.trim();
                      collected.first().delete();
    
                      const durationInMillis = ms(timeString);
    
                      if (!durationInMillis) {
                          await interaction.followUp({ content: 'يرجى تحديد وقت صحيح، مثال: `1h`.', ephemeral: true });
                      } else {
                          // Convert milliseconds to hours, minutes, and seconds
                          const durationInHours = Math.floor(durationInMillis / (1000 * 60 * 60));
                          const durationInMinutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60));
                          const durationInSeconds = Math.floor((durationInMillis % (1000 * 60)) / 1000);
                          await dbq.set(`timerbra_${interaction.user.id}`, durationInMillis);
    
                          await interaction.followUp({ content: `تم تحديد الوقت بنجاح لمدة ${durationInHours} ساعة و ${durationInMinutes} دقيقة و ${durationInSeconds} ثانية.`, ephemeral: true });
                      }
                  } else {
                      await interaction.followUp({ content: 'لم يتم توفير وقت صحيح.', ephemeral: true });
                  }
                  break;

                  case 'setvs':
                    await interaction.reply({ content: 'من فضلك، اذكر رابط الصورة :', ephemeral: true });
                    const filterImage6 = m => m.author.id === interaction.user.id;
                    const collectedImage6 = await interaction.channel.awaitMessages({ filter: filterImage6, max: 1, time: 30000 });
        
                    if (collectedImage6.size > 0) {
                      const messageAttachment = collectedImage6.first().attachments.first();
        
                      if (messageAttachment) {
                        const img = messageAttachment.url;
                        collectedImage6.first().delete();
        
                        const ext = path.extname(img);
                        const imageName = `qustingsdnr_${interaction.guild.id}.png`;
                        const masar = path.join(__dirname, 'imager', imageName);
        
                        const fetch = await import('node-fetch');
        
                        const imageDownload = await fetch.default(img);
                        const imageBuffer = await imageDownload.arrayBuffer();
                        fs.writeFileSync(masar, Buffer.from(imageBuffer));
        
                        dbq.set(`qustingsdnr_${interaction.guild.id}`, masar);
                        interaction.followUp('تم حفظ الصورة')
                      } else {
                        await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                      }
                    } else {
                      await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                    }
                    break;

                    case 'setquestion':
                      await interaction.reply({ content: 'من فضلك، اذكر رابط الصورة :', ephemeral: true });
                      const filterImage7 = m => m.author.id === interaction.user.id;
                      const collectedImage7 = await interaction.channel.awaitMessages({ filter: filterImage7, max: 1, time: 30000 });
          
                      if (collectedImage7.size > 0) {
                        const messageAttachment = collectedImage7.first().attachments.first();
          
                        if (messageAttachment) {
                          const img = messageAttachment.url;
                          collectedImage7.first().delete();
          
                          const ext = path.extname(img);
                          const imageName = `answersalfa_${interaction.guild.id}.png`;
                          const masar = path.join(__dirname, 'imager', imageName);
          
                          const fetch = await import('node-fetch');
          
                          const imageDownload = await fetch.default(img);
                          const imageBuffer = await imageDownload.arrayBuffer();
                          fs.writeFileSync(masar, Buffer.from(imageBuffer));
          
                          dbq.set(`answersalfa_${interaction.guild.id}`, masar);
                          interaction.followUp('تم حفظ الصورة')
                        } else {
                          await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                        }
                      } else {
                        await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                      }
                      break;

                      case 'setanswer':
                        await interaction.reply({ content: 'من فضلك، اذكر رابط الصورة :', ephemeral: true });
                        const filterImage8 = m => m.author.id === interaction.user.id;
                        const collectedImage8 = await interaction.channel.awaitMessages({ filter: filterImage8, max: 1, time: 30000 });
            
                        if (collectedImage8.size > 0) {
                          const messageAttachment = collectedImage8.first().attachments.first();
            
                          if (messageAttachment) {
                            const img = messageAttachment.url;
                            collectedImage8.first().delete();
            
                            const ext = path.extname(img);
                            const imageName = `jawabsalfa_${interaction.guild.id}.png`;
                            const masar = path.join(__dirname, 'imager', imageName);
            
                            const fetch = await import('node-fetch');
            
                            const imageDownload = await fetch.default(img);
                            const imageBuffer = await imageDownload.arrayBuffer();
                            fs.writeFileSync(masar, Buffer.from(imageBuffer));
            
                            dbq.set(`jawabsalfa_${interaction.guild.id}`, masar);
                            interaction.followUp('تم حفظ الصورة')
                          } else {
                            await interaction.followUp({ content: 'لم يتم توفير المرفقات المطلوبة.', ephemeral: true });
                          }
                        } else {
                          await interaction.followUp({ content: 'لم يتم توفير الصورة المطلوبة.', ephemeral: true });
                        }
                        break;

                case 'back':
                  await interaction.update({
                    embeds: [new EmbedBuilder()
                      .setTitle('اختر فئة للتحكم بلعبة معينة.')
                      .setColor('#153244')
                      .setFooter({
                        text: 'Cain store',
                        iconURL: 'https://b.top4top.io/p_3183y5znu1.png'
                      })],
                      components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                          .setCustomId('category_select')
                          .setPlaceholder('اختر فئة')
                          .addOptions([
                              { label: 'التحكم بالاعدادات العامة', value: 'setting' },
                              { label: 'التحكم بإعدادات الروليت', value: 'roulette' },
                              { label: 'التحكم بإعدادات المافيا', value: 'mafia' },
                              { label: 'التحكم بإعدادات برا السالفة', value: 'bra' },
                          ]))],
                      ephemeral: true
                  });
                  break;

                  case 'addbra':
                    await interaction.reply({ content: 'من فضلك، اذكر عدد الأشخاص الذين يمكنهم اللعب:', ephemeral: true });
                    const filterPlayers = m => m.author.id === interaction.user.id;
                    const collectedPlayers = await interaction.channel.awaitMessages({ filter: filterPlayers, max: 1, time: 30000 });
    
                    if (collectedPlayers.size > 0) {
                        const playersCount = parseInt(collectedPlayers.first().content);
                        collectedPlayers.first().delete();
                        if (!isNaN(playersCount)) {
                            await dbq.set(`playersCountbra_${guildId}`, playersCount);
                            await interaction.followUp({ content: `تم تعيين عدد الأشخاص الذين يمكنهم اللعب إلى ${playersCount} بنجاح.`, ephemeral: true });
                        } else {
                            await interaction.followUp({ content: 'الرجاء إدخال رقم صحيح لعدد الأشخاص.', ephemeral: true });
                        }
                    } else {
                        await interaction.followUp({ content: 'لم يتم توفير العدد المطلوب.', ephemeral: true });
                    }
                    break;

      }
  } 
});

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!ownerId.includes(message.author.id)) return
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === `<@${client.user.id}>leave`) {
      const guildId = args[0];
      const guild = client.guilds.cache.get(guildId);

      if (!guild) {
        return message.reply('لم يتم العثور على السيرفر المحدد!');
      }

      guild.leave();
      message.reply(`تم الخروج من السيرفر: ${guild.name}`);
    }
  });


  ////////////////////////////////////////////////////////////////////

  client.on("messageCreate", async message => {
    if (!message.guild || message.author.bot) return;
    let args = message.content.split(" ");
    if (args[0] === Prefix + "مافيا") {
      const commandChannel = await dbq.get(`smchannel_${message.guild.id}`);
      if (!commandChannel || message.channel.id !== commandChannel) return;
      const mgamess = await dbq.get(`managergames_${message.guild.id}`);
      if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      if (has_play.get(message.guild.id)) return message.reply({ content: `❌ هناك بالفعل لعبة فعالة في هذا السيرفر!` });
      const storedTime = await dbq.get(`timeermafia_${message.author.id}`) || 60000;
      let time = storedTime;
      let data = {
        author: message.author.id,
        players: [],
        start_in: Date.now() + time,
        type: "mafia"
      }

      const playerNumber = await dbq.get(`playersmafia_${message.guild.id}`) || 20;
      console.log(playerNumber)

      let attachment;
      const image = `./imager/setimagemaf_${message.guild.id}.png`;
      
      try {
        // تحقق من وجود الملف
        if (fs.existsSync(image)) {
          attachment = new AttachmentBuilder(image);
        } else {
          throw new Error('File not found');
        }
      } catch (error) {
        // إذا لم يكن الملف موجودًا، استخدم الملف البديل
        attachment = new AttachmentBuilder(`./photo/mafiaphoto.png`);
      }


      let content_time1 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>`
      let content_players1 = `(${data.players.length} / ${playerNumber})**`





      let row = new ActionRowBuilder()
        .addComponents(
          createButton("SECONDARY", `join_mafia`, `دخول`, '1243848352026591274'),
          createButton(`SECONDARY`, `left_mafia`, `خروج`, '1243848354535047230'),
          createButton(`SECONDARY`, `explain`, `الشرح`, '1254234763699687476')
        );
      let row_2 = new ActionRowBuilder()
        .addComponents(
          createButton("SECONDARY", `join_mafia`, `دخول`, '1243848352026591274', true),
          createButton(`SECONDARY`, `left_mafia`, `خروج`, '1243848354535047230', true),
          createButton(`SECONDARY`, `explain`, `الشرح`, '1254234763699687476', true)
        );



      let msg = await message.channel.send({ content: `${content_time1}\n${content_players1}`, files: [attachment], components: [row] }).catch(() => 0);
      if (!msg) return;
      has_play.set(message.guild.id, data);
      let start_c = msg.createMessageComponentCollector({ time: time });
      start_c.on("collect", async inter => {
        if (!has_play.get(message.guild.id)) return;
        if (inter.customId === "join_mafia") {
          if (data.players.find(u => u.id == inter.user.id)) return inter.reply({ content: `لقد سجلت بالفعل.`, ephemeral: true });
          if (data.players.length >= playerNumber) return inter.reply({ content: `عدد المشاركين مكتمل`, ephemeral: true });
          data.players.push({
            id: inter.user.id,
            username: inter.user.username,
            avatar: inter.user.displayAvatarURL({ dynamic: true, format: "png" }),
            type: "person",
            interaction: inter,
            vote_kill: 0,
            vote_kick: 0
          });
          has_play.set(message.guild.id, data);


          let content_time2 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>`
          let content_players2 = `(${data.players.length} / ${playerNumber})**`

          msg.edit({ content: `${content_time2}\n${content_players2}` }).catch(() => 0);
          inter.reply({ content: `✅ تم إضافتك للعبة بنجاح`, ephemeral: true });
        } else if (inter.customId == "left_mafia") {
          let index = data.players.findIndex(i => i.id == inter.user.id);
          if (index == -1) return inter.reply({ content: `❌ - انت غير مشارك بالفعل`, ephemeral: true });
          data.players.splice(index, 1);
          has_play.set(message.guild.id, data);

          let content_time3 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>`
          let content_players3 = `(${data.players.length} / ${playerNumber})**`


          msg.edit({ content: `${content_time3}\n${content_players3}` }).catch(() => 0);
          inter.reply({ content: `✅ تم إزالتك من اللعبة`, ephemeral: true });
        } else if (inter.customId == "explain") {
          inter.reply({
            content: `
        طريقة اللعب:
        1- شارك في اللعبة بالضغط على الزر أدناه
        2- سيتم توزيع اللاعبين على مافيا ، مواطنين وأيضا طبيب واحد بشكل عشوائي
        3- في كل جولة ، ستصوت المافيا لطرد شخص واحد من اللعبة. ثم سيصوت الطبيب لحماية شخص واحد من المافيا. وفي النهاية الجولة ، سيحاول جميع اللاعبين التصويت وطرد إحدى أعضاء المافيا
        4- إذا تم طرد جميع المافيا ، سيفوز المواطنين ، وإذا كانت المافيا تساوي عدد المواطنين ، فستفوز المافيا.`, ephemeral: true
          });
        }
      });
      start_c.on("end", async (end, reason) => {
        if (!has_play.get(message.guild.id)) return;

        let content_players4 = `**(${data.players.length}/20)**`


        msg.edit({ content: `${content_players4}`, components: [row_2] }).catch(() => 0);
        if (data.players.length < 5) {
          has_play.delete(message.guild.id);
          return message.channel.send({ content: `🚫 - تم إلغاء اللعبة لعدم وجود 5 لاعبين على الأقل` });
        }
        let c = 5;
        for (let i = 0; i < data.players.length; i += c) {
          let array = data.players.slice(i, i + c);
          if (i == 0) {
            let mafia_i = Math.floor(Math.random() * array.length);
            let mafia = array[mafia_i];
            array.splice(mafia_i, 1);
            let mafia_index = data.players.findIndex(m => m.id == mafia.id);
            if (mafia_index != -1) {
              data.players[mafia_index].type = "mafia";
            }
            let doctor_i = Math.floor(Math.random() * array.length);
            let doctor = array[doctor_i];
            let doctor_index = data.players.findIndex(m => m.id == doctor.id);
            data.players[doctor_index].type = "doctor";
          } else {
            if (array.length >= 5) {
              let mafia_i = Math.floor(Math.random() * array.length);
              let mafia = array[mafia_i];
              let mafia_index = data.players.findIndex(m => m.id == mafia.id);
              if (mafia_index != -1) {
                data.players[mafia_index].type = "mafia";
              }
            }
          }
        }
        has_play.set(message.guild.id, data);
        for (let player of data.players) {
          if (player.type == "person") {
            await player.interaction.followUp({ content: `👥 | تم اختيارك انت كـ **مواطن**. في كل جولة يجب عليك التحقق مع جميع اللاعبين لأكتشاف المافيا وطردهم من اللعبة`, ephemeral: true }).catch(() => 0);
          } else if (player.type == "doctor") {
            await player.interaction.followUp({ content: `🧑‍⚕️ | تم اختيارك انت كـ **الطبيب**. في كل جولة يمكنك حماية شخص واحد من هجوم المافيا`, ephemeral: true }).catch(() => 0);
          } else if (player.type == "mafia") {
            await player.interaction.followUp({ content: `🕵️ | تم اختيارك انت  كـ **مافيا**. يجب عليكم محاولة اغتيال جميع اللاعبين بدون اكتشافكم`, ephemeral: true }).catch(() => 0);
          }
        }

        let backgroundImage;
        const image = `./imager/setmafiamem_${message.guild.id}.png`
        try {
          backgroundImage = await loadImage(image);
        } catch (error) {
          backgroundImage = await loadImage(`./photo/layer.png`);
        }

        
        const canvas = createCanvas(720, 473);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(backgroundImage, 0, 0, 720, 473);

        // Load images for mafia, doctor, and citizens
        const mafiaImage = await loadImage('./photo/mafia.png');
        const doctorImage = await loadImage('./photo/doctor.png');
        const citizenImage = await loadImage('./photo/citizen.png');

        // Calculate the number of each role
        const numMafia = data.players.filter(p => p.type === "mafia").length;
        const numDoctors = data.players.filter(p => p.type === "doctor").length;
        const numCitizens = data.players.filter(p => p.type === "person").length;

        // Add text "Citizens" above on the right
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'right';
        ctx.fillText('المواطنين', canvas.width - 120, 75);

        // Draw citizens and doctors together
        const citizensStartX = canvas.width - 120; // Horizontal position for citizens
        const citizensStartY = 100; // Vertical position for citizens
        const doctorsStartX = citizensStartX - (numCitizens * 55) - 20; // Horizontal position for doctors
        const doctorsStartY = citizensStartY; // Vertical position for doctors

        // Draw citizens
        for (let i = 0; i < numCitizens; i++) {
          const x = citizensStartX - (i * 55);
          const y = citizensStartY;
          ctx.drawImage(citizenImage, x, y, 50, 50);
        }

        // Draw doctors
        for (let i = 0; i < numDoctors; i++) {
          const x = doctorsStartX - (i * 70);
          const y = doctorsStartY;
          ctx.drawImage(doctorImage, x, y, 65, 65);
        }

        // Draw text "Mafia" above on the left
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText('المافيا', 120, 75);

        // Draw mafia
        const mafiaStartX = 50; // Horizontal position for mafia
        const mafiaStartY = 100; // Vertical position for mafia
        for (let i = 0; i < numMafia; i++) {
          const x = mafiaStartX + (i * 80);
          const y = mafiaStartY;
          ctx.drawImage(mafiaImage, x, y, 75, 75);
        }

        // Create attachment and send
        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'Cain-Store.png' });
        message.channel.send({ files: [attachment] });
        await sleep(7000);
        await mafia(message);


      });

      async function mafia(message) {
        if (!message || !message.guild) return;
        let data = has_play.get(message.guild.id);
        if (!data) return;
        let mafia = data.players.filter(t => t.type == "mafia");
        let doctor = data.players.find(t => t.type == "doctor");
        let person = data.players.filter(t => t.type != "mafia");
        let person_buttons = createMultipleButtons(person.map((p) => ({ id: p.id, label: p.username, disabled: false, index: person.findIndex(u => u.id == p.id) })), "kill");
        for (let m of mafia) {
          await m.interaction.followUp({ content: `أمامك 20 ثانية للتصويت على مواطن ليتم قتله`, components: person_buttons, ephemeral: true }).catch(() => 0);
        }
        message.channel.send({ content: `🔪 | جاري انتظار المافيا لاختيار شخص لقتله...` });
        let kill_c = message.channel.createMessageComponentCollector({ filter: m => mafia.find(n => n.id == m.user.id) && m.customId.startsWith("kill"), time: 20000 });
        let collected = [];
        kill_c.on("collect", async inter => {
          if (!has_play.get(message.guild.id)) return;
          if (collected.find(i => i == inter.user.id)) return;
          collected.push(inter.user.id);
          await inter.update({ content: `تم التصويت بنجاح انتظر النتيجة`, components: [] }).catch(() => 0);
          let index = inter.customId.split("_")[2];
          person[index].vote_kill += 1;
          if (collected.length >= mafia.length) return kill_c.stop();
        });
        kill_c.on("end", async (end, reason) => {
          if (!has_play.get(message.guild.id)) return;
          person = person.sort((a, b) => b.vote_kill - a.vote_kill);
          for (let maf of mafia) {
            if (!collected.find(i => i == maf.id)) {
              let index = mafia.findIndex(m => m.id == maf.id);
              if (index != -1) {
                mafia.splice(index, 1);
                if (mafia.length >= 1) {
                  let index_1 = data.players.findIndex(m => m.id == maf.id);
                  if (index_1 != -1) {
                    data.players.splice(index_1, 1);
                    has_play.set(message.guild.id, data);
                  }
                  message.channel.send({ content: `🕐 | تم طرد <@${maf.id}> من المافيا لعدم تفاعله... ستبدأ الجولة التالية في غضون ثوانٍ قليلة` });
                  await sleep(7000);
                  restart(message);
                } else {
                  message.channel.send({ content: `🕐 | تم طرد <@${maf.id}> من المافيا لعدم تفاعله...` });
                  win(message, "person");
                }
                return;
              }
            }
          }
          let killed_person = person[0];
          message.channel.send({ content: `🔪 | اختارت المافيا الشخص الذي سيتم اغتياله` });
          await sleep(7000);
          let id = null;
          if (doctor) {
            message.channel.send({ content: `💊 | جاري انتظار الطبيب لاختيار شخص لحمايته...` });
            let all_buttons = createMultipleButtons(data.players.map((p) => ({ id: p.id, label: p.username, disabled: false, index: data.players.findIndex(u => u.id == p.id) })), "protect");
            await doctor.interaction.followUp({ content: `أمامك **20** ثانية لاختيار شخص لحمايته...`, components: all_buttons, ephemeral: true, fetchReply: true }).catch(() => 0);

            let doctor_collect = await message.channel.awaitMessageComponent({ filter: m => m.user.id == doctor.id && m.customId.startsWith("protect"), time: 20000 }).catch(() => 0);
            if (!doctor_collect || !doctor_collect.customId) {
              message.channel.send({ content: `💊 | لم يختر الطبيب أحد ليحميه من الإغتيال` });
            } else {
              message.channel.send({ content: `💊 | اختار الطبيب الشخص الذي سيحميه من اغتيال المافيا` });
            }
            id = doctor_collect ? doctor_collect.customId.split("_")[1] : null;
          }
          if (id == killed_person.id) {
            message.channel.send({ content: `🛡️ | فشلت عملية المافيا لقتل <@${killed_person.id}> لأنه تم حمايته من قبل الطبيب` });
          } else {
            let index_2 = data.players.findIndex(b => b.id == killed_person.id);
            if (index_2 != -1) {
              data.players.splice(index_2, 1);
              has_play.set(message.guild.id, data);
            }
            await message.channel.send({ content: `⚰️ | نجحت عملية المافيا وتم قتل <@${killed_person.id}> وهذا الشخص كان **${killed_person.type == "doctor" ? "طبيب" : "مواطن"}**` });
          }
          if (data.players.filter(b => b.type == "person").length <= data.players.filter(b => b.type == "mafia").length) return win(message, "mafia");
          message.channel.send({ content: `🔍 | لديكم **15 ثانية** للتحقق بين اللاعبين ومعرفة المافيا للتصويت على طرده من اللعبة` });

          let all = data.players.map(m => m);
          let all_buttons = createMultipleButtons(all.map((p) => ({ id: p.id, label: p.username, disabled: false, emoji: config.numbers[p.vote_kick], index: data.players.findIndex(u => u.id == p.id) })), "kick");
          let msg = await message.channel.send({ content: `لديكم **20 ثانية** لاختيار شخص لطرده من اللعبة`, components: all_buttons });
          let kick_c = msg.createMessageComponentCollector({
            filter: n => {
              let player = data.players.find(m => m.id == n.user.id);
              if (!player) return false; // تأكد أن المستجيب هو لاعب في اللعبة
              // تحقق مما إذا كان اللاعب من الفئة المطلوبة ومن ثم إرجاع القيمة المناسبة
              if (player.type === "mafia" || player.type === "person" || player.type === "doctor") {
                return n.customId.startsWith("kick");
              }
              return false;
            },
            time: 20000
          });
          let collected_1 = [];
          kick_c.on("collect", async inter => {
            if (!has_play.get(message.guild.id)) return;
            if (collected_1.find(i => i == inter.user.id)) return;
            collected_1.push(inter.user.id);
            let user_id = inter.customId.split("_")[1];
            let index = all.findIndex(i => i.id == user_id);
            if (index != -1) {
              all[index].vote_kick += 1;
              let all_buttons_2 = createMultipleButtons(all.map((p) => ({ id: p.id, label: p.username, disabled: false, emoji: config.numbers[p.vote_kick], index: data.players.findIndex(u => u.id == p.id) })), "kick");
              msg.edit({ components: all_buttons_2 }).catch(() => 0);
            }
            inter.deferUpdate().catch(() => 0);
            if (collected_1.length >= all.length) return kick_c.stop();
          });
          kick_c.on("end", async (end, reason) => {
            if (!has_play.get(message.guild.id)) return;
            let all_buttons_2 = createMultipleButtons(all.map((p) => ({ id: p.id, label: p.username, disabled: true, emoji: config.numbers[p.vote_kick], index: data.players.findIndex(u => u.id == p.id) })), "kick");
            msg.edit({ components: all_buttons_2 }).catch(() => 0);
            let choices = all.sort((a, b) => b.vote_kick - a.vote_kick);
            if (choices[0].vote_kick == choices[1].vote_kick) {
              message.channel.send({ content: `⏭ | بسبب تعادل التصويت ، تم تخطي الطرد ... الجولة القادمة ستبدأ في بضع ثوان` });
              await sleep(7000);
              await restart(message);
            } else {
              let kicked = choices[0];
              let index = data.players.findIndex(i => i.id == kicked.id);
              if (index != -1) {
                data.players.splice(index, 1);
                has_play.set(message.guild.id, data);
              }
              message.channel.send({ content: `💣 | تم التصويت على طرد <@${kicked.id}> وكان هذا الشخص **${kicked.type == "mafia" ? "مافيا" : kicked.type == "doctor" ? "طبيب" : "مواطن"}**` });
              if (data.players.filter(b => b.type == "person").length <= data.players.filter(b => b.type == "mafia").length) return win(message, "mafia");
              if (data.players.filter(b => b.type == "mafia").length <= 0) return win(message, "person");
              message.channel.send({ content: `ستبدأ الجولة التالية بعد بضع ثوان...` });
              await sleep(7000);
              restart(message);
            }
          });
        });
      }

      function restart(message) {
        // تحديد البيانات الخاصة باللعبة
        let data = has_play.get(message.guild.id);

        // التأكد من وجود البيانات
        if (!data) return;

        // تصفير التصويت لكل لاعب
        for (let player of data.players) {
          player.vote_kill = 0;
          player.vote_kick = 0; // تصفير عدد التصويت لكل لاعب
        }

        // إعادة تشغيل اللعبة
        mafia(message);
      }


      async function win(message, who) {
        let data = has_play.get(message.guild.id);
        if (!data) return;
        if (who === "person") {
          message.channel.send({ content: `👑 | فاز الفريق الأول (المواطنين) في اللعبة.\n${data.players.filter(m => m.type != "mafia").map(b => `<@${b.id}>`).join(", ")}` });
        } else if (who === "mafia") {
          message.channel.send({ content: `👑 | فاز الفريق الثاني (المافيا) في اللعبة.\n${data.players.filter(m => m.type == "mafia").map(b => `<@${b.id}>`).join(", ")}` });
        }
        has_play.delete(message.guild.id);
      }

      function createMultipleButtons(array, type) {
        let components = [];
        let c = 5;
        for (let i = 0; i < array.length; i += c) {
          let buttons = array.slice(i, i + c);
          let component = new ActionRowBuilder()
          for (let button of buttons) {
            let btn = new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setLabel(button.label)
              .setCustomId(`${type}_${button.id}_${button.index}`)
              .setDisabled(button.disabled ? button.disabled : false);
            if (button.emoji) {
              btn.setEmoji(button.emoji);
            }
            component.addComponents(btn);
          }
          components.push(component);
        }
        return components;
      }

      function createButton(style, customId, label, emoji, disabled) {
        let styles = {
          PRIMARY: ButtonStyle.Primary,
          SECONDARY: ButtonStyle.Secondary,
          SUCCESS: ButtonStyle.Success,
          DANGER: ButtonStyle.Danger
        }
        let btn = new ButtonBuilder()
          .setStyle(styles[style])
          .setCustomId(customId)
          .setLabel(label)
          .setDisabled(disabled ? disabled : false);
        if (emoji) btn.setEmoji(emoji);
        return btn;
      }

      function sleep(time) {
        return new Promise((resolve) => setTimeout(() => resolve(time), time));
      }

    } else if (args[0] === Prefix + "روليت") {
       const commandChannel = await dbq.get(`smchannel_${message.guild.id}`);
       if (!commandChannel || message.channel.id !== commandChannel) return;
       const mgamess = await dbq.get(`managergames_${message.guild.id}`);
       if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      if (has_play.get(message.guild.id)) return message.reply({ content: `❌ هناك بالفعل لعبة فعالة في هذا السيرفر!` });
      const storedTime = await dbq.get(`timerroulette_${message.author.id}`) || 1000;
      let time = storedTime;
      let data = {
        author: message.author.id,
        players: [],
        removedPlayers: [], // قائمة اللاعبين الذين تم طردهم
        start_in: Date.now() + time,
        type: "roulette"
      };
      const playerNumber = await dbq.get(`playersCount_${message.guild.id}`) || 20;

      let attachment;
      const image = `./imager/ruolateimage_${message.guild.id}.png`;
      
      try {
        // تحقق من وجود الملف
        if (fs.existsSync(image)) {
          attachment = new AttachmentBuilder(image);
        } else {
          throw new Error('File not found');
        }
      } catch (error) {
        // إذا لم يكن الملف موجودًا، استخدم الملف البديل
        attachment = new AttachmentBuilder(`./photo/rullate.png`);
      }

      let backgroundColorDB = await dbq.get(`backgroundColor_${message.guild.id}`);
      let textColorDB = await dbq.get(`textColor_${message.guild.id}`);
      const roulettecolors = [backgroundColorDB, textColorDB];

      let counter = 0; // عداد عدد الأشخاص الذين دخلوا اللعبة
      let content_time1 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>**`
      let content_players1 = `**(${counter} / ${playerNumber})**`;

      const roluToN = await dbq.get(`numberSetting_${message.guild.id}`);

      async function createButtonsWithNumbers(data) {
        let buttons = [];
        for (let i = 1; i <= playerNumber; i++) {
          const isNumberTaken = data.players.some(player => player.number == i);
          if (!isNumberTaken) {
            buttons.push(
              createButton("SECONDARY", `number_${i}`, `${i}`)
            );
          }
        }
      
        buttons.push(
          createButton("SECONDARY", "left_roulette", `خروج`, '1243848354535047230')
        );
      
        buttons.push(
          createButton('SECONDARY', `explain`, `الشرح`, '1254234763699687476')
        );
      
        return buttons;
      }


// Use createButtonsWithNumbers within the message sending block
let numberButtons = await createButtonsWithNumbers(data);

let rows = [];
for (let i = 0; i < numberButtons.length; i += 5) {
  rows.push(new ActionRowBuilder().addComponents(numberButtons.slice(i, i + 5)));
}

let row;
if (roluToN) {
  row = rows;
} else {
  row = [
    new ActionRowBuilder().addComponents(
      createButton("SECONDARY", `join_roulette`, `دخول`, '1243848352026591274'),
      createButton(`SECONDARY`, `left_roulette`, `خروج`, '1243848354535047230'),
      createButton('SECONDARY', `explain`, `الشرح`, '1254234763699687476')
    )
  ];
}
let msg = await message.channel.send({ content: `${content_time1}\n${content_players1}`, files: [attachment], components: row }).catch(() => 0);
if (!msg) return;
has_play.set(message.guild.id, data);
let start_c = msg.createMessageComponentCollector({ time: time });

      async function updateCounter() {
        let data = has_play.get(message.guild.id);
        if (!data) return;
        let counter = data.players.length;
        let content_players2 = `**(${counter} / ${playerNumber})**`;
        msg.edit({ content: `${content_time1}\n${content_players2}`, components: row });
      }




      start_c.on("collect", async inter => {
        if (!has_play.get(message.guild.id)) return;
        let data = has_play.get(message.guild.id);
    
        if (inter.customId.startsWith("number_")) {
            let number = inter.customId.split("_")[1];
            if (data.players.find(u => u.id == inter.user.id)) return inter.reply({ content: `لقد سجلت بالفعل.`, ephemeral: true });
            if (data.players.length >= playerNumber) return inter.reply({ content: `عدد المشاركين مكتمل`, ephemeral: true });
            const avatarUrl = await inter.user.displayAvatarURL({ extension: "png", format: 'png', size: 512, forceStatic: true });
            data.players.push({
                number: number,
                id: inter.user.id,
                username: inter.user.username,
                avatar: avatarUrl
            });
    
            has_play.set(message.guild.id, data);
    
            let user = await client.users.fetch(inter.user.id);
            let buttonIndex = parseInt(number) - 1;
            numberButtons[buttonIndex].setLabel(user.displayName);
            numberButtons[buttonIndex].setDisabled(true);
    
            await updateCounter();
            inter.reply({ content: `✅ تم إضافتك للعبة بنجاح`, ephemeral: true });
    
        } else if (inter.customId === "join_roulette") {
          if (data.players.find(u => u.id == inter.user.id)) return inter.reply({ content: `لقد سجلت بالفعل.`, ephemeral: true });
          if (data.players.length >= playerNumber) return inter.reply({ content: `عدد المشاركين مكتمل`, ephemeral: true });
      
          const avatarURL = await inter.user.displayAvatarURL({ extension: "png", format: 'png', size: 512, forceStatic: true });
      
          let availableNumber = 1;
          while (data.players.some(player => player.number == availableNumber)) {
            availableNumber++;
          }
      
          data.players.push({
            number: availableNumber,
            id: inter.user.id,
            username: inter.user.username,
            avatar: avatarURL
          });
      
          has_play.set(message.guild.id, data);
      
          await updateCounter(); // تحديث العداد بعد انضمام شخص جديد
      
          inter.reply({ content: `✅ تم إضافتك للعبة بنجاح`, ephemeral: true });
        } else if (inter.customId === "left_roulette") {
          if (data.players.find(u => u.id == inter.user.id)) {
            let index = data.players.findIndex(i => i.id == inter.user.id);
            if (index == -1) return inter.reply({ content: `❌ - انت غير مشارك بالفعل`, ephemeral: true });
      
            let removedPlayer = data.players.splice(index, 1)[0];
            data.removedPlayers.push(removedPlayer);
            has_play.set(message.guild.id, data);
            let buttonIndex = parseInt(removedPlayer.number) - 1;
            if (removedPlayer) {
              numberButtons[buttonIndex].setLabel(removedPlayer.number);
              numberButtons[buttonIndex].setDisabled(false);
      
              await updateCounter();
      
              inter.reply({ content: `✅ تم إزالتك من اللعبة`, ephemeral: true });
            } else {
              data.players.splice(index, 1);
              has_play.set(message.guild.id, data);
      
              await updateCounter(); // تحديث العداد بعد خروج شخص
      
              inter.reply({ content: `✅ تم إزالتك من اللعبة`, ephemeral: true });
            }
          }
        } else if (inter.customId == "join_roulette") {
          if (data.players.find(u => u.id == inter.user.id)) return inter.reply({ content: `لقد سجلت بالفعل.`, ephemeral: true });
          if (data.players.length >= 20) return inter.reply({ content: `عدد المشاركين مكتمل`, ephemeral: true });

          const shit = await inter.user.displayAvatarURL({ extension: "png", format: 'png', size: 512, forceStatic: true });
          data.players.push({
            number: data.players.length + 1,
            id: inter.user.id,
            username: inter.user.username,
            avatar: shit
          });

          has_play.set(message.guild.id, data);

          await updateCounter(); // تحديث العداد بعد انضمام شخص جديد

          inter.reply({ content: `✅ تم إضافتك للعبة بنجاح`, ephemeral: true });
        } else if (inter.customId == "explain") {
          inter.reply({
            content: `
          طريقة اللعب:
          1- ستبدأ الجولة الأولى وسيتم تدوير العجلة واختيار لاعب عشوائي
          2- إذا كنت اللاعب المختار ، فستختار لاعبًا من اختيارك ليتم طرده من اللعبة
          3- يُطرد اللاعب وتبدأ جولة جديدة ، عندما يُطرد جميع اللاعبين ويتبقى لاعبان فقط ، ستدور العجلة ويكون اللاعب المختار هو الفائز باللعبة`, ephemeral: true
          });
        }
      });



      start_c.on("end", async (end, reason) => {
        if (!has_play.get(message.guild.id)) return;

        let content_players4 = `**(${data.players.length} / ${playerNumber})**`;
        await msg.edit({ content: `${content_players4}`, components: [] }).catch(() => 0);

        if (data.players.length < 3) {
          msg.edit({ content: `${content_players4}`, components: [] })
          has_play.delete(message.guild.id);
          return message.channel.send({ content: 'يجب ان تحتوي اللعبه على **3** اشخاص على الاقل لبدء اللعبة .' });
        }


        // متابعة اللعبة إلى الجولة التالية
        let clr_num = 0;
        let plys = [];
        let i = 0;
        for (let player of data.players) {
          i += 1;
          clr_num = clr_num >= roulettecolors.length ? 1 : clr_num += 1;
          plys.push({ ...player, position: i - 1, color: roulettecolors[clr_num - 1] });
        }
        data.players = plys;
        has_play.set(message.guild.id, data);
        message.channel.send({ content: `⏳ تم الانتهاء من تسجيل الارقام ستبدأ الجولة خلال ثواني .` });
        roulette(message);
      });



      async function rouletteGif(array, servericon) {
        const image = await createRouletteGifImage(array, servericon);
        return image;
      }
      async function rouletteImage(array) {
        const image = await createRouletteImage(array);
        return image;
      }

      function drawCircularImage(ctx, image, x, y, size, clip = false) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, x, y, size, size);
        ctx.restore();
      }

      async function roulette(message) {
        if (!message || !message.guild) return;
        let data = has_play.get(message.guild.id);
        if (!data) return;
        let backgroundColorDB = await dbq.get(`backgroundColor_${message.guild.id}`);
        let textColorDB = await dbq.get(`textColor_${message.guild.id}`);
        let winner_index = Math.floor(Math.random() * data.players.length);
        let winner = data.players[winner_index];
        data.players.splice(winner_index, 1);
        data.players = shuffleArray(data.players);
        data.players.push(winner);
        has_play.set(message.guild.id, data);
        const players = data.players.map(p => {
          if (p.position % 2 == 0) {
            return { number: p.position, username: p.username, avatarURL: p.avatar, color: backgroundColorDB }
          } else {
            return { number: p.position, username: p.username, avatarURL: p.avatar, color: textColorDB }
          }
        });

        let backgroundImage;
        const image = `./imager/messageimage_${message.guild.id}.png`
        try {
          backgroundImage = await loadImage(image);
        } catch (error) {
          backgroundImage = await loadImage(`./photo/win.png`);
        }

        const avatar = await loadImage(winner.avatar);
        const avatarSize = 720;

        const canvas = createCanvas(2560, 1080);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(backgroundImage, 0, 0, 2560, 1080);

        drawCircularImage(ctx, avatar, 962, 68, avatarSize, true);

        ctx.font = '90px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const textName = `${winner.username}`;
        const textX = 275 + avatarSize + 280;
        const textY = 985;

        ctx.fillText(textName, textX, textY + -100);

        const gif = await rouletteGif(players, message.guild.iconURL({ format: 'png', size: 512 }));

        const gifAttachment = new AttachmentBuilder(gif, { name: `${message.guild.id}.gif` });
        let msg = await message.channel.send({ files: [gifAttachment] });

        const sixSecondsLater = await sleep(2000);

        setTimeout(async () => {
          let image = await rouletteImage(players);

          const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: `roulette.png` });

          if (data.players.length <= 2) {
            const play = `${winner.id}`
            let userPoints = await dbq.get(`points_${message.guild.id}.${play}`);

            if (userPoints === null || userPoints === undefined) {
              userPoints = 0;
            }
            
            userPoints += 1;
            await dbq.set(`points_${message.guild.id}.${play}`, userPoints);

            let row_2 = new ActionRowBuilder()
              .addComponents(
                createButton("SECONDARY", "total_points", `🧩 ${userPoints}`, null, true)
              );
            await msg.edit({ content: `🏆 | الجولة القادمة هي الاخيرة من تختاره العجلة يفوز باللعبة .`, files: [{ name: "roulette.png", attachment: image }] });
            await sleep(2000);
            const roleEnabled = await dbq.get(`hereRoleEnabled_${message.guild.id}`) || false;

            if (roleEnabled) {
              message.channel.send({ files: [attachment], components: [row_2], content: `🏆 | <@${winner.id}> | @here` });
          } else {
              message.channel.send({ files: [attachment], components: [row_2], content: `🏆 | <@${winner.id}>` });
          }
            has_play.delete(message.guild.id);
          } else {
            await msg.edit({ content: `**${winner.number} - <@${winner.id}>**`, files: [{ name: "roulette.png", attachment: image }] });
            let buttons_array = await Promise.all(data.players.filter(a => a.id != winner.id).map(async (p) => {
              const playersCount = await dbq.get(`playersCount_${message.guild.id}`) || 20; // الحصول على عدد اللاعبين أو القيمة الافتراضية
               const usedNumbers = new Set(); // مجموعة لتتبع الأرقام المستخدمة
              let playerNumbers = Math.floor(Math.random() * playersCount) + 1; // توليد رقم بين 1 و playersCount

              // التأكد من أن الرقم فريد
              while (usedNumbers.has(playerNumbers)) {
                playerNumbers = Math.floor(Math.random() * playersCount) + 1; // توليد رقم جديد إذا كان الرقم مستخدمًا بالفعل
              }
            
              usedNumbers.add(playerNumbers); // إضافة الرقم إلى المجموعة
              let player = await client.users.fetch(p.id); // جلب معلومات المستخدم لكل لاعب
              return {
                id: p.id,
                label: `${p.number !== undefined ? p.number : playerNumbers} - ${player.displayName}`, // استخدام الرقم الذي اختاره اللاعب أو position + 1 إذا كان undefined
                disabled: false,
                emoji: null // يمكنك تعيين رمز تعبيري إذا أردت
              }
            }));

            let kick_random = await dbq.get(`kick_random_${message.guild.id}`);
            if (kick_random === null) kick_random = true; // الحالة الافتراضية إذا لم يتم تعيينها
        
            if (kick_random) {
            buttons_array.push({
                id: "kick_random",
                label: "طرد عشوائي",
                style: ButtonStyle.Primary,
                disabled: false
            });
          }
        
            buttons_array.push({
                id: winner.id,
                label: "انسحاب",
                style: ButtonStyle.Danger,
                disabled: false
            });

          let refresh_enabled = await dbq.get(`refresh_enabled_${message.guild.id}`);
          if (refresh_enabled === null) refresh_enabled = true;

          if (refresh_enabled) {
              let refresherPoints = await dbq.get(`points_${message.guild.id}.${winner.id}`);
              if (refresherPoints !== null && refresherPoints >= 3 && data.removedPlayers.length > 0) {
                  buttons_array.push({
                      id: "refresh_",
                      label: "🩹 [3] انعاش",
                      style: "PRIMARY",
                      disabled: false
                  });
              }
          }

            let newk_enabled = await dbq.get(`newk_enabled_${message.guild.id}`);
            if (newk_enabled === null) newk_enabled = true; // الحالة الافتراضية إذا لم يتم تعيينها

            if (newk_enabled) {
              let refresherPoints = await dbq.get(`points_${message.guild.id}.${winner.id}`);
              if (refresherPoints !== null && refresherPoints >= 3 && data.removedPlayers.length > 0) {
            buttons_array.push({
              id: "newk_",
              label: "[6] نيوك",
              style: ButtonStyle.Success,
              disabled: false
          });
        }
      }
        
            const existingMessage = await message.channel.send({
                content: `<@${winner.id}> لديك **10 ثواني** لإختيار لاعب لطرده`,
                components: await createMultipleButtons(buttons_array, winner, message.guild.id)
            });
        
            let collect = await existingMessage.awaitMessageComponent({
                filter: m => m.user.id == winner.id,
                time: 17000
            }).catch(() => 0);
        
            if (!has_play.get(message.guild.id)) return;
        
            buttons_array = buttons_array.map(e => ({ ...e, disabled: true }));
            await msg.edit({ components: createMultipleButtons(winner) }).catch(() => 0);
        
            let choice;
            if (!collect || !collect.customId) {
                choice = winner.id;
                await existingMessage.delete();
                message.channel.send({ content: `💣 | تم طرد <@${winner.id}> من اللعبة لعدم تفاعله ، سيتم بدء الجولة القادمة في بضع ثواني...` });
                data.removedPlayers = [...data.removedPlayers, { id: choice, username: winner.username, position: winner.position }];
            } else if (collect.customId == winner.id) {
                collect.deferUpdate();
                choice = winner.id;
                await existingMessage.delete();
                message.channel.send({ content: `💣 | لقد انسحب <@${winner.id}> من اللعبة ، سيتم بدء الجولة القادمة في بضع ثواني...` });
                data.removedPlayers = [...data.removedPlayers, { id: choice, username: winner.username, position: winner.position }];
            }  else if (collect.customId == "kick_random") {
              collect.deferUpdate();
              let randomIndex = Math.floor(Math.random() * (data.players.length - 1));
              let kickedPlayer = data.players.splice(randomIndex, 1)[0];
              await existingMessage.delete();
              message.channel.send(`🪄 | جاري طرد شخص ما بشكل عشوائي...`);
              data.removedPlayers = [...data.removedPlayers, { id: kickedPlayer.id, username: kickedPlayer.username, position: kickedPlayer.position }];
              await sleep(5000);
              message.channel.send(`💣 | تم طرده بشكل عشوائي <@${kickedPlayer.id}> من اللعبة ، سيتم بدء الجولة القادمة في بضع ثواني...`);
              roulette(message);
            } else if (collect.customId == "refresh_") {
              await collect.deferUpdate({ ephemeral: true });
  
              const p = has_play.get(message.guild.id);
              if (!p || p.removedPlayers.length < 1) {
                return await message.channel.send({ content: `لا يوجد لاعبين لإعادتهم`, ephemeral: true });
              }
  
              const removedPlayer = p.removedPlayers;
              const user = await message.client.users.fetch(removedPlayer[0].id);
              console.log(config.numbers[removedPlayer[0].position])
              const options = [
                {
                  label: `${user.displayName}`, // Include the position number with the username
                  value: removedPlayer[0].id, // Use the player ID for the value
                  emoji: user.number
                },
              ];
  
  
              const selectMenu = new Discord.StringSelectMenuBuilder()
                .setCustomId('select_playerrefresh')
                .setPlaceholder('اختر لاعبًا لإعادته')
                .addOptions(options);
  
              const row = new Discord.ActionRowBuilder().addComponents(selectMenu);
  
              const selectMsg = await message.channel.send({
                content: 'اختر لاعبًا لإعادته',
                components: [row],
                ephemeral: true
              });
  
              const selectCollect = await selectMsg.awaitMessageComponent({
                filter: i => i.customId === 'select_playerrefresh' && i.user.id === winner.id,
                time: 15000
              }).catch(() => 0);
  
              if (selectCollect) {
                await selectCollect.deferUpdate();
  
                const selectedPlayerId = selectCollect.values[0];
                const removedIndex = p.removedPlayers.findIndex(player => player.id === selectedPlayerId);
  
                if (removedIndex > -1) {
                  const [removedPlayer] = p.removedPlayers.splice(removedIndex, 1);
                  data.players.push({ id: removedPlayer.id, username: removedPlayer.username, position: removedPlayer.position });
                 // خصم 3 نقاط من اللاعب الذي قام بالإنعاش
                 let refresherPoints = await dbq.get(`points_${message.guild.id}.${winner.id}`);
                 if (refresherPoints === null || refresherPoints === undefined) {
                 refresherPoints = 0;
                 }
  
                 refresherPoints -= 3; // خصم 3 نقاط
        if (refresherPoints < 0) refresherPoints = 0; // التأكد من عدم أن تكون النقاط سالبة
        await dbq.set(`points_${message.guild.id}.${winner.id}`, refresherPoints);
                 }
                 has_play.set(message.guild.id, data);
                 await existingMessage.delete();
                 
                 await selectCollect.editReply({ content: `تم اختيار شخص لأنعاشه.`, components: [] });
                 await message.channel.send({ content: `<@${selectedPlayerId}> , تم انعاشه سيتم بدء الجولة القادمة خلال ثواني 🩹.`, components: [] });
await sleep(100);
                 roulette(message);             
                 }
  
            } else if (collect.customId == "newk_") {
              let userPoints = await dbq.get(`points_${message.guild.id}.${winner.id}`);
              if (userPoints >= 6) {
                await dbq.set(`points_${message.guild.id}.${winner.id}`, userPoints - 6);
                await existingMessage.delete();
                await message.channel.send({ content: `🛡️ | تم استخدام ميزه النيوك وتم طرد جميع اللاعبين`, ephemeral: true });
                await sleep(2000);

                const row_2 = new ActionRowBuilder()
                .addComponents(
                  createButton("SECONDARY", "total_points", `🧩 ${userPoints}`, null, true)
                );


                let backgroundImage;
                const image = `./imager/messageimage_${message.guild.id}.png`
                try {
                  backgroundImage = await loadImage(image);
                } catch (error) {
                  backgroundImage = await loadImage(`./photo/win.png`);
                }
        
                const avatar = await loadImage(winner.avatar);
                const avatarSize = 720;
        
                const canvas = createCanvas(2560, 1080);
                const ctx = canvas.getContext('2d');
        
                ctx.drawImage(backgroundImage, 0, 0, 2560, 1080);
        
                drawCircularImage(ctx, avatar, 962, 68, avatarSize, true);
        
                ctx.font = '90px Arial';
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
        
                const textName = `${winner.username}`;
                const textX = 275 + avatarSize + 280;
                const textY = 985;
        
                ctx.fillText(textName, textX, textY + -100);
                const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: `Cain-Store.png` });

                const roleEnabled = await dbq.get(`hereRoleEnabled_${message.guild.id}`) || false;

                if (roleEnabled) {
                  message.channel.send({ files: [attachment], components: [row_2], content: `🏆 | <@${winner.id}> | @here` });
              } else {
                  message.channel.send({ files: [attachment], components: [row_2], content: `🏆 | <@${winner.id}>` });
              }

              } else {
                await message.channel.send({ content: `❌ | ${winner.username} ليس لديه نقاط كافية لتنفيذ الهجمة المرتدة!`, ephemeral: true });
              }
  
              has_play.delete(message.guild.id); // End the game
            }
            else {
              collect.deferUpdate();
              choice = collect.customId;
              let kickedPlayer = data.players.find(p => p.id == choice);
              data.removedPlayers = [...data.removedPlayers, { id: kickedPlayer.id, username: kickedPlayer.username, position: kickedPlayer.position }];
              has_play.set(message.guild.id, data);
              await existingMessage.delete();
              message.channel.send({ content: `💣 | تم طرد <@${choice}> من اللعبة ، سيتم بدء الجولة القادمة في بضع ثواني...` });
            }
  
            if (!choice) return;
  
            let index = data.players.findIndex(p => p.id == choice);
            if (index == -1) return;
  
            data.players.splice(index, 1);
            has_play.set(message.guild.id, data);
            await sleep(1000);
            roulette(message);
  
          }
        }, sixSecondsLater);
      }


      async function createMultipleButtons(array, winner, guildId) {
        let components = [];
        let c = 5;
        for (let i = 0; i < array.length; i += c) {
          let buttons = array.slice(i, i + c);
          let component = new ActionRowBuilder()
          for (let button of buttons) {
            let btn = new ButtonBuilder()
              .setStyle(winner.id != button.id ? ButtonStyle.Secondary : ButtonStyle.Danger)
              .setLabel(button.label)
              .setCustomId(`${button.id}`)
              .setDisabled(button.disabled ? button.disabled : false);
            if (button.emoji) {
              btn.setEmoji(button.emoji);
            }
            component.addComponents(btn);
          }
          components.push(component);
        }
        return components;
      }


      function createButton(style, customId, label, emoji, disabled) {
        let styles = {
          PRIMARY: ButtonStyle.Primary,
          SECONDARY: ButtonStyle.Secondary,
          SUCCESS: ButtonStyle.Success,
          DANGER: ButtonStyle.Danger
        }
        let btn = new ButtonBuilder()
          .setStyle(styles[style])
          .setCustomId(customId)
          .setLabel(label)
          .setDisabled(disabled ? disabled : false);
        if (emoji) btn.setEmoji(emoji);
        return btn;
      }

      function sleep(time) {
        return new Promise((resolve) => setTimeout(() => resolve(time), time));
      }
    } else if (args[0] === Prefix + "سالفة") {
      const commandChannel = await dbq.get(`smchannel_${message.guild.id}`);
      if (!commandChannel || message.channel.id !== commandChannel) return;
      const mgamess = await dbq.get(`managergames_${message.guild.id}`);
      if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;

      const animals = ['نمل', 'نحل', 'ذباب', 'صرصور', 'عنكبوت', 'عقرب', 'تمساح', 'سحلية', 'ثعبان', 'افعى', 'سلحفاة', 'حمار', 'حمار وحشي', 'ثور', 'ذئب', 'حوت', 'جاموس', 'حصاب البحر', 'الديك الرومي', 'النمر', 'السنجاب', 'الحلزون', 'الكسلان', 'سمك القرش', 'قنفذ البحر', 'فرس البحر', 'سمك السردين', 'اسد', 'البقر', 'الغنم', 'سمك السلمون', 'الغراب', 'وحيد القرن', 'الباندا الأحمر', 'الغزال', 'الفأر', 'الراكون', 'الارنب', 'الخنزير', 'البطريق', 'الطاووس', 'الباندا', 'الببغاء', 'المحار', 'النعامة', 'البومة', 'الأخطبوط', 'السمندل', 'البعوض', 'القرد', 'خروف البحر', 'جراد', 'سرطان البحر', 'اللاما', 'الفهد', 'الكوالا', 'ظب', 'الثور البري', 'التنين', 'الكنغر', 'قنديل البحر', 'الضبع', 'الحصان', 'الصقر', 'الهامستر', 'النورس', 'خنزير البحر الهندي', 'الغوريلا', 'الماعز', 'الناموس', 'البط', 'الزرافة', 'الباندا العملاق', 'الغزال', 'الدجاج', 'الثعلب', 'الثور', 'العصفور', 'الفيل', 'النسر', 'الحمام', 'الدولفين', 'الديناصور', 'السلطعون', 'الكوبرا', 'الشمبانزي', 'اليرقة', 'القط', 'الجمل', 'الظب']
     
      if (has_play.get(message.guild.id)) return message.reply({ content: `❌ هناك بالفعل لعبة فعالة في هذا السيرفر!` });
      const storedTime = await dbq.get(`timerbra_${message.author.id}`) || 60000;
      let time = storedTime;
      let data = {
        start_in: Date.now() + time,
        type: "salfa"
      };
      const playerNumber = await dbq.get(`playersCountbra_${message.guild.id}`) || 20;


      let attachment;
      const image = `./imager/setimagebra_${message.guild.id}.png`;
      
      try {
        // تحقق من وجود الملف
        if (fs.existsSync(image)) {
          attachment = new AttachmentBuilder(image);
        } else {
          throw new Error('File not found');
        }
      } catch (error) {
        // إذا لم يكن الملف موجودًا، استخدم الملف البديل
        attachment = new AttachmentBuilder(`./photo/salfa.png`);
      }

      let participantsUser = []
      let participantsInteraction = []
      let CountdownTime = 60; // الوقت المستهدف بالثواني
      let Players = []
      let content_time = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>**`
      let content_players1 = `**(${participantsUser.length} / ${playerNumber})**`;

      let button1 = new Discord.ButtonBuilder()
        .setCustomId(`joinGame`)
        .setLabel(`دخول`)
        .setEmoji('1243848352026591274')
        .setStyle(ButtonStyle.Secondary)
      let button2 = new Discord.ButtonBuilder()
        .setCustomId('leaveGame')
        .setLabel(`خروج`)
        .setEmoji('1243848354535047230')
        .setStyle(ButtonStyle.Secondary)
      let button3 = new Discord.ButtonBuilder()
        .setCustomId('explain')
        .setLabel(`الشرح`)
        .setEmoji('1254234763699687476')
        .setStyle(ButtonStyle.Secondary)
      const row = new Discord.ActionRowBuilder()
        .addComponents([button1, button2, button3])

      // files: [attachment],   هذا السطر الي ينزل الصورة
      let sended1 = `${content_time}\n${content_players1}`
      let GameMessage = await message.channel.send({ content: `${sended1}`, files: [attachment], components: [row] })


      const filter = i => i.message.id === GameMessage.id;
      const collector = message.channel.createMessageComponentCollector({ time: time });

      collector.on('collect', async inter => {
        if (inter.customId == 'joinGame') {
          if (participantsUser.includes(`<@!${inter.user.id}>`)) return await inter.reply({ content: `> **انت بالفعل داخل اللعبة**`, ephemeral: true })

          if (participantsUser.length >= playerNumber) await inter.reply({ content: `> ** وصلت اللعبة للحد الأقصى من المشاركين**`, ephemeral: true })
          participantsInteraction.push(inter)
          participantsUser.push(`<@!${inter.user.id}>`)

          let content_time2 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>**`
          let content_players2 = `**(${participantsUser.length} / ${playerNumber})**`;

          GameMessage.edit({ content: `${content_time2}\n${content_players2}` })

          await inter.reply({ content: `✅ تم إضافتك للعبة بنجاح`, ephemeral: true })
        }
        else if (inter.customId == 'leaveGame') {
          if (!participantsUser.includes(`<@!${inter.user.id}>`)) return await inter.reply({ content: `> **انت بالفعل خارج اللعبة**`, ephemeral: true })
          participantsInteraction.splice(participantsUser.indexOf(`<@!${inter.user.id}>`), 1)
          participantsUser.splice(participantsUser.indexOf(`<@!${inter.user.id}>`), 1)

          let content_time3 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>**`
          let content_players3 = `**(${participantsUser.length} / ${playerNumber})**`;

          GameMessage.edit({ content: `${content_time3}\n${content_players3}` })
          await inter.reply({ content: `✅ تم إزالتك من اللعبة`, ephemeral: true })
        }
        else if (inter.customId == 'explain') {
          inter.reply({
            content: `احزر السالفة
           شرح اللعبة:
           1 : البوت يرسل لجميع الاشخاص نفس الحيوان الا شخص واحد ( برا السالفة )
           2 : يجب عليكم المحافظة على الحيوان وعدم كشفه له لكي لا يفوز
           3 : عليكم بسؤال الاسئلة شي يخص الحيوان الذي ذكر وليس شي لايخصه
           4 : على البرا السالفة رؤية الاسئلة وان يحاول معرفة ما الحيوان لكي يفوز
           5 : على الداخل السالفة التصويت على ( برا السالفة ) عند معرفته
           6 : عندما يتم التصويت على البرا السالفة اختيار الحيوان الصحيح لكي يفوز بالجولة`, ephemeral: true
          })
        }
      });



        let content_time4 = `**__ستبدأ اللعبة خلال__: <t:${Math.floor(data.start_in / 1000)}:R>**`
        let content_players4 = `**(${participantsUser.length} / ${playerNumber})**`;

        GameMessage.edit({ content: `${content_time4}\n${content_players4}` })


      setTimeout(async () => {
        clearInterval(time);
        ButtonBuilder.from(button1).setDisabled(true)
        ButtonBuilder.from(button2).setDisabled(true)
        let row_2 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
              .setCustomId('joinGame')
              .setLabel(`دخول`)
              .setEmoji('1243848352026591274')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true), // تعيين الزر كمعطل
          new ButtonBuilder()
              .setCustomId('leaveGame')
              .setLabel(`خروج`)
              .setEmoji('1243848354535047230')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true), // تعيين الزر كمعطل
          new ButtonBuilder()
              .setCustomId('explain')
              .setLabel(`الشرح`)
              .setEmoji('1254234763699687476')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true)
      );
        let content_def5 = `**(${participantsUser.length} / ${playerNumber})**`
        GameMessage.edit({ content: `${content_def5}`, components: [row_2] })

        if (participantsUser.length < 3) {
          GameMessage.edit({ components: [row_2] })
          message.channel.send('> **تم الغاء اللعبة لأن عدد اللاعبين أقل من 3**')
          return
        }
        const out = getRnd(0, participantsInteraction.length)
        const outUser = participantsInteraction[out].user.id
        const animal = animals[getRnd(0, animals.length)]

        GameMessage.channel.send(`> **جاري تجهيز فقرة الأسئلة**`)
        await sleep(4000);
        
        for (let i = 0; i < participantsInteraction.length; i++) {
          if (participantsInteraction[i].user.id == outUser) {
            await participantsInteraction[i].followUp({ content: '> **انت برا السالفة يجب عليك انت تحزر ماهي السالفة**', ephemeral: true })
            continue;
          }
          await participantsInteraction[i].followUp({ content: `> **انت داخل السالفة : ${animal}**`, ephemeral: true })
        }
        game()
        async function game() {
          let FinishedAsking = []
          for (let i = 0; i < participantsInteraction.length; i++) {
            Players.push(participantsInteraction[i].user.id)
          }
          ask()
          async function ask() {
            let Asked = []
            if (Players.length <= 2) return GameMessage.reply(`> **انتهت اللعبة بسبب وجود لاعبان فقط السالفة كانت ${animal} واللي برا السالفة كان <@!${outUser}>**`)
            for (let i = 0; i < participantsInteraction.length; i++) {
              if (FinishedAsking.includes(participantsInteraction[i].user.id)) continue
              let asker = participantsInteraction[i]
              let usersToAsk = []
              for (let k = 0; k < participantsInteraction.length; k++) {
                if (participantsInteraction[k].user.id == participantsInteraction[i].user.id) continue
                usersToAsk.push(participantsInteraction[k])
              }
              let asked = usersToAsk[getRnd(0, usersToAsk.length)]
              Asked.push({ askerInter: asker, askedInter: asked })
            }
            if (Asked.length <= 0) {
              await GameMessage.reply(`> **انتهت فقرة الأسئلة جاري تحضير فقرة التصويت**`)
              return vote();
            }
            let rnd = getRnd(0, Asked.length)
            const askerInter = Asked[rnd].askerInter
            const asker = askerInter.user.id
            const askedInter = Asked[rnd].askedInter
            const asked = askedInter.user.id
            let AskingTime = Date.now()
            FinishedAsking.push(askerInter.user.id)
            Asked.splice(rnd, 1)

            let Abutton1 = new Discord.ButtonBuilder()
              .setCustomId(`Ask`)
              .setLabel('السؤال')
              .setStyle(ButtonStyle.Secondary)
            const row1 = new Discord.ActionRowBuilder()
              .addComponents([Abutton1])

              let backgroundImage;
              const image = `./imager/qustingsdnr_${message.guild.id}.png`
              try {
                backgroundImage = await canvass.loadImage(image);
              } catch (error) {
                backgroundImage = await canvass.loadImage(`./photo/salfa2.png`);
              }

              const askerMember = await message.guild.members.fetch(asker);
              const askedMember = await message.guild.members.fetch(asked);
            async function createCanvas() {
              const background = await canvass.loadImage(backgroundImage);
              const name = new Canvas(885, 260)
                .printImage(background, 0, 0, 885, 260)
                .printCircularImage(await canvass.loadImage((askerMember.user.avatarURL() + ``).replace(`.webp`, `.png`).replace(`.gif`, `.png`)), 721, 128, 98, 98)
                .printCircularImage(await canvass.loadImage((askedMember.user.avatarURL() + ``).replace(`.webp`, `.png`).replace(`.gif`, `.png`)), 162, 128, 98, 98)
                .pngAsync();

              return name;
            }

            let attachment = new AttachmentBuilder(await createCanvas(), {
              name: "Cain-Store.png"
            });

            const AskingM = await message.channel.send({ content: `**<@!${asker}> اسأل <@!${asked}> \n الوقت : 1m**`, files: [attachment], components: [row1] })

            let AskingInterval = setInterval(async () => {
              const time = Math.round(CountdownTime - (Date.now() - AskingTime) / 1000)
              if (time <= 0) return
            }, 3000);

            const AskingTimeout = setTimeout(async () => {
              clearInterval(AskingInterval);
              ButtonBuilder.from(Abutton1).setDisabled(true)
              AskingM.edit({ components: [row1] })
              participantsInteraction.splice(participantsInteraction.indexOf(askerInter, 1))
              participantsUser.splice(participantsUser.indexOf(`<@!${asker}>`, 1))
              Players.splice(participantsUser.indexOf(asker, 1))
              if (outUser == asker) return message.channel.send(`> تم طرد <@!${asker}> من اللعبة لعدم تفاعله وكان هذا اللاعب برا السالفة`)
              message.channel.send(`> **تم طرد <@!${asker}> من اللعبة لعدم تفاعله وكان هذا اللاعب داخل السالفة**`)
              message.channel.send(`> **جاري تحضير الجولة التالية من الأسئلة**`)
              await sleep(4000);
              ask()
            }, 35000)


            const filter = i => i.message.id === AskingM.id;
            const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
            collector.on('collect', async inter => {
              if (inter.customId != 'Ask') return
              if (inter.user.id != asker) return await inter.reply({ content: `> أنت لست <@!${asker}>`, ephemeral: true })
              const fields = {
                question: new Discord.TextInputBuilder()
                  .setCustomId(`question`)
                  .setLabel(`السؤال`)
                  .setStyle(TextInputStyle.Short)
                  .setMaxLength(250)
                  .setRequired(true)
                  .setPlaceholder(`أكتب السؤال هنا`),
              }
              const question_modal = new Discord.ModalBuilder()
                .setCustomId(`question_modal`)
                .setTitle(`question`)
                .setComponents(
                  new Discord.ActionRowBuilder().setComponents(fields.question),
                )
              await inter.showModal(question_modal)

              // Get the Modal Submit Interaction that is emitted once the User submits the Modal
              const submitted = await inter.awaitModalSubmit({
                time: 30000,
                filter: i => i.user.id === asker,
              }).catch(error => {
                console.error(error)
                return null
              })

              if (submitted) {
                clearInterval(AskingInterval);
                clearTimeout(AskingTimeout);
                ButtonBuilder.from(Abutton1).setDisabled(true)
                AskingM.edit({ components: [row1] })

                console.log(fields)
                //  const [question] = Object.keys(fields).map(key => submitted.fields.getTextInputValue(fields[key].customId))
                const [question] = Object.keys(fields).map(key => {
                  const field = fields[key].toJSON();
                  return submitted.fields.getTextInputValue(field.custom_id);
                });

                let Answerbutton = new Discord.ButtonBuilder()
                  .setCustomId(`Answer`)
                  .setLabel('الاجابة')
                  .setStyle(ButtonStyle.Secondary)
                const row2 = new Discord.ActionRowBuilder()
                  .addComponents([Answerbutton])
                await submitted.reply({ content: `> تم ارسال السؤال`, ephemeral: true })

                let backgroundImage;
                const image = `./imager/answersalfa_${message.guild.id}.png`
                try {
                  backgroundImage = await canvass.loadImage(image);
                } catch (error) {
                  backgroundImage = await canvass.loadImage(`./photo/salfa1.png`);
                }
  
                const askerMember = await message.guild.members.fetch(asker);
                const askedMember = await message.guild.members.fetch(asked);
  
              async function createCanvas() {
                const background = await canvass.loadImage(backgroundImage);
                const name = new Canvas(1287, 451)
                  .printImage(background, 0, 0, 1287, 451)
                  .printCircularImage(await canvass.loadImage((askerMember.user.avatarURL() + ``).replace(`.webp`, `.png`).replace(`.gif`, `.png`)), 1055, 260, 116, 116)
                  .printCircularImage(await canvass.loadImage((askedMember.user.avatarURL() + ``).replace(`.webp`, `.png`).replace(`.gif`, `.png`)), 201, 380, 58, 58)
                  .setColor("#FFFFFF")
                  .setTextFont("bold 50px Cairo")
                  .setTextAlign(`right`)
                  .printText(`${askerMember.user.displayName}`, 915, 210)
                  .pngAsync();
            
                  const content = new Canvas(1287, 451)
                  .printImage(await canvass.loadImage(await name), 0, 0, 1287, 451)
                  .setColor("#FFFFFF")
                  .setTextFont("bold 40px Cairo")
                  .setTextAlign(`right`)
                  .printText(`${question}`, 895, 308)
                  .pngAsync();
            
                  const times = new Canvas(1287, 451)
                  .printImage(await canvass.loadImage(await content), 0, 0, 1287, 451)
                  .setColor("#FFFFFF")
                  .setTextFont("bold 40px Cairo")
                  .setTextAlign(`left`)
                  .printText(`${askedMember.user.displayName}`, 280, 415)
                  .pngAsync();
            
                return times;
              }
            

              let attachment = new AttachmentBuilder(await createCanvas(), {
                name: "Cain-Store.png"
              });


              const replyM = await submitted.channel.send({ content: `**يرجى الاجابه على السؤال : <@!${asked}> \n الوقت : 60 ثانيه **`, files: [attachment], components: [row2] })

                collector.stop()
                
                const AnswerTime = Date.now()

                let AnswerInterval = setInterval(async () => {
                  const time = Math.round(CountdownTime - (Date.now() - AnswerTime) / 1000)
                  if (time <= 0) return
                }, 3000);

                const AnswerTimeout = setTimeout(async () => {
                  clearInterval(AskingInterval);
                  ButtonBuilder.from(Abutton1).setDisabled(true)
                  replyM.edit({ components: [row2] })
                  participantsInteraction.splice(participantsInteraction.indexOf(askedInter, 1))
                  participantsUser.splice(participantsUser.indexOf(`<@!${asked}>`, 1))
                  Players.splice(participantsUser.indexOf(asked, 1))
                  if (outUser == asked) return message.channel.send(`> تم طرد <@!${asked}> من اللعبة لعدم تفاعله وكان هذا اللاعب برا السالفة`)
                  message.channel.send(`> **تم طرد <@!${asked}> من اللعبة لعدم تفاعله وكان هذا اللاعب داخل السالفة**`)
                  await sleep(4000);
                  message.channel.send(`> **جاري تحضير الجولة التالية من الأسئلة**`)
                  await sleep(4000);
                  ask()
                }, 35000)
                const filter2 = i => i.message.id === replyM.id;
                const collector2 = message.channel.createMessageComponentCollector({ filter2, time: 30000 });
                collector2.on('collect', async inter2 => {
                  if (inter2.customId != 'Answer') return
                  if (inter2.user.id != asked) return await inter2.reply({ content: `> أنت لست <@!${asked}>`, ephemeral: true })
                  const fields = {
                    answer: new Discord.TextInputBuilder()
                      .setCustomId(`answer`)
                      .setLabel(`الجواب`)
                      .setStyle(TextInputStyle.Short)
                      .setMaxLength(250)
                      .setRequired(true)
                      .setPlaceholder(`أكتب الجواب هنا`),
                  }
                  const answer_modal = new Discord.ModalBuilder()
                    .setCustomId(`answer_modal`)
                    .setTitle(`answer`)
                    .setComponents(
                      new Discord.ActionRowBuilder().setComponents(fields.answer),
                    )
                  await inter2.showModal(answer_modal)

                  const submitted2 = await inter2.awaitModalSubmit({
                    time: 30000,
                    filter: i => i.user.id === asked,
                  }).catch(error => {
                    console.error(error)
                    return null
                  })
                  if (submitted2) {
                    ButtonBuilder.from(Answerbutton).setDisabled(true)

                    replyM.edit({ components: [row2] })
                    clearInterval(AnswerInterval);
                    clearTimeout(AnswerTimeout);

                    const [answer] = Object.keys(fields).map(key => {
                      const field = fields[key].toJSON();
                      return submitted2.fields.getTextInputValue(field.custom_id);
                    });

                    await submitted2.reply({ content: `> تم ارسال الجواب`, ephemeral: true })

                    let backgroundImage;
                    const image = `./imager/jawabsalfa_${message.guild.id}.png`
                    try {
                      backgroundImage = await canvass.loadImage(image);
                    } catch (error) {
                      backgroundImage = await canvass.loadImage(`./photo/salfa1.png`);
                    }
      
                    const askedMember = await message.guild.members.fetch(asked);
      
                  async function createCanvas() {
                    const background = await canvass.loadImage(backgroundImage);
                    const name = new Canvas(1287, 451)
                      .printImage(background, 0, 0, 1287, 451)
                      .printCircularImage(await canvass.loadImage((askedMember.user.avatarURL() + ``).replace(`.webp`, `.png`).replace(`.gif`, `.png`)), 201, 380, 58, 58)
                      .setColor("#FFFFFF")
                      .setTextFont("bold 50px Cairo")
                      .setTextAlign(`left`)
                      .printText(`${askedMember.user.displayName}`, 280, 415)
                      .pngAsync();
                
                      const content = new Canvas(1287, 451)
                      .printImage(await canvass.loadImage(await name), 0, 0, 1287, 451)
                      .setColor("#FFFFFF")
                      .setTextFont("bold 40px Cairo")
                      .setTextAlign(`right`)
                      .printText(`${answer}`, 1100, 308)
                      .pngAsync();
                
                
                    return content;
                  }
                
    
                  let attachment = new AttachmentBuilder(await createCanvas(), {
                    name: "Cain-Store.png"
                  });

                    await submitted2.channel.send({ files: [attachment], })
                    collector2.stop()
                    await sleep(4000);
                    message.channel.send(`> **جاري تحضير الجولة التالية من الأسئلة**`)
                    await sleep(4000);
                    ask()
                  }
                })
              }
            })
          }
        }
        async function vote() {
          let votingTime = Date.now()
          let usersOptions = [];
          let voters = [];
          let votedOnList = [];
          let chossen = "";
          for (let i = 0; i < participantsInteraction.length; i++) {
            usersOptions.push({ label: participantsInteraction[i].user.displayName, value: participantsInteraction[i].user.id })
          }
          let voteMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId(`voteMenu`)
            .setPlaceholder('التصويت')
            .addOptions(usersOptions)
            .setDisabled(false)
          const voteRow = new Discord.ActionRowBuilder().addComponents([voteMenu])
          let voteEmbed = new Discord.EmbedBuilder()
            .setDescription(`**يرجى التصويت على المشكوك فيه برا السالفة**`)
            .setFooter({ text: `ينتهي التصويت بعد 30 ثانية` })

          const votingMsg = await message.channel.send({ embeds: [voteEmbed], components: [voteRow] })

          let VotingInterval = setInterval(async () => {
            const time = Math.round(CountdownTime - (Date.now() - votingTime) / 1000)
            if (time <= 0) return
            voteEmbed.setFooter({ text: `ينتهي التصويت بعد ${time} ثانية` })
            votingMsg.edit({ embeds: [voteEmbed] })
          }, 3000);


          const filter = i => i.message.id === votingMsg.id;
          const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
          collector.on('collect', async inter => {
            if (inter.customId != 'voteMenu') return
            if (voters.includes(inter.user.id)) return await inter.reply({ content: `> **لايمكنك التصويت مرتين**`, ephemeral: true })
            if (inter.user.id == inter.values[0]) return await inter.reply({ content: `> **لاتصوت عنفسك ياغبي**`, ephemeral: true })
            if (!participantsUser.includes(`<@!${inter.user.id}>`)) return await inter.reply({ content: `> **انت مو داخل اللعبة****`, ephemeral: true })
            inter.reply({ content: `**تم التصويت على <@${inter.values[0]}> بنجاح**`, ephemeral: true })
            voters.push(inter.user.id)
            votedOnList.push(inter.values[0])
          })

          const VotingTimeout = setTimeout(async () => {
            clearInterval(VotingInterval);
            voteEmbed.setFooter({ text: `انتهى وقت التصويت` })
            StringSelectMenuBuilder.from(voteMenu).setDisabled(true)

            votingMsg.edit({ embeds: [voteEmbed], components: [voteRow] })

            if (!votedOnList) {
              let votingResultEmbed = new Discord.EmbedBuilder()
                .setDescription(`الذي كان برا السالفة هو : <@!${outUser}>`)
                .setColor('#FFFF00')
              votingMsg.reply({ content: `لم يتم التصويت على أحد`, embeds: [votingResultEmbed] })
              await sleep(3000);
              animalVote()
              return
            }
            var counts = {};
            votedOnList.forEach(function (i) { counts[i] = (counts[i] || 0) + 1; });

            let max = 0;

            for (let count in counts) {
              if (counts[count] > max) {
                max = counts[count];
                chossen = count
              }
            }

            let votingResultEmbed = new Discord.EmbedBuilder()
              .setDescription(`تم التصويت على <@!${chossen}>\nالذي كان برا السالفة هو : <@!${outUser}>`)
            if (chossen == outUser) {
              votingResultEmbed
            .setTitle('تصويت صحيح')
            .setColor('#00ff00') 
            message.channel.send(`🏆 | **فاز الفريق الأول ( داخل السالفه )**`);
           } else { 
            votingResultEmbed
            .setTitle('تصويت خطأ')
            .setColor('#ff0000')
            votingMsg.reply({ embeds: [votingResultEmbed] })
            message.channel.send(`🏆 | **فاز <@!${outUser}> في اللعبه**`)
           }
            collector.stop()
            await sleep(3000);
            animalVote()
          }, 30000)

        }
        async function animalVote() {
          let votingTime = Date.now()
          let animalOptions = [{ label: animal, value: animal }];
          let votedOn = '';
          for (let i = 0; i < 9; i++) {
            const random = animals[Math.floor(Math.random() * animals.length)];
            if (random !== animal) {
              animalOptions.push({ label: random, value: random })
            }
          }
          function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) { randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; }
            return array;
          }
          shuffle(animalOptions);
          let voteMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId(`voteMenu`)
            .setPlaceholder('التصويت')
            .addOptions(animalOptions)
            .setDisabled(false)
          const voteRow = new Discord.ActionRowBuilder().addComponents([voteMenu])
          let voteEmbed = new Discord.EmbedBuilder()
            .setDescription(`**يرجى اختيار الحيوان الذي تضن انه السالفة\n- <@!${outUser}>**`)
            .setFooter({ text: `ينتهي التصويت بعد 30 ثانية` })

          const votingMsg = await message.channel.send({ content: `**يرجى اختيار الحيوان الذي تظن انه داخل السالفة\n- <@!${outUser}>**`, embeds: [voteEmbed], components: [voteRow] })

          let VotingInterval = setInterval(async () => {
            const time = Math.round(CountdownTime - (Date.now() - votingTime) / 1000)
            if (time <= 0) return
            voteEmbed.setFooter({ text: `ينتهي التصويت بعد ${time} ثانية` })
            votingMsg.edit({ embeds: [voteEmbed] })
          }, 3000);
          const VotingTimeout = setTimeout(async () => {
            clearInterval(VotingInterval);
            voteEmbed.setFooter({ text: `انتهى وقت التصويت` })
            StringSelectMenuBuilder.from(voteMenu).setDisabled(true)
            votingMsg.edit({ embeds: [voteEmbed], components: [voteRow] })

            let votingResultEmbed = new Discord.EmbedBuilder()
              .setDescription(`السالفة كان: ${animal}`)
              .setColor('#ff0000')
            votingMsg.reply({ content: `> انتهى وقت الاختيار ولم يتم اختيار اي حيوان`, embeds: [votingResultEmbed] })
          }, 35000)


          const filter = i => i.message.id === votingMsg.id;
          const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
          collector.on('collect', async inter => {
            if (inter.customId != 'voteMenu') return
            if (inter.user.id != outUser) return await inter.reply({ content: `** انت لست <@!${outUser}>**`, ephemeral: true })
            clearInterval(VotingInterval);
            clearTimeout(VotingTimeout)

            votedOn = inter.values[0]


            let votingResultEmbed = new Discord.EmbedBuilder()
              .setDescription(`تم اختيار : ${votedOn}\n السالفة كانت : ${animal}`)

            if (votedOn == animal) votingResultEmbed.setTitle('اختيار صحيح').setColor('#00ff00')
            else votingResultEmbed.setTitle('اختيار خاطئ').setColor('#ff0000')
            votingMsg.reply({ embeds: [votingResultEmbed], content: `- <@${outUser}>` })
            collector.stop()

          })



        }
      }, time);


      function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
      function createButton(style, customId, label, emoji, disabled) {
        let styles = {
          PRIMARY: ButtonStyle.Primary,
          SECONDARY: ButtonStyle.Secondary,
          SUCCESS: ButtonStyle.Success,
          DANGER: ButtonStyle.Danger
        }
        let btn = new ButtonBuilder()
          .setStyle(styles[style])
          .setCustomId(customId)
          .setLabel(label)
          .setDisabled(disabled ? disabled : false);
        if (emoji) btn.setEmoji(emoji);
        return btn;
      }

      function sleep(time) {
        return new Promise((resolve) => setTimeout(() => resolve(time), time));
      }

    } else if (args[0] === Prefix + "ايقاف") {
      const commandChannel = await dbq.get(`smchannel_${message.guild.id}`);
      if (!commandChannel || message.channel.id !== commandChannel) return;
      const mgamess = await dbq.get(`managergames_${message.guild.id}`);
      if (!message.member.roles.cache.has(`${mgamess}`) && !message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
      has_play.delete(message.guild.id);
      if (has_play.has(message.guild.id)) {
        await message.reply('⌛ | سيتم ايقاف اللعبة الحالية.');
      } else {
        message.reply('❌ | لا يوجد لعبة قيد التشغيل.');
      }
    }
  });
  ////////////////////////


  function isImageURL(url) {
    const imageExtensions = ['.png', '.JPG', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.tiff', '.svg', '.ico', '.jfif'];
    return imageExtensions.some(extension => url.toLowerCase().includes(extension));
  }
  function cutURLAfterImageExtensions(url) {
    const imageExtensions = ['.png', '.JPG', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.tiff', '.svg', '.ico', '.jfif'];

    const extensionIndex = imageExtensions.reduce((index, extension) => {
      const extensionPos = url.indexOf(extension);
      return (extensionPos !== -1 && (index === -1 || extensionPos < index)) ? extensionPos : index;
    }, -1);

    if (extensionIndex !== -1) {
      return url.slice(0, extensionIndex + 4);
    }

    return url;
  }

  //////////////////// لوق دخول وخروج السيرفر ////////////////////

  client.on("guildCreate", async (guild) => {
    try {
      const owner = await guild.fetchOwner();
      let privetch = client.channels.cache.get("1205043952017870858");
      let addembed = new EmbedBuilder()
        .setTitle("Joined new guild 🛒")
        .setDescription(`**Guild name:** ${guild.name} \n **Members:** ${guild.memberCount} \n **Guild ID:** ${guild.id} \n **Owner:** <@${owner.user.id}>`)
        .setThumbnail(guild.iconURL())

      if (privetch) {
        privetch.send({
          embeds: [addembed]
        });
      }
    } catch (error) {
      console.error('An error occurred while sending the join message:', error);
    }
  });

  client.on("guildDelete", async (guild) => {
    try {
      let privetch = client.channels.cache.get("1207604124032569426");
      const owner = await guild.fetchOwner();
      let removeembed = new EmbedBuilder()
        .setTitle("Left a guild 🛒")
        .setDescription(`**Guild name:** ${guild.name} \n **Members:** ${guild.memberCount} \n **Guild ID:** ${guild.id} \n **Owner:** <@${owner.user.id}>`)
        .setThumbnail(guild.iconURL())

      if (privetch) {
        privetch.send({
          embeds: [removeembed]
        });
      }
    } catch (error) {
      console.error('An error occurred while sending the leave message:', error);
    }
  });

  //////////////////// End ////////////////////

  ////////////////////////////////////////////////////////////////////




  process.on("uncaughtException", error => {
    console.log(error)
    return;
  })

  process.on("unhandledRejection", error => {
    console.log(error)
    return;
  })

  process.on("rejectionHandled", error => {
    console.log(error)
    return;
  });