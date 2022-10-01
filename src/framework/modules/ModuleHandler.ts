import { Category } from '../utils/Category';
import { Collection } from 'discord.js';
import { CustomModule } from './CustomModule';
import { dirname, sep, extname } from 'path';
import { EventEmitter } from 'events';
import { TestBotClient } from '../clients/TestBotClient';
import { getFiles } from '../utils/functions';


export interface ModuleHandlerEvents<T extends CustomModule<any>> {
    load: [module: T, isReload: boolean];

}

export interface ModuleHandlerOptions {
    client: TestBotClient<false>;
    directory: string;
}
export class ModuleHandler<
    T extends CustomModule<any>,
    Events extends ModuleHandlerEvents<CustomModule<any>>
> extends EventEmitter {
    client: TestBotClient;
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


    async loadAll() {
        const directory = this.directory;

        const files = await getFiles(directory, true);

        for (const file of files) {
            this.load(file, false);
        }
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

        if (!['.js', '.mjs'].includes(extname(path))) return undefined;

        const thing = require(path);
        if (!thing.default) {

            return undefined;
        }

        let mod = thing.default;
        if (!(mod.prototype instanceof CustomModule)) {
            console.log('ehgaikghap');

            return undefined;
        }
        delete require.cache[require.resolve(path)];
        mod = new mod();


        if (this.modules.has(mod.id)) return undefined;
        this.register(mod, path, isReload);
    }

    //@ts-expect-error
    on<Key extends keyof Events>(
        event: Key,
        //@ts-expect-error
        handler: (...args: Events[typeof event]) => void
    ) {

        //@ts-expect-error
        return super.on(event as any, handler);
    }

}
