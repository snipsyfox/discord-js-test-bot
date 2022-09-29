import { CollectionConstructor } from '@discordjs/collection';
import { Collection } from 'discord.js';
import { Command } from '../commands/Command';
import { CustomModule } from '../modules/CustomModule';


export class Category<
    IModule extends CustomModule = CustomModule
> extends Collection<string, IModule> {

    /**
     * the id of the Category
     */
    id: string;

    /**
     * 
     * @param id I- ID of the Category
     * @param iterable - Entries to Set
     */
    constructor(id: string, iterable?: Iterable<readonly [string, IModule]>) {
        super(iterable);
        this.id = id;
    }


    get [Symbol.toStringTag]() {
        return `${this.constructor.name}<${this.id}>`;
    }

}


