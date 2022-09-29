import { Client } from 'discord.js';
import { clientOptions, testEnv } from '../utils/constants';
// import { clientOptions, testEnv } from '../util/constants';
import { join } from 'path';
import { ListenerHandler } from '../events/EventClient';
export class TestBotClient<T extends boolean = false> extends Client<T> {


    events: ListenerHandler;


    constructor() {
        super(clientOptions);

        this.events = new ListenerHandler({
            client: this,
            directory: join(process.cwd(), 'dist', 'events')
        });

    }
    async login() {
        return super.login(testEnv.DISCORD_TOKEN);
    }



}

export interface ReadyClient extends Client<true> { }