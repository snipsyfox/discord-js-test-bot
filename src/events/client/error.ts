import { Listener } from '../../framework/events/Listener';

@Listener.applyOptions({
    emitter: 'client',
    eventName: 'error',
    categoryId: 'client'
})
@Listener.customId()

export default class ErrorEvent extends Listener {

    exec(err: Error): unknown {

        this.client.logger.error({ error: err, shard: 0 });

        return;
    }


}
