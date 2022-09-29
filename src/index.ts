import { TestBotClient } from './structures/clients/TestBotClient';

declare global {
    type int = number;
}

const client = new TestBotClient();

client.login();