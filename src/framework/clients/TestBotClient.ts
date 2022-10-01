import { Client } from 'discord.js';
import { BashColours, clientOptions, testEnv } from '../utils/constants';
// import { clientOptions, testEnv } from '../util/constants';
import { join } from 'path';
import { ListenerHandler } from '../events/EventClient';
import { Logger } from '../utils/Logger';
import { CommandHandler } from '../commands/CommandHandler';
import { MemoryUtil } from '../utils/functions';
export class TestBotClient<T extends boolean = false> extends Client<T> {

    commands: CommandHandler;
    events: ListenerHandler;
    logger: Logger;
    memoryUtil = new MemoryUtil();
    bash = BashColours;

    constructor() {
        super(clientOptions);

        this.events = new ListenerHandler({
            client: this as TestBotClient<false>,
            directory: join(process.cwd(), 'dist', 'events')
        });

        this.commands = new CommandHandler({
            client: this as TestBotClient<false>,
            directory: join(process.cwd(), 'dist', 'commands', 'prefixed'),
            prefix: () => ['-']
        });
        this.commands.on('load', (cmd) => {
            this.logger.log({ message: `loaded command ${cmd}`, type: 'INFO' });
        });
        this.logger = new Logger();

    }
    async login() {
        return super.login(testEnv.DISCORD_TOKEN);
    }



}

export interface ReadyClient extends Client<true> { }