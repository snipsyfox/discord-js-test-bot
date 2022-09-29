import { Category } from '../utils/Category';
import { Collection } from 'discord.js';
import { CustomModule } from './CustomModule';
import { dirname, sep, extname } from 'path';
import { enumerable } from '../utils/decorators';
import { EventEmitter } from 'events';
import { TestBotClient } from '../clients/TestBotClient';


export interface ModuleHandlerEvents<T extends CustomModule> {
    load: [module: T, isReload: boolean];

}


export interface ModuleHandlerOptions {
    client: TestBotClient;
    directory: string;
}
export class ModuleHandler<T extends CustomModule> extends EventEmitter {
    client: TestBotClient;
    @enumerable(false)
    private readonly directory: string;

    public readonly modules: Collection<string, T>;

    public readonly categories: Collection<string, Category<T>>;

    constructor(options: ModuleHandlerOptions) {
        super({ captureRejections: true });
        this.client = options.client;
        this.directory = options.directory;
        this.modules = new Collection<string, T>();
        this.categories = new Collection<string, Category<T>>;
    }

    register(mod: T, filepath: string, isReload: boolean = false) {
        mod.filepath = filepath;
        mod.client = this.client;
        mod.handler = this;
        this.modules.set(mod.id, mod);

        if (mod.categoryId === 'default') {
            const name = dirname(filepath).split(sep);
            mod.categoryId = name[name.length - 1];
        }

        if (!this.categories.has(mod.categoryId)) {
            this.categories.set(mod.categoryId, new Category<T>(mod.categoryId));
        }
        const category = this.categories.get(mod.categoryId);
        mod.category = category || null;
        category?.set(mod.id, mod);
        this.emit('load', mod, isReload);

    }

    deregister(mod: T) {
        if (mod.filepath) delete require.cache[require.resolve(mod.filepath)];
        this.modules.delete(mod.id);
        this.categories.delete(mod.id);
    }


    load(path: string, isReload: boolean = false) {
        if (!['js', 'mjs'].includes(extname(path))) return undefined;

        const thing = require(path);
        if (!thing.default) {
            return undefined;
        }
        let mod = thing.default;
        if (!(mod.prototype instanceof CustomModule)) {
            return undefined;
        }
        delete require.cache[require.resolve(path)];
        mod = new mod();

        if (this.modules.has(mod.id)) return undefined;
        this.register(mod, path, isReload);

    }

    emit<
        K extends keyof ModuleHandlerEvents<T>
    >(
        event: K,
        ...args: ModuleHandlerEvents<T>[typeof event]
    ) {
        return super.emit(event, ...args);
    }


    on<
        K extends keyof ModuleHandlerEvents<T>
    >(
        event: K,
        handler: (...args: ModuleHandlerEvents<T>[typeof event]) => void
    ) {
        return super.on(event, handler as any);
    }



}