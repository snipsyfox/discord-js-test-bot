import { Client } from 'discord.js';
import { Listener } from '../../structures/events/Listener';
import { applyListenerOptions, customId } from '../../structures/utils/decorators';


@applyListenerOptions({
    emitter: 'client',
    eventName: 'ready',
})
@customId()
export default class ReadyClient extends Listener {
    exec(client: Client<true>) {
        console.log(`[READY] ${client.user.username} is ready.`);
    }
}