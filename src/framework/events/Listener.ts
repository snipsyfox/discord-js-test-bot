import { TestBotClient } from '../clients/TestBotClient';
import { ListenerHandler } from './EventClient';

export interface ListenerOptions {
    id?: string;
    eventName: string;
    emitter: string;
}

export type eventArgs = any[];

export abstract class Listener implements ListenerOptions {


    id: string;
    eventName: string;
    emitter: string;
    client!: TestBotClient;
    handler!: ListenerHandler;

    constructor(options: ListenerOptions) {
        this.id = Reflect.get(this, 'id') || options.id;
        this.eventName = options.eventName;
        this.emitter = options.emitter;
    }


    abstract exec(...args: eventArgs): unknown;


}