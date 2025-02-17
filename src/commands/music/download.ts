import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import yts from "yt-search";
import YT from "../../lib/YT";
import request from '../../lib/request'

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "download",
      description: "This will download  a song which you want🎶",
      category: "music",
      aliases: ["dl"],
      usage: `${client.config.prefix}download [term]`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined)
      return void M.reply("Please provide me a search term.. onegai");
    const term = joined.trim();
    const { videos } = await yts(term);
    if (!videos || videos.length <= 0)
      return void M.reply(
        `⚓ No Matching videos found for the term : *${term}*`
      );
    const audio = new YT(videos[0].url, "audio");
    if (!audio.url) return;
    M.reply("🍁 sending");
    this.client
      .sendMessage(M.from, await audio.getBuffer(), MessageType.audio, {
        quoted: M.WAMessage,
        contextInfo: {
          externalAdReply: {
            title: videos[0].title.substr(0, 30),
            body: `author : ${videos[0].author.name.substr(0, 20)}\nLord Savage`,
            mediaType: 2,
            thumbnail: await request.buffer(`https://i.ytimg.com/vi/${audio.id}/hqdefault.jpg`),
            mediaUrl: audio.url,
          },
        },
      })
      .catch((reason: Error) => M.reply(`error detected try again`));
  };
}
