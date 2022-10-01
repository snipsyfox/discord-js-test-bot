import { TestBotClient } from '../clients/TestBotClient';
import { CustomModule, ModuleOptions } from '../modules/CustomModule';
import { createclassDecorator } from '../utils/decorators';
import { ListenerHandler } from './EventClient';

export interface ListenerOptions extends ModuleOptions {
    eventName: string;
    emitter: string;
}

export type eventArgs = any[];

export abstract class Listener extends CustomModule<ListenerHandler> implements ListenerOptions {


    id: string;
    eventName: string;
    emitter: string;
    client!: TestBotClient;
    handler!: ListenerHandler;

    constructor(options: ListenerOptions) {
        super(options);
        this.id = Reflect.get(this, 'id') || options.id;
        this.eventName = options.eventName;
        this.emitter = options.emitter;
    }


    abstract exec(...args: eventArgs): unknown;

    static applyOptions(options: ListenerOptions) {
        return createclassDecorator((cls: any) => {
            abstract class Extended extends cls {
                constructor() {
                    super(options);
                }
            }
            return Extended as any;
        });
    }

}