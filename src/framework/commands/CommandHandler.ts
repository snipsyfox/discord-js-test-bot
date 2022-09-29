import { EventEmitter } from 'events';
import { Collection } from 'discord.js';
import { Command } from './Command';
export class CommandHandler extends EventEmitter {

    public readonly modules: Collection<string, Command>;
    public readonly categories: Collection<string, 

}