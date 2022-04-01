import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'support',
            aliases: ['support'],
            description: 'Gets the support group links',
            category: 'general',
            usage: `${client.config.prefix}Support`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        (await this.client.sendMessage(
        M.sender.jid,
                `*❤️𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗚𝗿𝗼𝘂𝗽𝘀❤️*\n\n
                 *「Falling: Official Insta」*https://instagram.com/falling_1392005\n\n
                 *「Moba┐: 𝗖𝗮𝘀𝗶𝗻𝗼💰」*https://chat.whatsapp.com/IIswpeN3tSH9xpDkly3HWq                `,
           MessageType.text
        ))
        const n = [
            'https://c.tenor.com/IUqyJKXy4OAAAAAC/iron-man-avengers.gif'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `Send you the support group links in Personal Message\n` }
        )

        }
}
