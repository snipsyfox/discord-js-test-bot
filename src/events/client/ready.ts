import { ActivityType, Client } from 'discord.js';
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
        client.user.setPresence({
            activities: [{
                name: 'Avocado Toast is overrated',
                type: ActivityType.Playing
            }],
            afk: true,
            status: 'idle'
        });
    }
}