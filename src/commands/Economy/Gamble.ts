import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";
import ms from "parse-ms-js";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "gamble",
      description: "𝓛𝓮𝓽𝓼 𝓼𝓮𝓮 𝓱𝓸𝔀 𝓶𝓾𝓬𝓱 𝓰𝓸𝓸𝓭 𝔂𝓸𝓾𝓻𝓮.",
      aliases: ["gamble"],
      category: "economy",
      usage: `${client.config.prefix}gamble <amount> [left/right] | ${client.config.prefix}gamble [left/right] <amount>`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    if (M.from !== "120363041438860321@g.us")
      return void M.reply(
        `𝓑𝓲𝓽𝓬𝓱 𝔂𝓸𝓾 𝓬𝓪𝓷𝓽 𝓰𝓪𝓶𝓫𝓵𝓮 𝓱𝓮𝓻𝓮. 𝓤𝓼𝓮 ${this.client.config.prefix}support 𝕥𝕠 𝕞𝕒𝕜𝕖 𝕪𝕠𝕦𝕣 𝕝𝕚𝕗𝕖 𝕙𝕖𝕒𝕧𝕖𝕟.`
      );
    const user = M.sender.jid;
    const time = 25000;
    const cd = await (await this.client.getCd(user)).gamble;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `𝕕𝕖𝕞𝕟! 𝕤𝕝𝕠𝕨 𝕕𝕠𝕨𝕟 𝕕𝕦𝕕𝕖 𝕪𝕠𝕦 𝕔𝕒𝕟 𝕔𝕦𝕞 𝕒𝕘𝕒𝕚𝕟 𝕚𝕟 *${timeLeft.seconds} second(s)*`
      );
    }
    const directions = ["left", "right"];
    const terms: any = joined.trim().split(" ");
    const wallet = await (await this.client.getUser(user)).wallet;
    const direction = directions[Math.floor(Math.random() * directions.length)];
    let gif!: string;
    if (direction === "left") {
      gif = "https://bestanimations.com/media/left/365059883left-arrow-18.gif";
    } else if (direction === "right") {
      gif =
        "https://p14cdn4static.sharpschool.com/UserFiles/Servers/Server_1584893/Image/Buttons/right-arrow-31.gif";
    }
    const buttons = [
      {
        buttonId: "wallet",
        buttonText: { displayText: `${this.client.config.prefix}wallet` },
        type: 1,
      },
    ];
    const amount: number = terms[0];
    const luck: string = terms[1].toLowerCase();
    if (isNaN(amount))
      return void M.reply(
        `🟥 *𝕓𝕚𝕥𝕔𝕙 𝕠𝕡𝕖𝕟 𝕪𝕠𝕦𝕣 𝕖𝕪𝕖𝕤. Usage Example - ${this.client.config.prefix}gamble 100 left*`
      );
    if (amount < 200)
      return void M.reply(`🟥 *𝕠𝕙 𝕞𝕪 𝕣𝕚𝕔𝕙 𝕡𝕖𝕣𝕤𝕠𝕟 𝕘𝕒𝕞𝕓𝕝𝕖 𝕒𝕥𝕝𝕖𝕒𝕤𝕥 200.*`);
    if (amount > wallet)
      return void M.reply(
        `🟥 *𝕡𝕠𝕠𝕣 𝕪𝕠𝕦 𝕟𝕖𝕖𝕕 ${
          amount - wallet
        } 𝕘𝕠𝕝𝕕 𝕞𝕠𝕣𝕖 𝕚𝕟 𝕪𝕠𝕦𝕣 𝕡𝕠𝕔𝕜𝕖𝕥 𝕥𝕠 𝕞𝕒𝕜𝕖 𝕪𝕠𝕦𝕣 𝕘𝕗 𝕙𝕒𝕡𝕡𝕪*.`
      );
    if (amount > 50000)
      return void M.reply(`🟥 *You can't gamble gold more than 50000.*`);
    if (!directions.includes(luck))
      return void M.reply(
        `🟥 *The direction should be left or right. Example - ${this.client.config.prefix}gamble ${amount} left.*`
      );
    if (luck !== direction) {
      await this.client.reduceGold(user, amount);
      await this.client.DB.cd.updateOne(
        { jid: user },
        { $set: { gamble: Date.now() } }
      );
      const sticker: any = await new Sticker(gif, {
        pack: `${direction.toUpperCase()}`,
        author: `${direction.toUpperCase()}`,
        quality: 90,
        type: "full",
        categories: ["🎊"],
        background: "#0000ffff",
      });
      await M.reply(await sticker.build(), MessageType.sticker, Mimetype.webp);
      const buttonMessage: any = {
        contentText: `📉 𝕪𝕠𝕦 𝕟𝕖𝕖𝕕 𝕤𝕠𝕞𝕖𝕠𝕟𝕖 𝕪𝕠𝕦 𝕝𝕠𝕤𝕥 *${amount} gold*.`,
        footerText: "© moba",
        buttons: buttons,
        headerType: 1,
      };
      await M.reply(buttonMessage, MessageType.buttonsMessage);
    }
    if (luck == direction) {
      await this.client.addGold(user, amount);
      await this.client.DB.cd.updateOne(
        { jid: user },
        { $set: { gamble: Date.now() } }
      );
      const sticker: any = await new Sticker(gif, {
        pack: `${direction.toUpperCase()}`,
        author: `${direction.toUpperCase()}`,
        quality: 90,
        type: "full",
        categories: ["🎊"],
        background: "#0000ffff",
      });
      await M.reply(await sticker.build(), MessageType.sticker, Mimetype.webp);
      const buttonMessage: any = {
        contentText: `📈 𝕓𝕣𝕠 𝕡𝕒𝕣𝕥𝕪? 𝕪𝕠𝕦 𝕨𝕠𝕟 *${amount} gold*.`,
        footerText: "© moba",
        buttons: buttons,
        headerType: 1,
      };
      await M.reply(buttonMessage, MessageType.buttonsMessage);
    }
  };
}
