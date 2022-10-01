import { Collection } from 'discord.js';
import { EventEmitter } from 'events';
import { getFiles } from '../utils/functions';
import { Listener } from './Listener';
import { resolve } from 'path';
import { ModuleHandler, ModuleHandlerEvents, ModuleHandlerOptions } from '../modules/ModuleHandler';
export interface ListenerHandlerOptions extends ModuleHandlerOptions {
}

export interface ListenerHandlerEvents extends ModuleHandlerEvents<Listener> { }
export class ListenerHandler extends ModuleHandler<Listener, ListenerHandlerEvents> {
    private options: ListenerHandlerOptions;
    public emitters: Collection<string, EventEmitter>;

    public modules: Collection<string, Listener>;

    constructor(options: ListenerHandlerOptions) {
        super(options);
        this.emitters = new Collection<string, EventEmitter>();
        this.modules = new Collection<string, Listener>();
        this.options = options;
    }


    get(data: { id: string; }): Listener | undefined;
    get(data: { id: string; type: 'emitter'; }): EventEmitter | undefined;
    get(data: { id: string; type: 'module'; }): Listener | undefined;
    get({ id, type }: { id: string; type?: 'emitter' | 'module'; }): EventEmitter | Listener | undefined {
        return typeof type === 'string'
            && ['emitter', 'module'].includes(type)
            && `${type}s` in this ?
            this[`${type}s`].get(id)
            : this.modules.get(id);
    }

    has(data: { id: string; }): boolean;
    has(data: { id: string; type: 'emitter'; }): boolean;
    has(data: { id: string; type: 'module'; }): boolean;
    has({ id, type }: { id: string; type?: 'emitter' | 'module'; }): boolean {
        return typeof type == 'string'
            && ['emitter', 'module'].includes(type)
            && `${type}s` in this ?
            this[`${type}s`].has(id)
            : this.modules.has(id);
    };

    setEmitters(emitters: Record<string, EventEmitter>) {
        for (const [key, value] of Object.entries(emitters)) {
            if (this.has({ id: key, type: 'emitter' })) {
                continue;
            }
            this.emitters.set(key, value);
        }
    }

    async loadAll() {
        const dir = this.options.directory;
        const files = await getFiles(resolve(process.cwd(), dir), true);

        for (const file of files) {
            const fl = await import(file);
            if (!fl.default) continue;
            const event = new fl.default();
            if (!(event instanceof Listener)) continue;
            event.client = this.client;
            event.handler = this;
            const handler = this.emitters.get(event.emitter);
            if (!handler) continue;
            handler.on(event.eventName, (...args) => this.modules.get(event.id)?.exec(...args));
            this.modules.set(event.id, event);
            this.emit('load', event);
        }
    }

}
