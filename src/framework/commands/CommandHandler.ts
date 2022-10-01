
import { Collection, Message } from 'discord.js';
import { Command } from './Command';
import * as types from '@test-bot/typings';
import {
    ModuleHandler,
    ModuleHandlerEvents,
    ModuleHandlerOptions
} from '../modules/ModuleHandler';

export interface CommandHandlerOptions extends ModuleHandlerOptions {
    prefix: (msg: Message) => types.OrPromise<types.OrArray<string>>;
}

export interface CommanHandlerEvents extends ModuleHandlerEvents<Command> {
    messageInvalid: [msg: Message<boolean>, command: string];
    commandInvalid: [msg: Message<boolean>, command: string];
}


export class CommandHandler extends ModuleHandler<Command, CommanHandlerEvents> {

    public prefix: (msg: Message) => types.OrPromise<types.OrArray<string>>;
    public readonly aliases: Collection<string, Command>;

    constructor(options: CommandHandlerOptions) {
        super(options);
        this.prefix = Reflect.get(this, 'prefix') || options.prefix;
        this.aliases = new Collection<string, Command>();
    }
    async handleMessage(msg: Message) {

        if (!msg.content) return;
        if (msg.author.bot) return;
        await msg.author.fetch();
        if (msg.author.flags?.has('Spammer')) return;
        const prefixes = await this.prefix(msg);


        const [commandStringWithPrefix, ...args] = msg.content.split(/\s+/);

        let prefixUsed: string = '';

        for (const prefix of prefixes) {
            if (commandStringWithPrefix.startsWith(prefix)) {
                prefixUsed = prefix;
            }
        }

        if (!prefixUsed) {
            this.emit('messageInvalid', msg, commandStringWithPrefix);
            return;
        }
        const prefix = prefixUsed;

        const command = commandStringWithPrefix.slice(prefix.length);

        if (command) {
            const cmd = this.getCommand(command);
            if (!cmd) {
                this.emit('commandInvalid', msg, command);
                return;
            }

            await cmd.exec(msg, args);
        } else {
            this.emit('commandInvalid', msg, command);
            return;
        }


    }

    getCommand(cmdstring: string) {
        return this.modules.get(cmdstring) ||
            this.modules.find((cmd) => cmd.name === cmdstring) ||
            this.aliases.get(cmdstring);
    }



    async loadAll() {

        await super.loadAll();

        for (const cmd of this.modules.values()) {
            if (cmd.aliases.length) {
                for (const alias of cmd.aliases) {
                    if (this.aliases.has(alias)) {
                        continue;
                    } else {
                        this.aliases.set(alias, cmd);
                    }
                }
            }
        }
    }



    setup() {
        this.client
            .on('messageCreate', async (msg) => {

                if (msg.partial) {
                    await msg.fetch();
                }

                if (!(msg instanceof Message)) return;

                await this.handleMessage(msg);
            })
            .on('messageUpdate', async (oldMessage, newMessage) => {
                if (oldMessage.partial) {
                    await oldMessage.fetch();
                }

                if (newMessage.partial) {
                    await oldMessage.fetch();
                }
                if (!
                    (newMessage instanceof Message) ||
                    (oldMessage.content === newMessage.content)
                ) return;

                await this.handleMessage(newMessage);
            });
        return this;
    }


}
