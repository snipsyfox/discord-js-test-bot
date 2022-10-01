import { Listener } from '../../framework/events/Listener';

@Listener.applyOptions({
    emitter: 'client',
    eventName: 'warn',
    categoryId: 'client'
})
@Listener.customId()

export default class ErrorEvent extends Listener {

    exec(err: string): unknown {
        this.client.logger.error({
            error: {
                name: 'WARN',
                message: err,
                stack: `WARN ${err}`
            },
            shard: 0
        });

        return;
    }


}
