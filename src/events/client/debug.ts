import { int } from '@test-bot/typings';
import { Listener } from '../../framework/events/Listener';

export const regexes = {
    TOKEN: /(token|session)/,
    SHARD: /\[WS => Shard ([0-9])\]/,
    WS: /\[(WS => Manager)\]/,
    SPACES: /\s+/,
    SPACES_GLOBAL: /\s+/g,
    HEARTBEAT: /Heartbeat acknowledged/,
};


@Listener.applyOptions({
    categoryId: 'client',
    emitter: 'client',
    eventName: 'debug',
})
@Listener.customId()
export default class ReadyClient extends Listener {
    exec(message: string) {

        if (regexes.TOKEN.test(message.toLowerCase())) return;


        const res = regexes.SHARD.exec(message);
        let shard: int;
        if (res) {
            shard = +res[1] || 0;
        } else {
            shard = 0;
        }

        const len = message.split('\n');
        if (len.length > 1) {
            for (const m of len) {
                if (/[CONNECT]/.test(m)) continue;
                this.client.logger.debug({
                    message: m.replace(regexes.SPACES_GLOBAL, '')
                        .replace(/\s+/, ''),
                    shard
                });
            }
        } else {
            message = message.replace(regexes.WS, '[Websocket] ')
                .replace(regexes.SHARD, '')
                .replace(regexes.HEARTBEAT, '[HeartbeatTimer]')
                .replace(regexes.SPACES_GLOBAL, ' ');
            this.client.logger.debug({
                message: `${message
                    }`,
                shard
            });
        }
    }
}
