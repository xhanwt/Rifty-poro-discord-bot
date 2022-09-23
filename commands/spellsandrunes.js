const Discord = require("discord.js");

exports.execute = async (client, message, args) => {
  let argsString = await args.toString();
  argsString = await argsString.replace(",", "");
  let champion = argsString;

  if (!champion) {
    const championerrorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(champion.toUpperCase())
      .setDescription(`Please enter the champion correctly.`);

    return message.reply({ embeds: [championerrorEmbed] });
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
      `<a:Loading:900575343839150170> Loading spells and runes of *${champion.toUpperCase()}* ...`
    );

  message.reply({ embeds: [loadingEmbed] }).then((msg) => {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(champion.toUpperCase())
      .setDescription(
        `There is no champion named *${champion.toUpperCase()}* in LOL:Wild Rift.`
      );

    const puppeteer = require("puppeteer"); // Require Puppeteer module
    const url =
      "https://www.wildriftfire.com/guide/" +
      client.config.wildriftfire[champion]; // Set website you want to screenshot

    const Screenshot = async () => {
      // Define Screenshot function
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      }); // Launch a "browser"
      const page = await browser.newPage(); // Open new page
      await page.goto(url, { waitUntil: "load", timeout: 0 }); // Go website
      try {
        await page.waitForSelector(
          "#data-wrap > div > div.wf-champion__data__spells.data-block",
          { timeout: 1000 }
        ); // Method to ensure that the element is loaded
      } catch (e) {
        return msg.edit({ embeds: [errorEmbed] });
      }

      const logo = await page.$(
        "#data-wrap > div > div.wf-champion__data__spells.data-block"
      ); // logo is the element you want to capture
      const box = await logo.boundingBox(); // this method returns an array of geometric parameters of the element in pixels.
      const x = box["x"]; // coordinate x
      const y = box["y"]; // coordinate y
      const w = box["width"]; // area width
      const h = box["height"]; // area height

      const screenshot = await page.screenshot({
        clip: { x: x, y: y, width: w, height: h + 5 },
      }); // take screenshot of the required area in puppeteer

      await page.close();
      await browser.close();

      const file = new Discord.MessageAttachment(screenshot);

      const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(champion.toUpperCase())
        .setDescription(
          `Source: [WildRiftFire](${url})\n[Click here to support the developer](https://www.buymeacoffee.com/hansdev)`
        )
        .setImage(`attachment://file.jpg`)
        .setThumbnail(
          "https://www.mobafire.com/images/champion/square/" +
            client.config.mobafire[champion] +
            ".png"
        )
        .setFooter(
          "If the image is not loading, please kindly use the command again."
        );

      await msg.edit({ embeds: [embed], files: [file] });
    };

    Screenshot();
  });
};

exports.help = {
  name: "Champion Summoners and Runes",
  aliases: [
    "sr",
    "spellandrune",
    "spells",
    "runes",
    "spell",
    "rune",
    "summoner",
  ],
  usage: `sr [champ]`,
  info: "See the summoners and runes of a champion.\n(For two words name like Lee Sin, do not add space.\neg., leesin (or) lee-sin)",
};
