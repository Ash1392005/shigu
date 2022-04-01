import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'moba',
            description: 'Displays info about savage.',
            category: 'general',
            usage: `${client.config.prefix}savage`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://telegra.ph/file/8eed1568a71b3b55dac05.jpg','https://telegra.ph/file/6777fe4846a3b0af4decd.jpg'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: rin }, MessageType.image, {quoted:M.WAMessage,
            mimetype: Mimetype.jpeg,
            caption: `🍭𝗵𝗲𝗹𝗹𝗼!🍃🅘 🅐🅜 🅜🅞🅑🅐 🅘 🅛🅞🅥🅔 🅖🅘🅡🅛🅢 🅦🅘🅣🅗 🅟🅞🅔🅣🅡🅨.
            
🍁𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥;
Wa.me/+919711054140

꧂𝐍𝐎𝐓𝐄;
𝓑𝓮 𝓚𝓲𝓷𝓭 𝓑𝓮 𝓕𝓲𝓷𝓮
𝓝𝓮𝓮𝓭 𝓐𝓷𝔂𝓽𝓱𝓲𝓷𝓰 𝓐𝓼𝓴
𝓑𝓸𝓽 𝓸𝓻 𝓞𝓦𝓷𝓮𝓻 

📮𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢;
https://instagram.com/_mobasshirachaudhary_
https://instagram.com/falling_1392005
🚀𝘿𝙞𝙨𝙘𝙤𝙧𝙙;
｟𝖢𝗈𝗆𝗂𝗇𝗀 𝖲𝗈𝗈𝗇｠

⪼𝖲𝖾𝖾 𝗒𝖺𝗁 💘` }
        )
    }
}
