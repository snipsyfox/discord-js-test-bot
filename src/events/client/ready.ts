import { ActivityType } from 'discord.js';
import { TestBotClient } from '../../framework/clients/TestBotClient';
import { Listener } from '../../framework/events/Listener';



@Listener.applyOptions({
    categoryId: 'client',
    emitter: 'client',
    eventName: 'ready',
})
@Listener.customId()
export default class ReadyClient extends Listener {
    exec(client: TestBotClient<true>) {
        client.logger.log({
            message: `[READY] ${client.user.username} is ready.`,
            shard: client.shard?.ids[0]
        });
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
