import { Client } from 'discord.js';
import { clientOptions, testEnv } from '../utils/constants';
// import { clientOptions, testEnv } from '../util/constants';
export class TestBotClient extends Client {


    constructor() {
        super(clientOptions);
    }
    async login() {
        return super.login(testEnv.DISCORD_TOKEN);
    }



}