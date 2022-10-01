import { CommandHandler } from './CommandHandler';
import { createclassDecorator } from '../utils/decorators';
import { CustomModule, ModuleOptions } from '../modules/CustomModule';
import { Message } from 'discord.js';
import { OrPromise } from '@test-bot/typings';

export interface CommandOptions extends ModuleOptions {
    name: string;

}


export abstract class Command extends CustomModule<CommandHandler> {

    aliases: string[];
    name: string;
    constructor(options: CommandOptions) {
        super(options);
        this.aliases = [];
        this.name = options.name;
    }


    abstract exec(msg: Message<boolean>, args: string[]): OrPromise<any>;

    static applyOptions(options: CommandOptions) {
        return createclassDecorator((cls: any) => {
            abstract class Extended extends cls {
                constructor() {
                    super(options);
                }
            }
            return Extended;
        });
    }
}
