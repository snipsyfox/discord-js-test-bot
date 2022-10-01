import { int } from '@test-bot/typings';
import { Message } from 'discord.js';
import { totalmem } from 'os';
import { Command } from '../../../framework/commands/Command';
import { createEmbed } from '../../../framework/utils/functions';


@Command.applyOptions({
    name: 'stats',
    categoryId: 'util',

})
export default class StatCommand extends Command {
    async exec(msg: Message<boolean>) {

        const usage = process.memoryUsage().rss / 1024 / 1024;

        const str = [
            '```ansi',
            `${this.client.bash.bold('Memory Usage')}: ${this.statMemory(this.client.memoryUtil.percentage(usage))
            }% (${usage.toFixed(2)}MB/${(totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB)`,
            '```'
        ].join('\n');

        const embed = createEmbed()
            .setColor(0x8008A5);

        embed.setDescription(str);

        return msg.channel.send({
            embeds: [embed]
        });
    }



    statMemory(muse: int) {
        console.log('MUSE TLAHG', muse
        );

        if (muse < 40) {
            return this.client.bash.green(muse.toFixed(2));
        }
        if (muse < 80) {
            return this.client.bash.yellowBold(muse.toFixed(2));
        }

        if (muse < 90) {
            return this.client.bash.red(muse.toFixed(2));
        }
        return this.client.bash.black(muse.toFixed(2));

    }



}