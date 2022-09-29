import { applyListenerOptions } from '../../structures/utils/decorators';
import { customId } from '../../structures/utils/decorators';
import { Listener } from '../../structures/events/Listener';
@applyListenerOptions({
    emitter: 'client',
    eventName: 'debug',
})
@customId()
export default class ReadyClient extends Listener {
    exec(message: string) {

        if (/(token|session)/.test(message.toLowerCase())) return;

        this.client.logger.debug(`[from Discord] ${message}`);
    }
}
