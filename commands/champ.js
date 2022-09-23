const Discord = require("discord.js");

exports.execute = async (client, message, args) => {
  let argsString = await args.toString();
  argsString = await argsString.replace(",", "");
  let champion = argsString;

  if (!champion) {
    const championerrorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("ERROR")
      .setDescription(`Please enter the champion correctly.`);

    return message.channel.send({ embeds: [championerrorEmbed] });
  }
  champion = champion.toLowerCase();
  if (!client.config.mobafire[champion]) {
    client.config.wildriftfire[champion] = champion;
    client.config.wildriftguides[champion] = champion;
    client.config.rankedboost[champion] = champion;
    client.config.mobafire[champion] = champion;
  }
  const loadingEmbed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(champion.toUpperCase())
    .setDescription(
      `<a:Loading:900575343839150170> Loading *${champion.toUpperCase()}* ...`
    );

  message.reply({ embeds: [loadingEmbed] }).then((msg) => {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("ERROR")
      .setDescription(
        `There is no champion named *${champion.toUpperCase()}* in LOL:Wild Rift.`
      );

    const data = async () => {
      const puppeteer = require("puppeteer");
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const url =
        "https://rankedboost.com/league-of-legends-wild-rift/build/" +
        client.config.rankedboost[champion];
      const url2 =
        "https://rankedboost.com/league-of-legends-wild-rift/counter/" +
        client.config.rankedboost[champion];
      const page = await browser.newPage(); // Open new page
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 }); // Go website
      try {
        await page.waitForSelector(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.section-entire-wr-stat-data-wrap"
        );
      } catch (e) {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(champion.toUpperCase())
          .addField(
            "Info Stats",
            `Not available currently or there is no champion named *${champion.toUpperCase()}* in LOL:Wild Rift.`,
            true
          )
          .setThumbnail(
            "https://www.mobafire.com/images/champion/square/" +
              client.config.mobafire[champion] +
              ".png"
          );

        return msg.edit({ embeds: [embed] });
      }
      try {
        let element = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.rb-build-champion-details > div.rb-build-subtitle > p"
        );
        let value = await page.evaluate((el) => el.textContent, element);
        let element1 = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.para-div-rb > p > span:nth-child(2)"
        );
        let value1 = await page.evaluate((el) => el.textContent, element1);
        let element2 = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.rb-build-champion-details > div.rb-build-tier > p > span"
        );
        let value2 = await page.evaluate((el) => el.textContent, element2);
        let element3 = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.section-entire-wr-stat-data-wrap > div:nth-child(1) > div.easy-css-for-champion-data-wr.strong"
        );
        let value3 = await page.evaluate((el) => el.textContent, element3);
        let element4 = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.section-entire-wr-stat-data-wrap > div:nth-child(2) > div.easy-css-for-champion-data-wr.tough"
        );
        let value4 = await page.evaluate((el) => el.textContent, element4);
        let element5 = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.section-entire-wr-stat-data-wrap > div:nth-child(3) > div.easy-css-for-champion-data-wr.ult"
        );
        let value5 = await page.evaluate((el) => el.textContent, element5);
        let element6 = await page.$(
          "body > div.site-container.m-wrapper > div.site-inner.content-menu-align-yuhh > div > div.container > div > main > article > div > section.rankedboost__sys__section.parent > div.rb-build-main-header-bottom-left > div.section-entire-wr-stat-data-wrap > div:nth-child(4) > div.easy-css-for-champion-data-wr.diff"
        );
        let value6 = await page.evaluate((el) => el.textContent, element6);

        await page.goto(url2, { waitUntil: "domcontentloaded", timeout: 0 });

        //const champschamps = document.querySelectorAll(".champ-name-lolwr-tier-table");
        //const cc = [...champschamps];
        //console.log(cc);
        //console.log(cc[0]);
        /*       let w2e = await page.$("#tierListTableWROne > tbody > tr.rb-build-overview-tr.tr-tier-s > td.rb-build-overview-td.champ-column > a > div > div");
        let w2 = await page.evaluate((el) => el.textContent, w2e);

        let w3e = await page.$("#tierListTableWROne > tbody > tr.rb-build-overview-tr.tr-tier-a > td.rb-build-overview-td.champ-column > a > div > div");
        let w3 = await page.evaluate((el) => el.textContent, w3e);

        let g1e = await page.$("");
        let g1 = await page.evaluate((el) => el.textContent, g1e);

        let w2e = await page.$("");
        let w2 = await page.evaluate((el) => el.textContent, g2e);

        let g3e = await page.$("");
        let g3 = await page.evaluate((el) => el.textContent, g3e);

        let s1e = await page.$("");
        let s1 = await page.evaluate((el) => el.textContent, s1e);

        let s2e = await page.$("");
        let s2 = await page.evaluate((el) => el.textContent, s2e);

        let s3e = await page.$("");
        let s3 = await page.evaluate((el) => el.textContent, s3e);
*/
        await page.close();
        await browser.close(); // Close the browser

        let value3args = value3.split(" ");
        let value3barvalue = value3args[0].replace(/★/g, "r");
        let value3barbasic = (value3barvalue + "b" + "b" + "b").substring(0, 3);
        let value3bar = value3barbasic
          .replace(/r/g, "<:linered:890728237586591794>")
          .replace(/b/g, "<:lineblue:890043187647889479>");

        let value4args = value4.split(" ");
        let value4barvalue = value4args[0].replace(/★/g, "r");
        let value4barbasic = (value4barvalue + "b" + "b" + "b").substring(0, 3);
        let value4bar = value4barbasic
          .replace(/r/g, "<:lineorange:890728577220345918>")
          .replace(/b/g, "<:lineblue:890043187647889479>");

        let value5args = value5.split(" ");
        let value5barvalue = value5args[0].replace(/★/g, "r");
        let value5barbasic = (value5barvalue + "b" + "b" + "b").substring(0, 3);
        let value5bar = value5barbasic
          .replace(/r/g, "<:linegreen:890728429681532960>")
          .replace(/b/g, "<:lineblue:890043187647889479>");

        let value6args = value6.split(" ");
        let value6barvalue = value6args[0].replace(/★/g, "r");
        let value6barbasic = (value6barvalue + "b" + "b" + "b").substring(0, 3);
        let value6bar = value6barbasic
          .replace(/r/g, "<:lineviolett:890043591492251698>")
          .replace(/b/g, "<:lineblue:890043187647889479>");

        const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setAuthor(champion.toUpperCase())
          .setDescription(`**${value}**`)
          .addFields(
            {
              name: `**Recommended Role**`,
              value: `${value1}`,
              inline: true,
            },
            {
              name: `**Tier**`,
              value: `${value2}`,
              inline: true,
            }
          )
          .addField("**Damage**", value3bar + "\n" + value3args[1], true)
          .addField("**Toughness**", value4bar + "\n" + value4args[1], true)
          .addField("**Utility**", value5bar + "\n" + value5args[1], true)
          .addField("**Difficulity**", value6bar + "\n" + value6args[1], true)
          .addField("**Difficulity**", value6bar + "\n" + value6args[1], false)
          .addField("**Difficulity**", value6bar + "\n" + value6args[1], false)
          .addField("**Difficulity**", value6bar + "\n" + value6args[1], false)
          .addField(
            "**Guides**",
            `[wildriftfire](https://www.wildriftfire.com/guide/${client.config.wildriftfire[champion]})\n[rankedboost](${url})\n[wildriftguides](https://wildriftguides.gg/guides/${client.config.wildriftguides[champion]})\n[Click here to support the developer](https://www.buymeacoffee.com/hansdev)`,
            false
          )
          .setThumbnail(
            "https://www.mobafire.com/images/champion/square/" +
              client.config.mobafire[champion] +
              ".png"
          );

        await msg.edit({ embeds: [embed] });
      } catch (e) {
        const embed2 = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(champion.toUpperCase())
          .addField(
            "Info Stats",
            `Not available currently or there is no champion named *${champion.toUpperCase()}* in LOL:Wild Rift.`,
            true
          )
          .setThumbnail(
            "https://www.mobafire.com/images/champion/square/" +
              client.config.mobafire[champion] +
              ".png"
          );

        return msg.edit({ embeds: [embed2] });
      }
    };
    data();
  });
};

exports.help = {
  name: "Champion Info",
  aliases: ["champ", "hero", "champion"],
  usage: `champ [champ]`,
  info: "A specific champion's stats.",
};
