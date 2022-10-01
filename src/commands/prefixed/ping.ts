import { Message } from 'discord.js';
import { Command } from '../../framework/commands/Command';

@Command.applyOptions({
    name: 'ping',
    categoryId: 'prefixed.ping'
})
@Command.customId()
export default class PingCommand extends Command {
    async exec(msg: Message<boolean>) {
        const ping = this.client.ws.ping;
        await msg.channel.send({
            content: `PONG! \`\`\`ansi\n\x1B[31m${ping}ms\x1B[0m\`\`\` `
        });
    }

}
